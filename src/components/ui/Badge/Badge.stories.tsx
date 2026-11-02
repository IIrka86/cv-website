import type { BadgeTone } from './Badge';
import { Badge } from './Badge';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Section, SECTION_TONES } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Cluster } from '@/components/ui/Cluster';

const meta = {
  component: Badge,
  args: {
    tone: 'status',
    pulse: true,
    children: 'Open to offers',
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const badges: { tone: BadgeTone; pulse: boolean; text: string }[] = [
  { pulse: true, tone: 'status', text: 'Open to offers' },
  { pulse: false, tone: 'duration', text: '3 yrs 4 mos' },
  { pulse: false, tone: 'info', text: 'Site · PL' },
];

export const AllVariants: Story = {
  argTypes: {
    tone: { control: false },
  },
  render: (args) => (
    <>
      {SECTION_TONES.map((tone) => (
        <Section tone={tone} key={tone}>
          <Container>
            <Cluster gap={8} as="ul">
              {badges.map((badge) => (
                <li key={badge.text}>
                  <Badge {...args} tone={badge.tone} pulse={badge.pulse}>
                    {badge.text}
                  </Badge>
                </li>
              ))}
            </Cluster>
          </Container>
        </Section>
      ))}
    </>
  ),
};

export const LongText: Story = {
  args: {
    children: 'Открыта к предложениям',
  },
};
