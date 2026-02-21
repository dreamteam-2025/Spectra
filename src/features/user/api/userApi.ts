import { baseApi } from "@/shared/api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPublicUsersCount: builder.query<{ totalCount: number }, void>({
      query: () => ({
        url: "public-user",
        method: "GET",
      }),
      providesTags: () => [{ type: "User" }],
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

export const { useGetPublicUsersCountQuery, useUploadAvatarMutation } = userApi;
