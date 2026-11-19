import { Switch } from './Switch';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Stack } from '@/components/ui/Stack';

const meta = {
  component: Switch,
  args: {
    label: 'DigitalMara',
    name: 'showCompany',
    stateLabels: { on: 'Shown', off: 'Hidden' },
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const On: Story = {
  args: {
    defaultChecked: true,
  },
};

export const WithoutStateLabels: Story = {
  args: {
    label: 'Available for work',
    stateLabels: undefined,
  },
};

export const Disabled: Story = {
  args: {
    label: 'English',
    disabled: true,
    defaultChecked: true,
  },
};

export const List: Story = {
  render: (args) => (
    <Stack>
      <Switch
        {...args}
        name="lang-en"
        label="English"
        defaultChecked
        disabled
      />
      <Switch {...args} name="lang-ru" label="Russian" defaultChecked />
      <Switch {...args} name="lang-pl" label="Polish" />
    </Stack>
  ),
};
