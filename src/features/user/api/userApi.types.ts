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
