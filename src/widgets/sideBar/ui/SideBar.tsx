import s from "./SideBar.module.scss";
import Image from "next/image";

export const SideBar = () => {
  return (
    <div className={s.sideBar}>
      <div className={s.wrapperUlCenterWidth}>
        <div className={s.mainUlSideBar}>
          <ul className={s.Ul1}>
            <li>
              <Image src="/icons/feed.png" alt="Feed" width={24} height={24} />
              Feed
            </li>
            <li>
              <Image src="/icons/create.png" alt="Create" width={24} height={24} />
              Create
            </li>
            <li>
              <Image src="/icons/profile.png" alt="My Profile" width={24} height={24} />
              My Profile
            </li>
            <li>
              <Image src="/icons/messenger.png" alt="Messenger" width={24} height={24} />
              Messenger
            </li>
            <li>
              <Image src="/icons/search.png" alt="Search" width={24} height={24} />
              Search
            </li>
          </ul>

          <ul className={s.Ul2}>
            <li>
              <Image src="/icons/statistics.png" alt="Statistics" width={24} height={24} />
              Statistics
            </li>
            <li>
              <Image src="/icons/favorites.png" alt="Favorites" width={24} height={24} />
              Favorites
            </li>
          </ul>
        </div>

        <ul className={s.Ul3}>
          <li>
            <Image src="/icons/LogOut.png" alt="Log Out" width={24} height={24} />
            Log Out
          </li>
        </ul>
      </div>
    </div>
  );
};
