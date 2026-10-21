import { Cluster } from './Cluster';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Text } from '@/components/ui/Text';
import { SPACE_SCALE } from '@/styles/tokens/space';
import { Stack } from '@/components/ui/Stack';

const meta = {
  component: Cluster,
} satisfies Meta<typeof Cluster>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    gap: 4,
    children: (
      <>
        <Text variant="mono-md">mono-text</Text>
        <Text variant="mono-md">mono-text</Text>
      </>
    ),
  },
};

export const AllGaps: Story = {
  argTypes: { gap: { control: false } },
  render: (args) => (
    <Stack gap={8}>
      {SPACE_SCALE.map((gap) => (
        <Stack key={gap} gap={4}>
          <Text variant="mono-label">gap {gap}</Text>
          <Cluster {...args} gap={gap}>
            <Text variant="mono-md">mono-text</Text>
            <Text variant="mono-xs">mono-text</Text>
          </Cluster>
        </Stack>
      ))}
    </Stack>
  ),
};

export const Wrapping: Story = {
  argTypes: { gap: { control: false } },
  render: (args) => (
    <Cluster {...args} gap={10}>
      <Text variant="mono-md">mono-text</Text>
      <Text variant="mono-md">mono-text</Text>
      <Text variant="mono-md">mono-text</Text>
      <Text variant="mono-md">mono-text</Text>
      <Text variant="mono-md">mono-text</Text>
      <Text variant="mono-md">mono-text</Text>
      <Text variant="mono-md">mono-text</Text>
      <Text variant="mono-md">mono-text</Text>
      <Text variant="mono-md">mono-text</Text>
      <Text variant="mono-md">mono-text</Text>
      <Text variant="mono-md">mono-text</Text>
      <Text variant="mono-md">mono-text</Text>
      <Text variant="mono-md">mono-text</Text>
    </Cluster>
  ),
};
