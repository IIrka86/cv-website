import { Card, CARD_SURFACES } from './Card';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { Stack } from '@/components/ui/Stack';
import { Section, SECTION_TONES } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { CardLink } from '@/components/ui/Card/CardLink';

const meta = {
  component: Card,
  args: {
    surface: 'default',
    children: (
      <>
        <Heading as={'h3'} variant={'heading-md'}>
          {"Bachelor's in Computer Science"}
        </Heading>
        <Text>
          Full Stack Developer with a strong Frontend focus, building fast,
          scalable, and user-friendly web applications. I enjoy turning complex
          requirements into clean, maintainable solutions that people actually
          enjoy using.
        </Text>
      </>
    ),
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sunken: Story = {
  argTypes: {
    surface: { control: false },
  },
  render: (args) => (
    <>
      {SECTION_TONES.map((tone) => (
        <Section tone={tone} key={tone}>
          <Container>
            <Card {...args} surface="sunken">
              <Heading as={'h2'}>{"Bachelor's in Computer Science"}</Heading>
              <Text>
                Full Stack Developer with a strong Frontend focus, building
                fast, scalable, and user-friendly web applications. I enjoy
                turning complex requirements into clean, maintainable solutions
                that people actually enjoy using.
              </Text>
            </Card>
          </Container>
        </Section>
      ))}
    </>
  ),
};

export const Interactive: Story = {
  argTypes: {
    surface: { control: false },
  },
  render: (args) => (
    <>
      {SECTION_TONES.map((tone) => (
        <Section tone={tone} key={tone}>
          <Container>
            <Card {...args} interactive>
              <Heading as={'h2'}>{"Bachelor's in Computer Science"}</Heading>
              <CardLink href={'https://github.com/IIrka86/cv-website'}>
                Some Link
              </CardLink>
              <Text>
                Full Stack Developer with a strong Frontend focus, building
                fast, scalable, and user-friendly web applications. I enjoy
                turning complex requirements into clean, maintainable solutions
                that people actually enjoy using.
              </Text>
            </Card>
          </Container>
        </Section>
      ))}
    </>
  ),
};

export const Selected: Story = {
  argTypes: {
    surface: { control: false },
  },
  render: (args) => (
    <>
      {SECTION_TONES.map((tone) => (
        <Section tone={tone} key={tone}>
          <Container>
            <Stack gap={8}>
              <Card {...args} selected>
                <Heading as={'h2'}>{"Bachelor's in Computer Science"}</Heading>
                <Text>
                  Full Stack Developer with a strong Frontend focus, building
                  fast, scalable, and user-friendly web applications. I enjoy
                  turning complex requirements into clean, maintainable
                  solutions that people actually enjoy using.
                </Text>
              </Card>
              <Card {...args} interactive selected>
                <Heading as={'h2'}>{"Bachelor's in Computer Science"}</Heading>
                <CardLink href={'https://github.com/IIrka86/cv-website'}>
                  Some Link
                </CardLink>
                <Text>
                  Full Stack Developer with a strong Frontend focus, building
                  fast, scalable, and user-friendly web applications. I enjoy
                  turning complex requirements into clean, maintainable
                  solutions that people actually enjoy using.
                </Text>
              </Card>
            </Stack>
          </Container>
        </Section>
      ))}
    </>
  ),
};

export const OnAllBands: Story = {
  argTypes: {
    surface: { control: false },
  },
  render: (args) => (
    <>
      {SECTION_TONES.map((tone) => (
        <Section tone={tone} key={tone}>
          <Container>
            <Stack gap={8}>
              {CARD_SURFACES.map((surface) => (
                <Card key={surface} {...args} surface={surface}>
                  <Heading as={'h2'} variant={'heading-xl'}>
                    {surface}
                  </Heading>
                  <Text>
                    Full Stack Developer with a strong Frontend focus, building
                    fast, scalable, and user-friendly web applications. I enjoy
                    turning complex requirements into clean, maintainable
                    solutions that people actually enjoy using.
                  </Text>
                </Card>
              ))}
            </Stack>
          </Container>
        </Section>
      ))}
    </>
  ),
};
