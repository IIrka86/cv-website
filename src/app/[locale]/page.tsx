import { Section } from '@/components/ui/Section';
import { Stack } from '@/components/ui/Stack';
import { Heading } from '@/components/ui/Heading';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations();
  return (
    <Section>
      <Stack>
        <Heading as="h1">{t('hello')}</Heading>
      </Stack>
    </Section>
  );
}
