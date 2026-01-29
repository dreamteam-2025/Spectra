import type { Meta, StoryObj } from "@storybook/nextjs";
import { ImageSlider } from "./ImageSlider";
import { withDarkTheme } from "@/shared";

// пока временно моковые данные:
import postImage1 from "../../../../public/images/post-image-mock.png";
import postImage2 from "../../../../public/images/post-image-mock2.png";
import postImage3 from "../../../../public/images/post-image-mock3.png";
import postImage4 from "../../../../public/images/post-image-mock4.png";

const meta = {
  title: "shared/ImageSlider",
  component: ImageSlider,
  parameters: {
    layout: "center",
  },
  tags: ["autodocs"],
  decorators: [withDarkTheme],
} satisfies Meta<typeof ImageSlider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    slides: [
      { id: 0, postImage: postImage1 },
      { id: 1, postImage: postImage2 },
      { id: 2, postImage: postImage3 },
      { id: 3, postImage: postImage4 },
    ],
  },
};
