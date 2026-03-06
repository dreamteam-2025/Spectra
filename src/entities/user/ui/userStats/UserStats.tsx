import clsx from "clsx";
import s from "./UserStats.module.scss";
import { formatNumber } from "@/shared/lib";

type Props = {
  followers: number;
  following: number;
  publications: number;
  className?: string;
};

export const UserStats = ({ followers, following, publications, className }: Props) => {
  return (
    <ul className={clsx(s.wrapper, "regular-14", className)} aria-label="user statistics">
      <li className={s.indicator}>
        <span>{formatNumber(following)}</span>
        Following
      </li>
      <li className={s.indicator}>
        <span>{formatNumber(followers)}</span>
        Followers
      </li>
      <li className={s.indicator}>
        <span>{formatNumber(publications)}</span>
        Publications
      </li>
    </ul>
  );
};
