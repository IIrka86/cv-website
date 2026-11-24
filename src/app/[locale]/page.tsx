import { Section } from '@/components/ui/Section';
import { Stack } from '@/components/ui/Stack';
import { Heading } from '@/components/ui/Heading';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Common');
  return (
    <Section>
      <Stack gap={4}>
        <Heading as="h1" variant={'heading-xl'}>
          {t('name')}
        </Heading>
        <Heading as="h2">{t('title')}</Heading>
      </Stack>
    </Section>
  );
}
