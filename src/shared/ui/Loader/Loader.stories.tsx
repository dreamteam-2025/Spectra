import { Meta, StoryObj } from "@storybook/nextjs";
import { Loader } from "./Loader";
import { withDarkTheme } from "@/shared";

const meta = {
  title: "UI/Loader",
  component: Loader,
  parameters: {
    layout: "center",
  },
  tags: ["autodocs"],
  decorators: [withDarkTheme],
} satisfies Meta<typeof Loader>;

export default meta;

type Story = StoryObj<typeof meta>;

/** DEFAULT */

export const LoaderDefault: Story = {
  args: {},
};
