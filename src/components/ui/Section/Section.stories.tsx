import { Section, SECTION_TONES } from './Section';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Container } from '@/components/ui/Container';
import { Text } from '@/components/ui/Text';
import { Stack } from '@/components/ui/Stack';
import { Fragment } from 'react';
import { Heading } from '@/components/ui/Heading';

const meta = {
  parameters: { layout: 'fullscreen' },
  component: Section,
} satisfies Meta<typeof Section>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tone: 'default',
    padding: 'default',
    children: (
      <Container>
        <Text>
          I’m a Full Stack Developer with a strong Frontend focus, building
          fast, scalable, and user-friendly web applications. I enjoy turning
          complex requirements into clean, maintainable solutions that people
          actually enjoy using.
        </Text>
      </Container>
    ),
  },
};

export const AllTones: Story = {
  argTypes: {
    tone: { control: false },
  },
  render: (args) => (
    <div>
      {SECTION_TONES.map((tone) => (
        <Fragment key={tone}>
          <Text variant="mono-label">Section {tone}</Text>
          <Section {...args} tone={tone}>
            <Container>
              <Stack gap={4}>
                <Heading as={'h3'}>I’m a Full Stack Developer </Heading>
                <Text>
                  I’m a Full Stack Developer with a strong Frontend focus,
                  building fast, scalable, and user-friendly web applications. I
                  enjoy turning complex requirements into clean, maintainable
                  solutions that people actually enjoy using.
                </Text>
                <Text tone="secondary">
                  Over the past 7+ years, I’ve worked across the full
                  development lifecycle — from architecting new products and
                  refactoring legacy codebases to implementing features and
                  integrating backend services. My main expertise is in frontend
                  development with React and TypeScript, while I also have
                  hands-on experience with backend development, including
                  implementing API endpoints and smaller backend solutions using
                  Node.js and Java. I’m comfortable owning tasks end-to-end,
                  from designing and testing UI components to working with APIs,
                  data flows, and backend logic.
                </Text>
                <Text tone="muted">
                  I’ve also mentored junior developers, participated in
                  architectural decisions, and collaborated closely with design
                  and product teams.
                </Text>
                <a href="#">Some link</a>
              </Stack>
            </Container>
          </Section>
        </Fragment>
      ))}
    </div>
  ),
};
