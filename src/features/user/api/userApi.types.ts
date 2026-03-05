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

export type UserMetadata = {
  following: number;
  followers: number;
  publications: number;
};

export type UserInfoResponse = {
  isFollowing: boolean;
  isFollowedBy: boolean;
  followingCount: number;
  followersCount: number;
  publicationsCount: number;
} & Omit<ProfileResponse, "createdAt">;

export type UserInfoByIdResponse = Pick<ProfileResponse, "id" | "userName" | "aboutMe" | "avatars"> & {
  userMetadata: UserMetadata;
  hasPaymentSubscription: boolean;
  isFollowing: boolean;
  isFollowedBy: boolean;
};
