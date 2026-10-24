import { Icon, ICON_NAMES, ICON_SIZES } from './Icon';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Cluster } from '@/components/ui/Cluster';
import { Stack } from '@/components/ui/Stack';
import { Text } from '@/components/ui/Text';

const meta = {
  component: Icon,
  args: {
    name: 'calendar',
    size: 'lg',
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllNames: Story = {
  argTypes: {
    name: { control: false },
  },
  render: (args) => (
    <Cluster gap={12}>
      {ICON_NAMES.map((name) => (
        <Stack gap={4} key={name}>
          <Icon {...args} name={name} />
          <Text variant={'small'}>{name}</Text>
        </Stack>
      ))}
    </Cluster>
  ),
};

export const AllSizes: Story = {
  argTypes: {
    size: { control: false },
  },
  render: (args) => (
    <Cluster gap={12}>
      {ICON_SIZES.map((size) => (
        <Stack gap={4} key={size}>
          <Icon {...args} size={size} />
          <Text variant={'small'}>{size}</Text>
        </Stack>
      ))}
    </Cluster>
  ),
};
