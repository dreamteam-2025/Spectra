import type { Meta, StoryObj } from "@storybook/nextjs";
import { SelectBox } from "./SelectBox";

const meta: Meta<typeof SelectBox> = {
  title: "UI/SelectBox",
  component: SelectBox,
  args: {
    label: "Language",
    value: "Russian",
    placeholder: "",
    disabled: false,
    options: ["Russian", "English", "Armenian"],
    onChange: (val: string) => console.log("Changed:", val),
  },
};

export default meta;
type Story = StoryObj<typeof SelectBox>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    icon: "flagrussia",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Preselected: Story = {
  args: {
    value: "English",
  },
};

export const ManyOptions: Story = {
  args: {
    value: "",
    placeholder: "Select...",
    options: [
      "English",
      "Spanish",
      "French",
      "German",
      "Italian",
      "Portuguese",
      "Russian",
      "Chinese",
      "Japanese",
      "Korean",
      "Arabic",
      "Hindi",
      "Bengali",
      "Urdu",
      "Turkish",
      "Dutch",
      "Polish",
      "Czech",
      "Swedish",
      "Norwegian",
      "Finnish",
      "Danish",
      "Greek",
      "Hebrew",
      "Thai",
    ],
  },
};
