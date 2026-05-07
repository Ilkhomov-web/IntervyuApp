import { useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { PRODUCT_NAME, routes } from '@config';
import { fetchAllAttempts } from '@services/attempts';
import { fetchTopics } from '@services/topics';
import { useAllAttempts } from '@hooks/use-attempts';
import { useTopics } from '@hooks/use-topics';
import { prefetchQueries } from '@lib/ssr-helpers';
import { qk } from '@lib/query-keys';

const calculateStreak = (attempts) => {
  if (!attempts.length) return 0;
  const days = new Set(
    attempts.map((a) => new Date(a.attemptedAt).toDateString()),
  );

  const today = new Date();
  let streak = 0;
  for (let i = 0; i < 365; i += 1) {
    const checkDate = new Date(today);
    checkDate.setDate(today.getDate() - i);
    if (days.has(checkDate.toDateString())) {
      streak += 1;
    } else if (i > 0) {
      break;
    }
  }
  return streak;
};

const formatTime = (sec) => {
  if (sec < 60) return `${sec}s`;
  if (sec < 3600) return `${Math.floor(sec / 60)}m`;
  return `${Math.floor(sec / 3600)}h ${Math.floor((sec % 3600) / 60)}m`;
};

export default function DashboardPage() {
  const { data: attempts = [], isLoading: attemptsLoading } = useAllAttempts();
  const { data: topics = [], isLoading: topicsLoading } = useTopics({});

  const isLoading = attemptsLoading || topicsLoading;
  const totalTopics = topics.length;

  const stats = useMemo(() => {
    if (!attempts?.length) {
      return {
        total: 0, correct: 0, avgScore: 0, totalTime: 0,
        attemptedTopics: 0, weakTopics: [], strongTopics: [], streak: 0,
      };
    }

    const total = attempts.length;
    const correct = attempts.filter((a) => a.isCorrect).length;
    const avgScore = attempts.reduce((s, a) => s + (a.score || 0), 0) / total;
    const totalTime = attempts.reduce((s, a) => s + (a.timeSpentSeconds || 0), 0);

    const byTopic = {};
    attempts.forEach((a) => {
      const topicId = a.topic?.id;
      const topicTitle = a.topic?.title || 'Noma\'lum';
      const topicSlug = a.topic?.slug;
      if (!topicId) return;
      if (!byTopic[topicId]) {
        byTopic[topicId] = {
          id: topicId, title: topicTitle, slug: topicSlug,
          attempts: 0, scoreSum: 0,
        };
      }
      byTopic[topicId].attempts += 1;
      byTopic[topicId].scoreSum += a.score || 0;
    });

    const topicStats = Object.values(byTopic).map((t) => ({
      ...t,
      avgScore: t.scoreSum / t.attempts,
    }));

    const weakTopics = topicStats
      .filter((t) => t.avgScore < 70 && t.attempts >= 1)
      .sort((a, b) => a.avgScore - b.avgScore)
      .slice(0, 5);

    const strongTopics = topicStats
      .filter((t) => t.avgScore >= 80)
      .sort((a, b) => b.avgScore - a.avgScore)
      .slice(0, 5);

    return {
      total,
      correct,
      avgScore: Math.round(avgScore),
      totalTime,
      attemptedTopics: topicStats.length,
      weakTopics,
      strongTopics,
      streak: calculateStreak(attempts),
    };
  }, [attempts]);

  const completionPercent = totalTopics > 0
    ? Math.round((stats.attemptedTopics / totalTopics) * 100) : 0;

  if (isLoading) {
    return (
      <Box>
        <Skeleton width="40%" height={50} sx={{ mb: 3 }} />
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[1, 2, 3, 4].map((i) => (
            <Grid item xs={6} md={3} key={i}>
              <Skeleton variant="rounded" height={120} />
            </Grid>
          ))}
        </Grid>
        <Skeleton variant="rounded" height={300} />
      </Box>
    );
  }

  return (
    <>
      <Head><title>Statistika — {PRODUCT_NAME}</title></Head>

      <Typography variant="h4" sx={{ mb: 3 }}>Sizning statistikangiz</Typography>

      {stats.total === 0 ? (
        <Paper sx={{ p: 6, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            Hali statistika yo'q
          </Typography>
          <Typography variant="body2" color="text.disabled" sx={{ mb: 3 }}>
            Birinchi mavzuni boshlasangiz, bu yerda progress va tahlil ko'rinadi.
          </Typography>
          <Button component={Link} href={routes.topics} variant="contained">
            Mavzularni ko'rish
          </Button>
        </Paper>
      ) : (
        <>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={6} md={3}>
              <Card>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <EmojiEventsIcon color="primary" />
                    <Typography variant="caption" color="text.secondary">O'rtacha ball</Typography>
                  </Stack>
                  <Typography variant="h4">{stats.avgScore}%</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} md={3}>
              <Card>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <LocalFireDepartmentIcon color="error" />
                    <Typography variant="caption" color="text.secondary">Streak</Typography>
                  </Stack>
                  <Typography variant="h4">{stats.streak} kun</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} md={3}>
              <Card>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <TrendingUpIcon color="success" />
                    <Typography variant="caption" color="text.secondary">Urinishlar</Typography>
                  </Stack>
                  <Typography variant="h4">{stats.total}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {stats.correct} to'g'ri
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} md={3}>
              <Card>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <AccessTimeIcon color="info" />
                    <Typography variant="caption" color="text.secondary">Jami vaqt</Typography>
                  </Stack>
                  <Typography variant="h4">{formatTime(stats.totalTime)}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="h6">Umumiy progress</Typography>
                <Typography variant="h6" color="primary">{completionPercent}%</Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {stats.attemptedTopics} / {totalTopics} ta mavzu boshlandi
              </Typography>
              <LinearProgress variant="determinate" value={completionPercent} sx={{ height: 10, borderRadius: 5 }} />
            </CardContent>
          </Card>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                  <TrendingDownIcon color="error" />
                  <Typography variant="h6">Zaif mavzular</Typography>
                </Stack>
                {stats.weakTopics.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    Hozircha zaif mavzular yo'q. Davom eting!
                  </Typography>
                ) : (
                  <Stack spacing={1.5}>
                    {stats.weakTopics.map((t) => (
                      <Box
                        key={t.id}
                        component={Link}
                        href={routes.topic(t.slug)}
                        sx={{
                          textDecoration: 'none', color: 'inherit',
                          p: 1.5, borderRadius: 2, bgcolor: 'background.default',
                          '&:hover': { bgcolor: 'action.hover' },
                        }}
                      >
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {t.title}
                          </Typography>
                          <Chip size="small" label={`${Math.round(t.avgScore)}%`} color="error" />
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={t.avgScore}
                          color="error"
                          sx={{ mt: 1, height: 4, borderRadius: 2 }}
                        />
                      </Box>
                    ))}
                  </Stack>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                  <TrendingUpIcon color="success" />
                  <Typography variant="h6">Kuchli mavzular</Typography>
                </Stack>
                {stats.strongTopics.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    Davom eting — kuchli mavzular paydo bo'ladi.
                  </Typography>
                ) : (
                  <Stack spacing={1.5}>
                    {stats.strongTopics.map((t) => (
                      <Box
                        key={t.id}
                        component={Link}
                        href={routes.topic(t.slug)}
                        sx={{
                          textDecoration: 'none', color: 'inherit',
                          p: 1.5, borderRadius: 2, bgcolor: 'background.default',
                          '&:hover': { bgcolor: 'action.hover' },
                        }}
                      >
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {t.title}
                          </Typography>
                          <Chip size="small" label={`${Math.round(t.avgScore)}%`} color="success" />
                        </Stack>
                      </Box>
                    ))}
                  </Stack>
                )}
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}

export async function getServerSideProps() {
  try {
    const props = await prefetchQueries([
      (qc) => qc.prefetchQuery({
        queryKey: qk.attempts.list(),
        queryFn: fetchAllAttempts,
      }),
      (qc) => qc.prefetchQuery({
        queryKey: qk.topics.list({}),
        queryFn: () => fetchTopics({}),
      }),
    ]);
    return { props };
  } catch (error) {
    return { props: { dehydratedState: null } };
  }
}
