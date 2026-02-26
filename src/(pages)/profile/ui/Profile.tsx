"use client";

import s from "./Profile.module.scss";
import { UserPostList } from "@/widgets/post/myPostList/ui/UserPostList";
import { ProfileHeader } from "@/widgets/user/ui/ProfileHeader";
import { useParams } from "next/navigation";
import { useGetUserInfoByIdQuery } from "@/features/user/api/userApi";
import { Loader } from "@/shared";

export const Profile = () => {
  const { userId } = useParams<{ userId: string }>();

  const userIdNumber = userId ? Number(userId) : undefined;

  // вызываем хук на верхнем уровне, используя skip, чтобы не делать запрос без id
  const {
    data: userInfo,
    error,
    isLoading,
  } = useGetUserInfoByIdQuery({ userId: userIdNumber! }, { skip: !userIdNumber });

  // обработка состояний (ранние прерывания)
  if (isLoading) return <Loader />;
  if (error) return <>Failed to load user data</>;
  if (!userInfo) return <div>User not found</div>;

  const {
    userName = "",
    aboutMe = "",
    avatars = [],
    userMetadata: { followers = 0, following = 0, publications = 0 } = {},
  } = userInfo;

  const avatarUrl = avatars[0]?.url;

  return (
    <main className={s.contentWrapper}>
      <ProfileHeader
        src={avatarUrl}
        userName={userName}
        followers={followers}
        following={following}
        publications={publications}
        aboutMe={aboutMe ?? ""}
      />
      <UserPostList userId={userIdNumber!} />
    </main>
  );
};
