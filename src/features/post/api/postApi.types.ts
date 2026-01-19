// // features/create-post/api/postsApi.types.ts
// import * as z from "zod";
// import { createPostRequestSchema, createPostResponseSchema } from "../model/validation";

// export type CreatePostArgs = z.infer<typeof createPostRequestSchema>;
// export type CreatePostResponse = z.infer<typeof createPostResponseSchema>;



import * as z from "zod";
import {
  createPostRequestSchema,
  createPostResponseSchema,
  uploadPostImagesResponseSchema,
} from "../model/validation";

export type UploadPostImagesResponse = z.infer<typeof uploadPostImagesResponseSchema>;

export type CreatePostArgs = z.infer<typeof createPostRequestSchema>;
export type CreatePostResponse = z.infer<typeof createPostResponseSchema>;
