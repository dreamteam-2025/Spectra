// widgets/posts/postList/model/mockPosts.ts
import postImage from "../../../../../public/images/post-image-mock.png";
import avatar from "../../../../../public/images/avatar-image-mock.png";

export type MockPost = {
  id: number;
  postImage: typeof postImage;
  avatarImage: typeof avatar;
  userName: string;
  createdAt: string;
  text: string;
};

export const mockPosts: MockPost[] = [
  {
    id: 1,
    postImage: postImage,
    avatarImage: avatar,
    userName: "UserName",
    createdAt: "2024-01-15T12:30:00Z",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. voluptatem accusantium doloremque",
  },
  {
    id: 2,
    postImage: postImage,
    avatarImage: avatar,
    userName: "UserName",
    createdAt: "2024-01-14T09:15:00Z",
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    id: 3,
    postImage: postImage,
    avatarImage: avatar,
    userName: "UserName",
    createdAt: "2024-01-14T09:15:00Z",
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    id: 4,
    postImage: postImage,
    avatarImage: avatar,
    userName: "UserName",
    createdAt: "2024-01-14T09:15:00Z",
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    id: 5,
    postImage: postImage,
    avatarImage: avatar,
    userName: "UserName",
    createdAt: "2024-01-14T09:15:00Z",
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    id: 6,
    postImage: postImage,
    avatarImage: avatar,
    userName: "UserName",
    createdAt: "2024-01-14T09:15:00Z",
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    id: 7,
    postImage: postImage,
    avatarImage: avatar,
    userName: "UserName",
    createdAt: "2024-01-14T09:15:00Z",
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    id: 8,
    postImage: postImage,
    avatarImage: avatar,
    userName: "UserName",
    createdAt: "2024-01-14T09:15:00Z",
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    id: 9,
    postImage: postImage,
    avatarImage: avatar,
    userName: "UserName",
    createdAt: "2024-01-14T09:15:00Z",
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
];
