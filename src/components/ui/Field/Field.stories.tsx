import { Field, fieldControlClassName } from './Field';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Field is the base for TextField and the other *Field components;
// these stories show the bare render prop with a plain input
const meta = {
  component: Field,
  args: {
    label: 'Title',
    children: ({ controlProps }) => (
      <input name="title" className={fieldControlClassName} {...controlProps} />
    ),
  },
  argTypes: {
    children: { control: false },
  },
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHint: Story = {
  args: {
    hint: 'Shown under your name on the main page',
  },
};

export const WithError: Story = {
  args: {
    hint: 'Shown under your name on the main page',
    error: 'Title is too short: enter at least 3 characters',
  },
};

export const Required: Story = {
  args: {
    required: true,
    children: ({ controlProps }) => (
      <input
        name="title"
        required
        className={fieldControlClassName}
        {...controlProps}
      />
    ),
  },
};
