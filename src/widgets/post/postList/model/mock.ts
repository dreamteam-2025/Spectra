// widgets/posts/postList/model/mockPosts.ts
import postImage from "../../../../../public/images/post-image-mock.png";
import postImage2 from "../../../../../public/images/post-image-mock2.png";
import postImage3 from "../../../../../public/images/post-image-mock3.png";
import postImage4 from "../../../../../public/images/post-image-mock4.png";
import avatar from "../../../../../public/images/avatar-image-mock.png";

export type MockPostSlide = {
  id: number;
  postImage: typeof postImage | string;
};

export type MockPost = {
  id: number;
  slides: MockPostSlide[];
  avatarImage: typeof avatar;
  userName: string;
  createdAt: string;
  text: string;
};

export const mockPosts: MockPost[] = [
  {
    id: 1,
    slides: [
      { id: 1, postImage: postImage },
      { id: 2, postImage: postImage2 },
      { id: 3, postImage: postImage3 },
    ],
    avatarImage: avatar,
    userName: "UserName",
    createdAt: "2024-01-15T12:30:00Z",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. voluptatem accusantium doloremque",
  },
  {
    id: 2,
    slides: [
      { id: 1, postImage: postImage4 },
      { id: 2, postImage },
    ],
    avatarImage: avatar,
    userName: "UserName",
    createdAt: "2024-01-14T09:15:00Z",
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    id: 3,
    slides: [
      { id: 1, postImage: postImage2 },
      { id: 2, postImage: postImage },
      { id: 3, postImage: postImage3 },
    ],
    avatarImage: avatar,
    userName: "UserName",
    createdAt: "2024-01-14T09:15:00Z",
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    id: 4,
    slides: [
      { id: 1, postImage },
      { id: 2, postImage },
    ],
    avatarImage: avatar,
    userName: "UserName",
    createdAt: "2024-01-14T09:15:00Z",
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    id: 5,
    slides: [{ id: 1, postImage }],
    avatarImage: avatar,
    userName: "UserName",
    createdAt: "2024-01-14T09:15:00Z",
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
];
