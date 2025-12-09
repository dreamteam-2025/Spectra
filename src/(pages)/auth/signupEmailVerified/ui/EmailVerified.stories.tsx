import { Meta, StoryObj } from "@storybook/nextjs";
import { EmailVerified } from "./EmailVerified";
import { ROUTES } from "@/shared";

const meta = {
  title: "Page/EmailVerified",
  component: EmailVerified,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true, // мы используем app router
      navigation: {
        pathname: ROUTES.AUTH.EMAIL_VERIFIED,
        query: {},
      },
    },
  },
} satisfies Meta<typeof EmailVerified>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Default variant. */
export const EmailVerifiedPage: Story = {
  args: {},
};
