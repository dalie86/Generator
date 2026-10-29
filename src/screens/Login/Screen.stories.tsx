import type { Meta, StoryObj } from "@storybook/react-vite";
import Screen from "./index";

const meta = {
  title: "Screens/Login",
  component: Screen,
  parameters: {
    docs: {
      description: {
        component:
          "Вход в два шага: логин и пароль → код из СМС. Демо: пароль `error` — ошибка входа, верный код — `123456`.",
      },
    },
  },
} satisfies Meta<typeof Screen>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Шаг 1: логин и пароль. */
export const Default: Story = {};

/** Шаг 2: ввод кода из СМС. */
export const Confirmation: Story = { args: { initialStep: "code" } };

/** Вход выполнен. */
export const Done: Story = { args: { initialStep: "done" } };
