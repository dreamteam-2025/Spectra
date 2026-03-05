"use client";

import s from "./Profile.module.scss";
import { UserPostList } from "@/widgets/post/myPostList/ui/UserPostList";
import { ProfileHeader } from "@/widgets/user/ui/ProfileHeader";
import { notFound, useRouter } from "next/navigation";
import { useGetUserInfoByIdQuery, userApi } from "@/features/user/api/userApi";
import { Button, Loader, ROUTES } from "@/shared";
import { useMeQuery } from "@/features";
import { UserInfoByIdResponse } from "@/features/user/api/userApi.types";
import { useAppDispatch } from "@/shared/lib";
import { useEffect } from "react";

type Props = {
  userId: string;
  searchParams: {
    [key: string]: string;
  };
  initialUserInfo: UserInfoByIdResponse;
};

export const Profile = ({ userId, searchParams, initialUserInfo }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const userIdNumber = userId ? Number(userId) : undefined;

  // заполняем кеш RTK Query начальными данными при монтировании (initialUserInfo из пропсов)
  // после гидратации
  useEffect(() => {
    if (initialUserInfo) {
      console.log(initialUserInfo);
      dispatch(userApi.util.upsertQueryData("getUserInfoById", { userId: userIdNumber ?? 0 }, initialUserInfo));
    }
  }, [dispatch, initialUserInfo]);

  // вызываем хук на верхнем уровне, используя skip, чтобы не делать запрос без id
  const {
    data: userInfoRTK,
    error,
    isLoading: userLoading,
  } = useGetUserInfoByIdQuery({ userId: userIdNumber! }, { skip: !userIdNumber });

  const { data: me, isLoading: meLoading } = useMeQuery();

  const userInfo = userInfoRTK ?? initialUserInfo;

  // обработка состояний (ранние прерывания)
  //if (userLoading || meLoading) return <Loader />;
  if (!userInfo || error) notFound();

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
    <Button children={"Profile Settings"} variant={"secondary"} onClick={() => router.push(ROUTES.APP.SETTINGS)} />
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
