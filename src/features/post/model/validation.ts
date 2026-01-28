import * as z from "zod";

/** ---------- Upload response ---------- */
export const uploadedImageSchema = z.object({
  url: z.string().url(),
  width: z.number(),
  height: z.number(),
  fileSize: z.number(),
  createdAt: z.string(), // можно .datetime() если уверен в ISO
  uploadId: z.string(),
});

export const uploadPostImagesResponseSchema = z.object({
  images: z.array(uploadedImageSchema).min(1),
});

/** ---------- Create post request/response ---------- */
export const childrenMetadataSchema = z.object({
  uploadId: z.string().min(1),
});

export const createPostRequestSchema = z.object({
  description: z.string().max(500).optional(),
  childrenMetadata: z.array(childrenMetadataSchema).min(1),
});

export const postOwnerSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

export const createPostResponseSchema = z.object({
  id: z.number(),
  userName: z.string(),
  description: z.string(),
  location: z.string(),
  images: z.array(uploadedImageSchema), // совпадает по полям
  createdAt: z.string(),
  updatedAt: z.string(),
  ownerId: z.number(),
  avatarOwner: z.string().url(),
  owner: postOwnerSchema,
  likesCount: z.number(),
  isLiked: z.boolean(),
  avatarWhoLikes: z.boolean(),
});
