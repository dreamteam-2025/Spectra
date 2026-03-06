import { baseApi } from "@/shared/api/baseApi";
import { ProfileResponse, UploadAvatarResponse, UserInfoByIdResponse, UserInfoResponse } from "./userApi.types";
import { TagDescription } from "@reduxjs/toolkit/query";
import { TagTypes } from "@/shared/api/tags";

export const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // get count of registered users
    getPublicUsersCount: builder.query<{ totalCount: number }, void>({
      query: () => ({
        url: "public-user",
        method: "GET",
      }),
      providesTags: () => [{ type: "User" }],
    }),

    // get all the info about one user
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

    // get user info by userName
    getUserInfoByName: builder.query<UserInfoResponse, { userName: string }>({
      query: ({ userName }) => ({
        url: `users/${userName}`,
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

    // get user info by userId
    getUserInfoById: builder.query<UserInfoByIdResponse, { userId: number }>({
      query: ({ userId }) => ({
        url: `public-user/profile/${userId}`,
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

    // upload a new user's avatar
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

export const {
  useGetPublicUsersCountQuery,
  useUploadAvatarMutation,
  useGetProfileQuery,
  useGetUserInfoByIdQuery,
  useGetUserInfoByNameQuery,
} = userApi;
