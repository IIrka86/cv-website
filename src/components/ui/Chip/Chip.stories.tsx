import { Chip, CHIP_VARIANTS } from './Chip';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Section, SECTION_TONES } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Cluster } from '@/components/ui/Cluster';
import { Stack } from '@/components/ui/Stack';

const meta = {
  component: Chip,
  args: {
    children: 'TypeScript',
  },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

const chips = [
  'React',
  'TypeScript',
  'Next.js',
  'Redux',
  'Node.js',
  'React Testing Library',
];

export const Default: Story = {};

export const AllVariants: Story = {
  argTypes: {
    variant: { control: false },
  },
  render: (args) => (
    <>
      {SECTION_TONES.map((tone) => (
        <Section tone={tone} key={tone}>
          <Container>
            <Stack gap={8}>
              {CHIP_VARIANTS.map((variant) => (
                <Cluster gap={8} as="ul" key={variant}>
                  {chips.map((chip) => (
                    <li key={chip}>
                      <Chip {...args} variant={variant}>
                        {chip}
                      </Chip>
                    </li>
                  ))}
                </Cluster>
              ))}
            </Stack>
          </Container>
        </Section>
      ))}
    </>
  ),
};
