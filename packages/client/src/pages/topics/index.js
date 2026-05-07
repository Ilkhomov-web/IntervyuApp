import { useMemo, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import {
  PRODUCT_NAME, routes, DIFFICULTY_LABELS, DIFFICULTY_COLORS,
} from '@config';
import { fetchTopics } from '@services/topics';
import { selectActivePlan } from '@slices/study-plan';
import { useTopics } from '@hooks/use-topics';
import { prefetchQueries } from '@lib/ssr-helpers';
import { qk } from '@lib/query-keys';

const LEVELS = [
  { slug: 'junior', label: 'Junior' },
  { slug: 'middle', label: 'Middle' },
  { slug: 'senior', label: 'Senior' },
];

export default function TopicsPage() {
  const activePlan = useSelector(selectActivePlan);
  const [levelFilter, setLevelFilter] = useState('all');
  const [search, setSearch] = useState('');

  const { data: allTopics = [], isLoading, error } = useTopics({});

  const filtered = useMemo(() => {
    let list = allTopics;

    if (activePlan?.minImportance) {
      list = list.filter((t) => t.importance >= activePlan.minImportance);
    }
    if (activePlan?.includedLevels?.length) {
      list = list.filter((t) => activePlan.includedLevels.includes(t.level?.slug));
    }
    if (levelFilter !== 'all') {
      list = list.filter((t) => t.level?.slug === levelFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) => t.title?.toLowerCase().includes(q)
          || t.tags?.some?.((tag) => tag.toLowerCase().includes(q)),
      );
    }

    return list;
  }, [allTopics, activePlan, levelFilter, search]);

  const grouped = useMemo(() => {
    const map = new Map();
    filtered.forEach((topic) => {
      const key = topic.category || 'Boshqa';
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(topic);
    });
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <>
      <Head>
        <title>Mavzular — {PRODUCT_NAME}</title>
      </Head>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>Mavzular</Typography>
        <Typography variant="body2" color="text.secondary">
          {filtered.length} ta mavzu
          {activePlan && ` • Aktiv reja: "${activePlan.name}" (importance ≥ ${activePlan.minImportance})`}
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Mavzularni yuklashda xato: {error.message}
        </Alert>
      )}

      {!activePlan && !isLoading && (
        <Alert severity="info" sx={{ mb: 3 }} action={(
          <Button component={Link} href={routes.home} size="small">
            Reja tanlash
          </Button>
        )}
        >
          Hali o'qish rejasi tanlanmagan. Reja tanlasangiz — mavzular vaqtga moslab filtrlanadi.
        </Alert>
      )}

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ mb: 4 }}
        alignItems={{ sm: 'center' }}
      >
        <ToggleButtonGroup
          value={levelFilter}
          exclusive
          onChange={(_, val) => val && setLevelFilter(val)}
          size="small"
        >
          <ToggleButton value="all">Hammasi</ToggleButton>
          {LEVELS.map((l) => (
            <ToggleButton key={l.slug} value={l.slug}>{l.label}</ToggleButton>
          ))}
        </ToggleButtonGroup>

        <TextField
          size="small"
          placeholder="Qidirish (mavzu nomi yoki teg)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 1, maxWidth: 400 }}
        />
      </Stack>

      {isLoading ? (
        <Grid container spacing={2}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Grid item xs={12} md={6} lg={4} key={i}>
              <Skeleton variant="rounded" height={160} />
            </Grid>
          ))}
        </Grid>
      ) : grouped.length === 0 ? (
        <Alert severity="warning">Hech qanday mavzu topilmadi.</Alert>
      ) : (
        grouped.map(([category, topics]) => (
          <Box key={category} sx={{ mb: 5 }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
              {category}{' '}
              <Typography component="span" variant="caption" color="text.disabled">
                ({topics.length})
              </Typography>
            </Typography>

            <Grid container spacing={2}>
              {topics.map((topic) => (
                <Grid item xs={12} md={6} lg={4} key={topic.id}>
                  <Card
                    component={Link}
                    href={routes.topic(topic.slug)}
                    sx={{
                      height: '100%',
                      textDecoration: 'none',
                      display: 'block',
                      transition: 'all 0.2s',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0px 8px 24px rgba(67, 24, 255, 0.1)',
                      },
                    }}
                  >
                    <CardContent>
                      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                        <Chip
                          size="small"
                          icon={<LocalFireDepartmentIcon />}
                          label={topic.importance}
                          color={topic.importance >= 9 ? 'error' : topic.importance >= 7 ? 'warning' : 'default'}
                        />
                        <Chip
                          size="small"
                          label={DIFFICULTY_LABELS[topic.difficulty] || topic.difficulty}
                          color={DIFFICULTY_COLORS[topic.difficulty] || 'default'}
                          variant="outlined"
                        />
                        {topic.level?.slug && (
                          <Chip size="small" label={topic.level.name} variant="outlined" />
                        )}
                      </Stack>

                      <Typography variant="h6" sx={{ mb: 1 }}>{topic.title}</Typography>

                      {topic.description && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mb: 2,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {topic.description}
                        </Typography>
                      )}

                      <Stack direction="row" spacing={2} sx={{ color: 'text.disabled' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <AccessTimeIcon fontSize="small" />
                          <Typography variant="caption">
                            ~{topic.estimatedMinutes} daq
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))
      )}
    </>
  );
}

export async function getServerSideProps() {
  try {
    const props = await prefetchQueries([
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
