import { baseApi } from "@/shared";
import { createPostRequestSchema, createPostResponseSchema, uploadPostImagesResponseSchema } from "../model/validation";
import type { CreatePostArgs, CreatePostResponse, UploadPostImagesResponse } from "./postApi.types";

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
  }),
});

export const { useUploadPostImagesMutation, useCreatePostMutation } = postApi;
