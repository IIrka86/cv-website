import Sandbox from './Sandbox';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  component: Sandbox,
} satisfies Meta<typeof Sandbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
