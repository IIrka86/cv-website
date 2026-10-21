import { Heading, HEADING_VARIANTS } from './Heading';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  component: Heading,
  args: {
    as: 'h2',
    children: 'Heading',
  },
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'display-xl',
  },
};

export const AllVariants: Story = {
  argTypes: {
    variant: { control: false },
  },
  render: (args) => (
    <div>
      {HEADING_VARIANTS.map((variant) => (
        <Heading key={variant} {...args} variant={variant}>
          {variant}
        </Heading>
      ))}
    </div>
  ),
};
