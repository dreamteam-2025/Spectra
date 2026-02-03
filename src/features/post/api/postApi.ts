import { baseApi } from "@/shared";
import { createPostRequestSchema, createPostResponseSchema, uploadPostImagesResponseSchema } from "../model/validation";
import type {
  CreatePostArgs,
  CreatePostResponse,
  GetPostsArgs,
  GetPostsResponse,
  UploadPostImagesResponse,
} from "./postApi.types";

export const postApi = baseApi.injectEndpoints({
  endpoints: build => ({
    // 1) Upload images (multipart/form-data)
    uploadPostImages: build.mutation<UploadPostImagesResponse, File[]>({
      query: files => {
        const formData = new FormData();

        // Swagger: file = array
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
      invalidatesTags: ["Posts"],
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

      providesTags: ["Posts"],
    }),
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

      providesTags: ["Posts"],
    }),
  }),
});

export const {
  useUploadPostImagesMutation,
  useCreatePostMutation,
  useGetPostsInfiniteQuery,
  useGetMyPostsInfiniteQuery,
} = postApi;
