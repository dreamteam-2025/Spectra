import { Meta, StoryObj } from "@storybook/nextjs";
import { PasswordRecovery } from "./PasswordRecovery";

const meta = {
  title: "Page/PasswordRecovery",
  component: PasswordRecovery,
} satisfies Meta<typeof PasswordRecovery>;

export default meta;

type Story = StoryObj<typeof PasswordRecovery>;

export const RecoveryPage: Story = {
  args: {},
};
