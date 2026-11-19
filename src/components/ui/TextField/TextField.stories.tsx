import { TextField } from './TextField';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Stack } from '@/components/ui/Stack';

const meta = {
  component: TextField,
  args: {
    label: 'Title',
    name: 'title',
    placeholder: 'Frontend Developer',
  },
} satisfies Meta<typeof TextField>;

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
    defaultValue: 'FE',
    hint: 'Shown under your name on the main page',
    error: 'Title is too short: enter at least 3 characters',
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'Frontend Developer',
  },
};

export const WithPrefix: Story = {
  render: (args) => (
    <Stack gap={6}>
      <TextField {...args} name="title-en" prefix="EN" />
      <TextField {...args} name="title-ru" prefix="RU" />
      <TextField {...args} name="title-pl" prefix="PL" />
    </Stack>
  ),
};

export const LongTexts: Story = {
  args: {
    label: 'Short description shown in search results and link previews',
    error:
      'Description is too long: keep it under 160 characters so search engines show it in full',
  },
};

export const Form: Story = {
  render: () => (
    <form onSubmit={(event) => event.preventDefault()}>
      <Stack gap={6}>
        <TextField label="Title" name="title" required />
        <TextField
          label="Location"
          name="location"
          hint="City and country, e.g. Warsaw, Poland"
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          required
          error="Enter an email like name@example.com"
        />
        <button type="submit">Save</button>
      </Stack>
    </form>
  ),
};
