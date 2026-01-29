import { Meta, StoryObj } from "@storybook/nextjs";
import { PasswordRecovery } from "./PasswordRecovery";
import { withDarkTheme } from "@/shared";

const meta = {
  title: "Page/PasswordRecovery",
  component: PasswordRecovery,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [withDarkTheme],
} satisfies Meta<typeof PasswordRecovery>;

export default meta;

type Story = StoryObj<typeof meta>;

export const RecoveryPage: Story = {
  args: {},
};
