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
  firstName: z.string().nullable().optional(),
  lastName: z.string().nullable().optional(),
});

export const createPostResponseSchema = z.object({
  id: z.number(),
  userName: z.string(),
  description: z.string().nullable().optional().default(""),
  location: z.string().nullable().optional().default(""),
  images: z.array(uploadedImageSchema),

  createdAt: z.string(),
  updatedAt: z.string(),
  ownerId: z.number(),

  avatarOwner: z.string().nullable().optional(),

  owner: postOwnerSchema,

  likesCount: z.number(),
  isLiked: z.boolean(),
  avatarWhoLikes: z.union([z.boolean(), z.array(z.any())]).optional(),
});

export const getPostsResponseSchema = z.object({
  totalCount: z.number(),
  pageSize: z.number(),

  items: z.array(
    z.object({
      id: z.number(),
      userName: z.string(),

      description: z.string(),
      location: z.string().nullable(),

      images: z.array(
        z.object({
          url: z.string(),
          width: z.number(),
          height: z.number(),
          fileSize: z.number(),
          createdAt: z.string(),
          uploadId: z.string(),
        })
      ),

      createdAt: z.string(),
      updatedAt: z.string(),

      avatarOwner: z.string(),
      ownerId: z.number(),

      owner: z.object({
        firstName: z.string().nullable(),
        lastName: z.string().nullable(),
      }),

      likesCount: z.number(),
      isLiked: z.boolean(),

      avatarWhoLikes: z.array(z.unknown()),
    })
  ),

  totalUsers: z.number().optional(),
  nextCursor: z.number().nullable().optional(),
});






