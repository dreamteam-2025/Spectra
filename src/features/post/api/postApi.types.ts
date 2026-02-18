import * as z from "zod";
import {
  createPostRequestSchema,
  createPostResponseSchema,
  uploadPostImagesResponseSchema,
  getPostsResponseSchema,
  getPostByIdResponseSchema,
  updatePostRequestSchema,
  updatePostResponseSchema,
  getPostCommentsResponseSchema,
} from "../model/validation";

export type SortDirection = "asc" | "desc";

export type GetPostsArgs = {
  endCursorPostId?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: SortDirection;
};

export type DeletePostArgs = {
  postId: number;
};

export type GetPostByIdArgs = {
  postId: number;
};

export type UpdatePostArgs = {
  postId: number;
  body: z.infer<typeof updatePostRequestSchema>;
};

export type GetPostCommentsArgs = {
  postId: number;
  pageSize?: number;
  pageNumber?: number;
  sortBy?: string;
  sortDirection?: SortDirection;
};

export type UploadPostImagesResponse = z.infer<typeof uploadPostImagesResponseSchema>;
export type CreatePostArgs = z.infer<typeof createPostRequestSchema>;
export type CreatePostResponse = z.infer<typeof createPostResponseSchema>;
export type GetPostsResponse = z.infer<typeof getPostsResponseSchema>;
export type GetPostByIdResponse = z.infer<typeof getPostByIdResponseSchema>;
export type UpdatePostResponse = z.infer<typeof updatePostResponseSchema>;
export type GetPostCommentsResponse = z.infer<typeof getPostCommentsResponseSchema>;
export type Post = GetPostsResponse["items"][number];
export type PostsList = Post[];
