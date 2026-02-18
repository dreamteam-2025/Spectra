import { baseApi } from "@/shared/api/baseApi"; // как у тебя называется

type Avatar = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
  createdAt: string;
};

type UploadAvatarResponse = {
  avatars: Avatar[];
};

export const userApi = baseApi.injectEndpoints({
  endpoints: build => ({
    uploadAvatar: build.mutation<UploadAvatarResponse, File>({
      query: file => {
        const formData = new FormData();
        formData.append("file", file);

        return {
          url: "users/profile/avatar",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Auth", "User"],
    }),
  }),
});

export const { useUploadAvatarMutation } = userApi;
