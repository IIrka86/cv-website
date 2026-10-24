import { BUTTON_LINK_VARIANTS, ButtonLink } from './ButtonLink';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Section, SECTION_TONES } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Cluster } from '@/components/ui/Cluster';

const meta = {
  component: ButtonLink,
  args: {
    variant: 'primary',
    size: 'lg',
    href: 'https://github.com/IIrka86/cv-website',
    children: 'Button',
  },
} satisfies Meta<typeof ButtonLink>;

export default meta;

type Story = StoryObj<typeof meta>;

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
            <Cluster gap={8}>
              {BUTTON_LINK_VARIANTS.map(
                (variant) =>
                  variant !== 'icon' && (
                    <ButtonLink key={variant} {...args} variant={variant}>
                      {variant}
                    </ButtonLink>
                  ),
              )}
              <ButtonLink
                variant="icon"
                icon="calendar"
                aria-label="calendar"
                href={'https://github.com/IIrka86/cv-website'}
              />
            </Cluster>
          </Container>
        </Section>
      ))}
    </>
  ),
};

export const AllKinds: Story = {
  argTypes: {
    variant: { control: false },
  },
  render: (args) => (
    <Section>
      <Container>
        <Cluster gap={8}>
          <ButtonLink {...args} variant={'primary'} href={'#contacts'}>
            Contacts
          </ButtonLink>
          <ButtonLink
            {...args}
            variant={'primary'}
            href={'/en/cv.pdf'}
            download
          >
            Download
          </ButtonLink>
          <ButtonLink
            {...args}
            variant={'primary'}
            href={'mailto:iiirka86@gmail.com'}
          >
            Mail to
          </ButtonLink>
          <ButtonLink
            {...args}
            variant={'primary'}
            href={'https://github.com/IIrka86/cv-website'}
          >
            GitHub
          </ButtonLink>
          <ButtonLink {...args} variant={'primary'} href={'/admin'}>
            Admin
          </ButtonLink>
        </Cluster>
      </Container>
    </Section>
  ),
};
