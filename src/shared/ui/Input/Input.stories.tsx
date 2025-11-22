import { Meta, StoryObj } from "@storybook/nextjs";
import { Input } from "./Input";

const meta = {
  title: "Input",
  component: Input,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#000000" },
        { name: "light", value: "#ffffff" },
        { name: "gray", value: "#808080" },
      ],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "password", "search"],
    },
    disabled: {
      control: "boolean",
    },
    fullWidth: {
      control: "boolean",
    },
  },
  decorators: [
    Story => (
      <div
        style={{
          padding: "40px",
          backgroundColor: "#000000",
          color: "white",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof Input>;

// Основная история со всеми вариантами
export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "60px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      {/* Text Inputs */}
      <section>
        <h2
          style={{
            margin: "0 0 30px 0",
            fontSize: "24px",
            fontWeight: "600",
            borderBottom: "1px solid #333",
            paddingBottom: "10px",
          }}
        >
          Text Inputs
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
          <div>
            <h3 style={{ margin: "0 0 15px 0", fontSize: "16px", color: "#aaa" }}>Basic</h3>
            <Input type="text" placeholder="Enter text..." />
          </div>

          <div>
            <h3 style={{ margin: "0 0 15px 0", fontSize: "16px", color: "#aaa" }}>With Label</h3>
            <Input type="text" label="Text Input" placeholder="Enter text..." />
          </div>

          <div>
            <h3 style={{ margin: "0 0 15px 0", fontSize: "16px", color: "#aaa" }}>With Error</h3>
            <Input type="text" label="Text Input" placeholder="Enter text..." error="This field is required" />
          </div>

          <div>
            <h3 style={{ margin: "0 0 15px 0", fontSize: "16px", color: "#aaa" }}>Disabled</h3>
            <Input type="text" label="Text Input" placeholder="Enter text..." disabled />
          </div>

          <div>
            <h3 style={{ margin: "0 0 15px 0", fontSize: "16px", color: "#aaa" }}>Full Width</h3>
            <Input type="text" label="Full Width Input" placeholder="Enter text..." fullWidth />
          </div>
        </div>
      </section>

      {/* Password Inputs */}
      <section>
        <h2
          style={{
            margin: "0 0 30px 0",
            fontSize: "24px",
            fontWeight: "600",
            borderBottom: "1px solid #333",
            paddingBottom: "10px",
          }}
        >
          Password Inputs
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
          <div>
            <h3 style={{ margin: "0 0 15px 0", fontSize: "16px", color: "#aaa" }}>Basic</h3>
            <Input type="password" placeholder="Enter password..." />
          </div>

          <div>
            <h3 style={{ margin: "0 0 15px 0", fontSize: "16px", color: "#aaa" }}>With Label</h3>
            <Input type="password" label="Password" placeholder="Enter password..." />
          </div>

          <div>
            <h3 style={{ margin: "0 0 15px 0", fontSize: "16px", color: "#aaa" }}>With Error</h3>
            <Input
              type="password"
              label="Password"
              placeholder="Enter password..."
              error="Password must be at least 8 characters"
            />
          </div>

          <div>
            <h3 style={{ margin: "0 0 15px 0", fontSize: "16px", color: "#aaa" }}>Disabled</h3>
            <Input type="password" label="Password" placeholder="Enter password..." disabled />
          </div>
        </div>
      </section>

      {/* Search Inputs */}
      <section>
        <h2
          style={{
            margin: "0 0 30px 0",
            fontSize: "24px",
            fontWeight: "600",
            borderBottom: "1px solid #333",
            paddingBottom: "10px",
          }}
        >
          Search Inputs
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
          <div>
            <h3 style={{ margin: "0 0 15px 0", fontSize: "16px", color: "#aaa" }}>Basic</h3>
            <Input type="search" placeholder="Search..." />
          </div>

          <div>
            <h3 style={{ margin: "0 0 15px 0", fontSize: "16px", color: "#aaa" }}>With Label</h3>
            <Input type="search" label="Search" placeholder="Search..." />
          </div>

          <div>
            <h3 style={{ margin: "0 0 15px 0", fontSize: "16px", color: "#aaa" }}>With Error</h3>
            <Input type="search" label="Search" placeholder="Search..." error="Search query is too short" />
          </div>

          <div>
            <h3 style={{ margin: "0 0 15px 0", fontSize: "16px", color: "#aaa" }}>Disabled</h3>
            <Input type="search" label="Search" placeholder="Search..." disabled />
          </div>
        </div>
      </section>
    </div>
  ),
};
