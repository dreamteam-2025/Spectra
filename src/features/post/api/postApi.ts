import { baseApi } from "@/shared";
import {
  createPostRequestSchema,
  createPostResponseSchema,
  getPostByIdResponseSchema,
  getPostCommentsResponseSchema,
  updatePostRequestSchema,
  updatePostResponseSchema,
  uploadPostImagesResponseSchema,
} from "../model/validation";
import type {
  CreatePostArgs,
  CreatePostResponse,
  GetPostsArgs,
  GetPostsResponse,
  UploadPostImagesResponse,
  GetPostByIdArgs,
  GetPostByIdResponse,
  UpdatePostResponse,
  UpdatePostArgs,
  GetPostCommentsResponse,
  GetPostCommentsArgs,
  DeletePostArgs,
  Post,
} from "./postApi.types";
import { TagDescription } from "@reduxjs/toolkit/query";
import { TagTypes } from "@/shared/api/tags";

export const postApi = baseApi.injectEndpoints({
  endpoints: build => ({
    // Delete post
    deletePost: build.mutation<void, DeletePostArgs>({
      query: ({ postId }) => ({
        method: "DELETE",
        url: `posts/${postId}`,
        responseHandler: "content-type",
      }),
      invalidatesTags: (_result, _error, { postId }) => ["PostsList", { type: "Comments", id: postId }],
    }),

    // 1) Upload images (multipart/form-data)
    uploadPostImages: build.mutation<UploadPostImagesResponse, File[]>({
      query: files => {
        const formData = new FormData();

        files.forEach(file => formData.append("file", file));

        return {
          method: "POST",
          url: "posts/image",
          body: formData,
        };
      },
      transformResponse: (response: unknown) => uploadPostImagesResponseSchema.parse(response),
    }),

    // 2) Create post
    createPost: build.mutation<CreatePostResponse, CreatePostArgs>({
      query: payload => {
        const body = createPostRequestSchema.parse(payload);

        return {
          method: "POST",
          url: "posts",
          body,
        };
      },
      transformResponse: (response: unknown) => createPostResponseSchema.parse(response),
      invalidatesTags: ["PostsList"],
    }),

    // Get posts (infinite scroll)
    getPostsInfinite: build.infiniteQuery<GetPostsResponse, GetPostsArgs, number>({
      infiniteQueryOptions: {
        initialPageParam: 0,
        getNextPageParam: lastPage => {
          if (lastPage.items.length === 0) return undefined;

          return lastPage.items[lastPage.items.length - 1].id;
        },
      },

      query: ({ queryArg, pageParam }) => ({
        //pageParam like endCursorPostId. Url: posts/all/{endCursorPostId}

        method: "GET",
        url: `posts/all/${pageParam}`,
        params: {
          pageSize: queryArg.pageSize ?? 10,
          sortDirection: "desc",
        },
      }),

      providesTags: ["PostsList"],
    }),

    // Get exact count of posts (default count of posts = 4)
    getPosts: build.query<Post[], { pageSize?: number }>({
      query: ({ pageSize = 4 }) => ({
        method: "GET",
        url: "posts/all/0",
        params: {
          pageSize,
          sortDirection: "desc",
        },
      }),
      transformResponse: (response: { items: Post[] }) => response.items,
      providesTags: (result, _error): TagDescription<TagTypes>[] => {
        const tags: TagDescription<TagTypes>[] = ["PostsList"];
        if (result) {
          const uniqueOwnerIds = [...new Set(result.map(post => post.ownerId))];
          uniqueOwnerIds.forEach(ownerId => {
            tags.push({ type: "UserAvatar", id: ownerId });
          });
        }
        return tags;
      },
    }),

    // Get users' posts
    getUserPosts: build.infiniteQuery<GetPostsResponse, GetPostsArgs & { userId: number }, number>({
      infiniteQueryOptions: {
        initialPageParam: 0,
        getNextPageParam: lastPage => {
          if (lastPage.items.length === 0) return undefined;

          return lastPage.items[lastPage.items.length - 1].id;
        },
      },

      query: ({ queryArg, pageParam }) => ({
        method: "GET",
        url: `posts/user/${queryArg.userId}/${pageParam}`,
        params: {
          pageSize: queryArg.pageSize ?? 10,
          sortDirection: "desc",
        },
      }),

      providesTags: (_result, _error, { userId }): TagDescription<TagTypes>[] => [
        "PostsList",
        { type: "UserAvatar", id: userId },
      ],
    }),

    // Get post by id
    getPostById: build.query<GetPostByIdResponse, GetPostByIdArgs>({
      query: ({ postId }) => ({
        method: "GET",
        url: `posts/id/${postId}`,
      }),
      keepUnusedDataFor: 10,
      transformResponse: (response: unknown) => getPostByIdResponseSchema.parse(response),
      providesTags: (result, _error, { postId }): TagDescription<TagTypes>[] => {
        const tags: TagDescription<TagTypes>[] = [{ type: "SinglePost", id: postId }];
        if (result?.ownerId) {
          tags.push({ type: "UserAvatar", id: result.ownerId });
        }
        return tags;
      },
    }),

    // Update post
    updatePost: build.mutation<UpdatePostResponse, UpdatePostArgs>({
      query: ({ postId, body }) => {
        const parsedBody = updatePostRequestSchema.parse(body);

        return {
          method: "PUT",
          url: `posts/${postId}`,
          body: parsedBody,
        };
      },

      transformResponse: (response: unknown) => updatePostResponseSchema.parse(response),

      invalidatesTags: (_result, _error, { postId }) => [
        // детальная страница поста
        { type: "SinglePost", id: postId },
        // список постов (infiniteQuery)
        "PostsList",
      ],
    }),

    // Get post comments
    getPostComments: build.query<GetPostCommentsResponse, GetPostCommentsArgs>({
      query: ({ postId, pageSize = 10, pageNumber = 1, sortBy = "createdAt", sortDirection = "desc" }) => ({
        method: "GET",
        url: `posts/${postId}/comments`,
        params: {
          pageSize,
          pageNumber,
          sortBy,
          sortDirection,
        },
      }),
      keepUnusedDataFor: 10,
      transformResponse: (response: unknown) => getPostCommentsResponseSchema.parse(response),
      providesTags: (result, _error, { postId }): TagDescription<TagTypes>[] => {
        const tags: TagDescription<TagTypes>[] = [{ type: "Comments", id: postId }];

        // если есть результат и он содержит массив items
        if (result?.items) {
          // cобираем id авторов комментариев
          const uniqueAuthorIds = [...new Set(result.items.map(comment => comment.from?.id).filter(Boolean))];
          // добавляем тег "UserAvatar" для каждого автора
          uniqueAuthorIds.forEach(authorId => {
            tags.push({ type: "UserAvatar", id: authorId });
          });
        }

        return tags;
      },
    }),
  }),
});

export const {
  useUploadPostImagesMutation,
  useCreatePostMutation,
  useGetPostsQuery,
  useGetUserPostsInfiniteQuery,
  useGetPostByIdQuery,
  useUpdatePostMutation,
  useGetPostCommentsQuery,
  useDeletePostMutation,
} = postApi;
