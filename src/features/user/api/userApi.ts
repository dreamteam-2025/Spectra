import { baseApi } from "@/shared/api/baseApi";
import { ProfileResponse, UploadAvatarResponse } from "./userApi.types";
import { TagDescription } from "@reduxjs/toolkit/query";
import { TagTypes } from "@/shared/api/tags";

export const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPublicUsersCount: builder.query<{ totalCount: number }, void>({
      query: () => ({
        url: "public-user",
        method: "GET",
      }),
      providesTags: () => [{ type: "User" }],
    }),

    getProfile: builder.query<ProfileResponse, void>({
      query: () => ({
        url: "users/profile",
        method: "GET",
      }),
      providesTags: (result): TagDescription<TagTypes>[] => {
        const tags: TagDescription<TagTypes>[] = ["User"];
        if (result?.id) {
          tags.push({ type: "UserAvatar", id: result.id });
          tags.push({ type: "User", id: result.id });
        }
        return tags;
      },
    }),

    uploadAvatar: builder.mutation<UploadAvatarResponse, { file: File; userId: number }>({
      query: ({ file }) => {
        const formData = new FormData();
        formData.append("file", file);

        return {
          url: "users/profile/avatar",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: (_result, _error, { userId }) => [{ type: "UserAvatar", id: userId }],
    }),
  }),
});

export const { useGetPublicUsersCountQuery, useUploadAvatarMutation, useGetProfileQuery } = userApi;
