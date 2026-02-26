import { UserAvatar, UserStats } from "@/entities/user";
import s from "./ProfileHeader.module.scss";
import { ImageProps } from "next/image";
import { ReactNode } from "react";

type Props = {
  src: ImageProps["src"];
  userName: string;
  followers: number;
  following: number;
  publications: number;
  aboutMe?: string;
  actions?: ReactNode;
};

export const ProfileHeader = ({ src, userName, followers, following, publications, aboutMe = "", actions }: Props) => {
  return (
    <div className={s.wrapper}>
      <UserAvatar src={src} alt={`${userName} avatar`} />
      {/* Вся остальная, преимущественно текстовая информация */}
      <div className={s.infoContainer}>
        {/* Секция заголовка и кнопок */}
        <div className={s.infoHeading}>
          <h1>{userName}</h1>
          {/* Здесь отображены кнопки действий в зависимости от профиля (свой/друг/чужой) */}
          {actions}
        </div>
        {/* Секция статистики и описания профиля */}
        <UserStats followers={followers} following={following} publications={publications} />
        {aboutMe && <p className={s.aboutMe}>{aboutMe}</p>}
      </div>
    </div>
  );
};
