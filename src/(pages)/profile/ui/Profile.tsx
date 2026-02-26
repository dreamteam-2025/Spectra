"use client";

import s from "./Profile.module.scss";
import { UserPostList } from "@/widgets/post/myPostList/ui/UserPostList";
import { ProfileHeader } from "@/widgets/user/ui/ProfileHeader";
import { useParams } from "next/navigation";
import { useGetUserInfoByIdQuery } from "@/features/user/api/userApi";
import { Button, Loader } from "@/shared";
import { useMeQuery } from "@/features";

export const Profile = () => {
  const { userId } = useParams<{ userId: string }>();

  const userIdNumber = userId ? Number(userId) : undefined;

  // вызываем хук на верхнем уровне, используя skip, чтобы не делать запрос без id
  const {
    data: userInfo,
    error,
    isLoading: userLoading,
  } = useGetUserInfoByIdQuery({ userId: userIdNumber! }, { skip: !userIdNumber });

  const { data: me, isLoading: meLoading } = useMeQuery();

  // обработка состояний (ранние прерывания)
  if (userLoading || meLoading) return <Loader />;
  if (error) return <>Failed to load user data</>;
  if (!userInfo) return <div>User not found</div>;

  const {
    userName = "",
    aboutMe = "",
    avatars = [],
    userMetadata: { followers = 0, following = 0, publications = 0 } = {},
  } = userInfo;

  const avatarUrl = avatars[0]?.url;

  const isOwnProfile = me?.userId === userInfo?.id;

  // Формируем actions в зависимости от владельца профиля
  const actions = isOwnProfile ? (
    <Button children={"Profile Settings"} variant={"secondary"} />
  ) : (
    <>
      <Button children={"Follow"} variant={"primary"} />
      <Button children={"Send Message"} variant={"secondary"} />
    </>
  );

  return (
    <main className={s.contentWrapper}>
      <ProfileHeader
        src={avatarUrl}
        userName={userName}
        followers={followers}
        following={following}
        publications={publications}
        aboutMe={aboutMe ?? ""}
        actions={actions}
      />
      <UserPostList userId={userIdNumber!} />
    </main>
  );
};
