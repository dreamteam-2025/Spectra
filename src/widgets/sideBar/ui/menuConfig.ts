import { ROUTES } from "@/shared";

export const menuItems = [
  {
    id: "feed",
    label: "Feed",
    component: "FeedIcon",
    path: ROUTES.APP.FEED,
    group: 1,
  },
  {
    id: "create",
    label: "Create",
    component: "CreateIcon",
    path: "/create",
    group: 1,
  },
  {
    id: "profile",
    label: "My Profile",
    component: "ProfileIcon",
    path: ROUTES.APP.PROFILE,
    group: 1,
  },
  {
    id: "messenger",
    label: "Messenger",
    component: "MessengerIcon",
    path: ROUTES.APP.MESSENGER,
    group: 1,
  },
  {
    id: "search",
    label: "Search",
    component: "SearchIcon",
    path: ROUTES.APP.SEARCH,
    group: 1,
  },
  {
    id: "statistics",
    label: "Statistics",
    component: "StatisticsIcon",
    path: ROUTES.APP.STATISTICS,
    group: 2,
  },
  {
    id: "favorites",
    label: "Favorites",
    component: "FavoritesIcon",
    path: ROUTES.APP.FAVORITES,
    group: 2,
  },
];

export const logoutItem = {
  id: "logout",
  label: "Log Out",
};
