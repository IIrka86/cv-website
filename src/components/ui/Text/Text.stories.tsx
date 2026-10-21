import { Text, TEXT_TONES, TEXT_VARIANTS } from './Text';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  component: Text,
  args: {
    as: 'p',
    children: 'Text',
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'body',
  },
};

export const AllVariants: Story = {
  argTypes: {
    variant: { control: false },
    tone: { control: false },
  },
  render: (args) => (
    <div>
      {TEXT_VARIANTS.map((variant) => (
        <Text key={variant} {...args} variant={variant}>
          {variant}
        </Text>
      ))}
    </div>
  ),
};

export const AllTones: Story = {
  argTypes: {
    variant: { control: false },
    tone: { control: false },
  },
  render: (args) => (
    <div>
      {TEXT_TONES.map((tone) => (
        <Text key={tone} {...args} tone={tone}>
          {tone}
        </Text>
      ))}
    </div>
  ),
};
