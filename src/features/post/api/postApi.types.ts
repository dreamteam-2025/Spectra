import * as z from "zod";
import {
  createPostRequestSchema,
  createPostResponseSchema,
  uploadPostImagesResponseSchema,
  getPostsResponseSchema,
} from "../model/validation";

export type GetPostsArgs = {
  endCursorPostId?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
};

export type UploadPostImagesResponse = z.infer<typeof uploadPostImagesResponseSchema>;

export type CreatePostArgs = z.infer<typeof createPostRequestSchema>;
export type CreatePostResponse = z.infer<typeof createPostResponseSchema>;
export type GetPostsResponse = z.infer<typeof getPostsResponseSchema>;
