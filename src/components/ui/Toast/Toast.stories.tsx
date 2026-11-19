import { Toast } from './Toast';
import { ToastProvider, useToast } from './ToastProvider';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from '@/components/ui/Button';

const meta = {
  component: Toast,
  args: {
    children: 'Saved — the site is updated',
  },
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongText: Story = {
  args: {
    children:
      'Saved — the site is updated. The new title shows on every language version within a minute',
  },
};

const SaveButton = () => {
  const showToast = useToast();

  return (
    <Button onClick={() => showToast('Saved — the site is updated')}>
      Save
    </Button>
  );
};

export const WithProvider: Story = {
  render: () => (
    <ToastProvider>
      <SaveButton />
    </ToastProvider>
  ),
};
