import { baseApi } from "@/shared/api/baseApi";
import { ProfileResponse, UploadAvatarResponse } from "./userApi.types";

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
      providesTags: () => [{ type: "User" }],
    }),

    uploadAvatar: builder.mutation<UploadAvatarResponse, File>({
      query: file => {
        const formData = new FormData();
        formData.append("file", file);

        return {
          url: "users/profile/avatar",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const { useGetPublicUsersCountQuery, useUploadAvatarMutation, useGetProfileQuery } = userApi;
