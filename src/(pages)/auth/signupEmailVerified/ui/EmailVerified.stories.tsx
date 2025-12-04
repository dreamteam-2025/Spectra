import { Meta, StoryObj } from "@storybook/nextjs";
import { EmailVerified } from "./EmailVerified";
import { ROUTES } from "@/shared";

const meta = {
  title: "Page/EmailVerified",
  component: EmailVerified,
  parameters: {
    nextjs: {
      appDirectory: true, // мы используем app router
      navigation: {
        pathname: ROUTES.AUTH.EMAIL_VERIFIED,
        query: {},
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof EmailVerified>;

export default meta;

type Story = StoryObj<typeof EmailVerified>;

export const EmailVerifiedPage: Story = {
  args: {},
};
