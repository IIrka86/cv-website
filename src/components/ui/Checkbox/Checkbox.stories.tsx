import { Checkbox } from './Checkbox';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Stack } from '@/components/ui/Stack';

const meta = {
  component: Checkbox,
  args: {
    label: 'Show the start date',
    name: 'showStartDate',
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
};

export const Radio: Story = {
  render: (args) => (
    <Stack>
      <Checkbox
        {...args}
        type="radio"
        name="city"
        label="Warsaw"
        defaultChecked
      />
      <Checkbox {...args} type="radio" name="city" label="Minsk" />
    </Stack>
  ),
};

export const LongLabel: Story = {
  args: {
    label:
      'Show the company in the experience section even if the contract has not started yet',
  },
};
