import { RadioGroup } from './RadioGroup';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  component: RadioGroup,
  args: {
    label: 'Location',
    name: 'location',
    options: [
      { value: 'warsaw', label: 'Warsaw, Poland' },
      { value: 'krakow', label: 'Kraków, Poland' },
      { value: 'remote', label: 'Remote' },
    ],
    defaultValue: 'warsaw',
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHint: Story = {
  args: {
    hint: 'Shown in the hero under your title',
  },
};

export const WithError: Story = {
  args: {
    defaultValue: undefined,
    required: true,
    error: 'Choose where you work from',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
