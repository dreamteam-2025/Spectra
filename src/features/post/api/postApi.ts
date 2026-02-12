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
} from "./postApi.types";

export const postApi = baseApi.injectEndpoints({
  endpoints: build => ({
    //Delete post
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
          url: "posts/image", // важно: без /api/v1 если baseUrl уже /api/v1
          body: formData,
          // Content-Type НЕ ставим, браузер сам проставит boundary
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

    // Get posts
    getPosts: build.infiniteQuery<GetPostsResponse, GetPostsArgs, number>({
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

    // Get my posts
    getMyPosts: build.infiniteQuery<GetPostsResponse, GetPostsArgs & { userId: number }, number>({
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

      providesTags: ["PostsList"],
    }),

    // Get post by id
    getPostById: build.query<GetPostByIdResponse, GetPostByIdArgs>({
      query: ({ postId }) => ({
        method: "GET",
        url: `posts/id/${postId}`,
      }),
      keepUnusedDataFor: 10,
      transformResponse: (response: unknown) => getPostByIdResponseSchema.parse(response),
      providesTags: (_result, _error, { postId }) => [{ type: "SinglePost", id: postId }],
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
      providesTags: (_result, _error, { postId }) => [{ type: "Comments", id: postId }],
    }),
  }),
});

export const {
  useUploadPostImagesMutation,
  useCreatePostMutation,
  useGetPostsInfiniteQuery,
  useGetMyPostsInfiniteQuery,
  useGetPostByIdQuery,
  useUpdatePostMutation,
  useGetPostCommentsQuery,
  useDeletePostMutation,
} = postApi;
