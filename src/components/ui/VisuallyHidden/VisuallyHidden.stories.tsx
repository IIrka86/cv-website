import { VisuallyHidden } from './VisuallyHidden';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Text } from '@/components/ui/Text';

const meta = {
  component: VisuallyHidden,
  args: {
    children: '(opens in a new tab)',
  },
} satisfies Meta<typeof VisuallyHidden>;

export default meta;

type Story = StoryObj<typeof meta>;

// Nothing extra is visible: the hidden part shows up only in the
// Accessibility panel, as part of the paragraph's text
export const Default: Story = {
  render: (args) => (
    <Text>
      GitHub
      <VisuallyHidden {...args} />
    </Text>
  ),
};
