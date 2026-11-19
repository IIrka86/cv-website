import { SegmentedControl } from './SegmentedControl';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Section } from '@/components/ui/Section';

const LANGUAGES = [
  { value: 'en', label: 'EN', href: '/en', lang: 'en' },
  { value: 'ru', label: 'RU', href: '/ru', lang: 'ru' },
  { value: 'pl', label: 'PL', href: '/pl', lang: 'pl' },
];

const meta = {
  component: SegmentedControl,
  args: {
    label: 'Site language',
    options: LANGUAGES,
    value: 'en',
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TwoOptions: Story = {
  args: {
    options: LANGUAGES.slice(0, 2),
    value: 'ru',
  },
};

export const FourOptions: Story = {
  args: {
    options: [
      ...LANGUAGES,
      { value: 'de', label: 'DE', href: '/de', lang: 'de' },
    ],
    value: 'pl',
  },
};

export const OnDarkBand: Story = {
  render: (args) => (
    <Section tone="dark">
      <SegmentedControl {...args} />
    </Section>
  ),
};
