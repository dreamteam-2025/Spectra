"use client";

import s from "./Profile.module.scss";
import { UserPostList } from "@/widgets/post/myPostList/ui/UserPostList";
import { ProfileHeader } from "@/widgets/user/ui/ProfileHeader";
import { notFound, useRouter } from "next/navigation";
import { useGetUserInfoByIdQuery, userApi } from "@/features/user/api/userApi";
import { Button, Loader, ROUTES } from "@/shared";
import { useMeQuery } from "@/features";
import { UserInfoByIdResponse } from "@/features/user/api/userApi.types";
import { useAppDispatch, useIsClient } from "@/shared/lib";
import { useEffect } from "react";
import { ActionsSkeleton } from "./ActionsSkeleton";

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
  const isClient = useIsClient();
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

  // Рендер блока действий с учётом состояния загрузки и окружения
  const renderActions = () => {
    // На сервере всегда скелетон
    if (!isClient) {
      return <ActionsSkeleton />;
    }

    // На клиенте, пока грузится me - тоже скелетон
    if (meLoading) {
      return <ActionsSkeleton />;
    }

    // Если пользователь авторизован
    if (me) {
      if (isOwnProfile) {
        return (
          <Button variant="secondary" onClick={() => router.push(ROUTES.APP.SETTINGS)}>
            Profile Settings
          </Button>
        );
      } else {
        return (
          <>
            <Button variant="primary">Follow</Button>
            <Button variant="secondary">Send Message</Button>
          </>
        );
      }
    }
  };

  // Формируем actions в зависимости от владельца профиля
  const actions = renderActions();

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
