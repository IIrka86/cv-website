import { SelectField } from './SelectField';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  component: SelectField,
  args: {
    label: 'Level',
    name: 'level',
    options: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Native'],
  },
} satisfies Meta<typeof SelectField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Choose a level',
    required: true,
  },
};

export const ObjectOptions: Story = {
  args: {
    label: 'Title for the vacancy',
    name: 'title',
    options: [
      { value: 'frontend', label: 'Frontend Developer' },
      { value: 'fullstack', label: 'Full-stack Developer' },
      { value: 'react', label: 'React Developer' },
    ],
    defaultValue: 'fullstack',
  },
};

export const WithHint: Story = {
  args: {
    hint: 'CEFR level, shown next to the language',
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'Choose a level',
    error: 'Choose a level for this language',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'C1',
  },
};
