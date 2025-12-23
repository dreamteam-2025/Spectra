import { useState } from "react";
import { Button, Dialog } from "@/shared";
import { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof Dialog> = {
  title: "shared/Dialog",
  component: Dialog,
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>
          Open dialog
        </Button>

        <Dialog open={open} onOpenChange={setOpen} title="Dialog title" description="This is a dialog description" />
      </>
    );
  },
};
