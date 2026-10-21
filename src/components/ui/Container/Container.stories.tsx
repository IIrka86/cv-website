import { Container } from './Container';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Text } from '@/components/ui/Text';
import { Stack } from '@/components/ui/Stack';
import { Section } from '@/components/ui/Section';

const meta = {
  parameters: { layout: 'fullscreen' },
  component: Container,
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Section tone="tint">
      <Container {...args}>
        <Stack gap={4}>
          <Text>
            I’m a Full Stack Developer with a strong Frontend focus, building
            fast, scalable, and user-friendly web applications. I enjoy turning
            complex requirements into clean, maintainable solutions that people
            actually enjoy using.
          </Text>
          <Text>
            Over the past 7+ years, I’ve worked across the full development
            lifecycle — from architecting new products and refactoring legacy
            codebases to implementing features and integrating backend services.
            My main expertise is in frontend development with React and
            TypeScript, while I also have hands-on experience with backend
            development, including implementing API endpoints and smaller
            backend solutions using Node.js and Java. I’m comfortable owning
            tasks end-to-end, from designing and testing UI components to
            working with APIs, data flows, and backend logic. I’ve also mentored
            junior developers, participated in architectural decisions, and
            collaborated closely with design and product teams.
          </Text>
        </Stack>
      </Container>
    </Section>
  ),
};
