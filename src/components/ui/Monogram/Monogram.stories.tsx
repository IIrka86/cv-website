import { Monogram, MONOGRAM_SIZES } from './Monogram';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Cluster } from '@/components/ui/Cluster';

const meta = {
  component: Monogram,
  args: {
    children: 'MG',
  },
} satisfies Meta<typeof Monogram>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Muted: Story = {
  args: {
    muted: true,
  },
};

export const AllSizes: Story = {
  argTypes: {
    size: { control: false },
  },
  render: (args) => (
    <Cluster gap={2}>
      {MONOGRAM_SIZES.map((size) => (
        <Monogram key={size} {...args} size={size}>
          {size}
        </Monogram>
      ))}
    </Cluster>
  ),
};
