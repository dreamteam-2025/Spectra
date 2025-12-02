import type { Meta, StoryObj } from "@storybook/nextjs";
import type { ComponentProps } from "react";
import { useState } from "react";
import { Recaptcha } from "@/shared";

type RecaptchaProps = ComponentProps<typeof Recaptcha>;

const RecaptchaStoryMock = (props: RecaptchaProps) => {
  const [verified, setVerified] = useState(false);
  const isDark = props.theme === "dark";

  const handleToggle = () => {
    if (verified) return;

    const next = !verified;
    setVerified(next);
    props.onChangeAction?.(next ? "mock_token_123" : "");
  };

  return (
    <div
      style={{
        width: 304,
        fontFamily: "Roboto, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <button
        type="button"
        onClick={handleToggle}
        disabled={verified}
        style={{
          border: `1px solid ${isDark ? "var(--dark-300)" : "var(--light-700)"}`,
          borderRadius: 2,
          background: isDark ? "var(--dark-500)" : "var(--light-300)",
          width: "100%",
          height: 78,
          padding: "0 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 26,
              height: 26,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!verified && (
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 2,
                  border: "1px solid var(--light-900)",
                  background: "var(--light-100)",
                }}
              />
            )}
            {verified && (
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                style={{
                  color: "var(--success-700)",
                }}
              >
                <path
                  fill="currentColor"
                  d="M20.29 5.71a1 1 0 0 0-1.42 0l-9.17 9.17-4.29-4.29a1 1 0 1 0-1.42 1.42l5 5a1 1 0 0 0 1.42 0l10-10a1 1 0 0 0 0-1.42z"
                />
              </svg>
            )}
          </div>

          <span
            style={{
              fontSize: 16,
              fontWeight: 400,
              color: isDark ? "var(--light-100)" : "var(--dark-900)",
            }}
          >
            I’m not a robot
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 80,
            gap: 2,
          }}
        >
          <img src="/icons/recaptcha.svg" style={{ width: 32, height: 32 }} alt="recaptcha" />
          <span style={{ fontSize: 10, color: isDark ? "var(--light-100)" : "var(--light-900)" }}>reCAPTCHA</span>
          <span style={{ fontSize: 9, color: isDark ? "var(--light-100)" : "var(--light-900)" }}>Privacy - Terms</span>
        </div>
      </button>
    </div>
  );
};

const meta: Meta<typeof Recaptcha> = {
  title: "UI/Recaptcha",
  component: Recaptcha,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    theme: {
      control: "radio",
      options: ["light", "dark"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Recaptcha>;

export const Light: Story = {
  args: {
    theme: "light",
    onChangeAction: token => console.log("mock token:", token),
  },
  render: args => <RecaptchaStoryMock {...args} />,
};

export const Dark: Story = {
  args: {
    theme: "dark",
    onChangeAction: token => console.log("mock token:", token),
  },
  render: args => <RecaptchaStoryMock {...args} />,
};
