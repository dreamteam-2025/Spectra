import { Meta, StoryObj } from "@storybook/nextjs";
import { Loader } from "./Loader";

const meta = {
  title: "UI/Loader",
  component: Loader,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Loader>;

export default meta;

type Story = StoryObj<typeof meta>;

/** DEFAULT */

export const LoaderDefault: Story = {
  args: {},
};
