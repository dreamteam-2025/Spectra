import { Decorator } from "@storybook/nextjs";

export const withDarkTheme: Decorator = StoryFn => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px",
      backgroundColor: "#0d0d0d",
      color: "white",
      width: "100%",
    }}
  >
    <StoryFn />
  </div>
);

// Экспортируем массив декораторов
export const globalDecorators = [withDarkTheme];
