import {
  Button,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  ICON_POSITIONS,
} from './Button';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Cluster } from '@/components/ui/Cluster';
import { Section, SECTION_TONES } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Stack } from '@/components/ui/Stack';

const meta = {
  component: Button,
  args: {
    variant: 'primary',
    size: 'lg',
    children: 'Button',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllVariants: Story = {
  argTypes: {
    variant: { control: false },
    disabled: { control: false },
  },
  render: (args) => (
    <>
      {SECTION_TONES.map((tone) => (
        <Section tone={tone} key={tone}>
          <Container>
            <Stack gap={8}>
              <Cluster gap={8}>
                {BUTTON_VARIANTS.map(
                  (variant) =>
                    variant !== 'icon' && (
                      <Button key={variant} {...args} variant={variant}>
                        {variant}
                      </Button>
                    ),
                )}
                <Button variant="icon" icon="calendar" aria-label="calendar" />
              </Cluster>
              <Cluster gap={8}>
                {BUTTON_VARIANTS.map(
                  (variant) =>
                    variant !== 'icon' && (
                      <Button
                        key={variant}
                        {...args}
                        variant={variant}
                        disabled
                      >
                        {variant}
                      </Button>
                    ),
                )}
                <Button
                  variant="icon"
                  icon="calendar"
                  aria-label="calendar"
                  disabled
                />
              </Cluster>
            </Stack>
          </Container>
        </Section>
      ))}
    </>
  ),
};

export const AllSizes: Story = {
  argTypes: {
    size: { control: false },
  },
  render: (args) => (
    <Cluster gap={8}>
      {BUTTON_SIZES.map((size) => (
        <Button key={size} {...args} variant={'primary'} size={size}>
          Button {size}
        </Button>
      ))}
    </Cluster>
  ),
};

export const WithIcon: Story = {
  argTypes: {
    icon: { control: false },
    iconPosition: { control: false },
  },
  render: (args) => (
    <Cluster gap={8}>
      {ICON_POSITIONS.map((position) => (
        <Button
          key={position}
          {...args}
          icon="calendar"
          iconPosition={position}
          variant={'primary'}
        >
          {position}
        </Button>
      ))}
    </Cluster>
  ),
};

export const Disabled: Story = {
  argTypes: {
    variant: { control: false },
    disabled: { control: false },
  },
  render: (args) => (
    <>
      {(['default', 'dark'] as const).map((tone) => (
        <Section tone={tone} key={tone}>
          <Container>
            <Cluster gap={8}>
              {BUTTON_VARIANTS.map(
                (variant) =>
                  variant !== 'icon' && (
                    <Button key={variant} {...args} variant={variant} disabled>
                      {variant}
                    </Button>
                  ),
              )}
              <Button
                variant="icon"
                icon="calendar"
                aria-label="calendar"
                disabled
              />
            </Cluster>
          </Container>
        </Section>
      ))}
    </>
  ),
};
