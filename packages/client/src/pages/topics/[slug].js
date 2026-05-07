import Head from 'next/head';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import QuizIcon from '@mui/icons-material/Quiz';
import CodeIcon from '@mui/icons-material/Code';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {
  PRODUCT_NAME, routes, DIFFICULTY_LABELS, DIFFICULTY_COLORS,
} from '@config';
import { fetchTopicBySlug } from '@services/topics';
import { useTopicBySlug } from '@hooks/use-topics';
import { prefetchQueries } from '@lib/ssr-helpers';
import { qk } from '@lib/query-keys';
import Markdown from '@components/Markdown';

export default function TopicDetailPage({ slug }) {
  const { data: topic, isLoading, error } = useTopicBySlug(slug);

  if (isLoading) {
    return (
      <Box>
        <Skeleton width={120} height={36} sx={{ mb: 2 }} />
        <Skeleton width="60%" height={60} sx={{ mb: 2 }} />
        <Skeleton variant="rounded" height={400} />
      </Box>
    );
  }

  if (error || !topic) {
    return (
      <Alert severity="error">
        {error?.message || 'Mavzu topilmadi'}
        <Box sx={{ mt: 2 }}>
          <Button component={Link} href={routes.topics} startIcon={<ArrowBackIcon />}>
            Mavzular ro'yxatiga qaytish
          </Button>
        </Box>
      </Alert>
    );
  }

  const questionsCount = topic.questions?.length || 0;
  const tasksCount = topic.practicalTasks?.length || 0;
  const hasContent = topic.theory?.trim().length > 0;

  return (
    <>
      <Head><title>{topic.title} — {PRODUCT_NAME}</title></Head>

      <Button component={Link} href={routes.topics} startIcon={<ArrowBackIcon />} sx={{ mb: 3 }}>
        Mavzular
      </Button>

      <Stack direction="row" spacing={1} sx={{ mb: 2 }} flexWrap="wrap" useFlexGap>
        <Chip
          icon={<LocalFireDepartmentIcon />}
          label={`Importance: ${topic.importance}`}
          color={topic.importance >= 9 ? 'error' : topic.importance >= 7 ? 'warning' : 'default'}
        />
        <Chip
          label={DIFFICULTY_LABELS[topic.difficulty] || topic.difficulty}
          color={DIFFICULTY_COLORS[topic.difficulty] || 'default'}
          variant="outlined"
        />
        {topic.level?.name && <Chip label={topic.level.name} variant="outlined" />}
        <Chip icon={<AccessTimeIcon />} label={`~${topic.estimatedMinutes} daq`} variant="outlined" />
      </Stack>

      <Typography variant="h3" sx={{ mb: 2 }}>{topic.title}</Typography>

      {topic.description && (
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 800 }}>
          {topic.description}
        </Typography>
      )}

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 48, height: 48, borderRadius: 2,
                  bgcolor: 'primary.light', color: 'common.white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <QuizIcon />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary">Savollar</Typography>
                <Typography variant="h6">{questionsCount} ta</Typography>
              </Box>
              <Button
                component={Link}
                href={routes.quiz(topic.slug)}
                variant="contained"
                disabled={questionsCount === 0}
              >
                Boshlash
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 48, height: 48, borderRadius: 2,
                  bgcolor: 'secondary.main', color: 'common.white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <CodeIcon />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary">Amaliy topshiriq</Typography>
                <Typography variant="h6">{tasksCount} ta</Typography>
              </Box>
              <Button variant="outlined" disabled={tasksCount === 0}>
                {tasksCount > 0 ? "Ko'rish" : 'Tez orada'}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: { xs: 3, md: 5 } }}>
        {hasContent ? (
          <Markdown>{topic.theory}</Markdown>
        ) : (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              Bu mavzu uchun nazariya hali tayyorlanmoqda
            </Typography>
            <Typography variant="body2" color="text.disabled">
              AI yordamida tez orada qo'shiladi. Hozir savollarni sinab ko'ring.
            </Typography>
            {questionsCount > 0 && (
              <Button
                component={Link}
                href={routes.quiz(topic.slug)}
                variant="contained"
                sx={{ mt: 3 }}
              >
                Quiz boshlash
              </Button>
            )}
          </Box>
        )}
      </Paper>
    </>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const props = await prefetchQueries([
      (qc) => qc.prefetchQuery({
        queryKey: qk.topics.detail(params.slug),
        queryFn: () => fetchTopicBySlug(params.slug),
      }),
    ]);
    return { props: { ...props, slug: params.slug } };
  } catch (error) {
    return { props: { dehydratedState: null, slug: params.slug } };
  }
}
