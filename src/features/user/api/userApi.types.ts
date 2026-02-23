export type Avatar = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
  createdAt: string;
};

export type UploadAvatarResponse = {
  avatars: Avatar[];
};

export type ProfileResponse = {
  id: number;
  userName: string;
  firstName?: string | null;
  lastName?: string | null;
  city?: string | null;
  country?: string | null;
  region?: string | null;
  dateOfBirth?: string | null;
  aboutMe?: string | null;
  avatars?: Array<{
    url: string;
    width?: number;
    height?: number;
    fileSize?: number;
    createdAt?: string;
  }>;
  createdAt?: string;
};