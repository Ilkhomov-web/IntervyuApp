import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import TimelineIcon from '@mui/icons-material/Timeline';
import SchoolIcon from '@mui/icons-material/School';
import StarsIcon from '@mui/icons-material/Stars';
import { PRODUCT_NAME, routes } from '@config';
import { fetchStudyPlans } from '@services/study-plans';
import { setActivePlan, selectActivePlan } from '@slices/study-plan';
import { useStudyPlans } from '@hooks/use-study-plans';
import { prefetchQueries } from '@lib/ssr-helpers';
import { qk } from '@lib/query-keys';

const PLAN_ICONS = {
  '10-kunlik-intensiv': <RocketLaunchIcon fontSize="large" />,
  '1-oylik-ortacha': <TimelineIcon fontSize="large" />,
  '2-oylik-toliq': <SchoolIcon fontSize="large" />,
  'senior-tayyorgarlik': <StarsIcon fontSize="large" />,
};

export default function HomePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const activePlan = useSelector(selectActivePlan);
  const { data: studyPlans = [], isLoading, error } = useStudyPlans();

  const handleSelectPlan = (plan) => {
    dispatch(setActivePlan({
      id: plan.id,
      slug: plan.slug,
      name: plan.name,
      durationDays: plan.durationDays,
      minImportance: plan.minImportance,
      includedLevels: plan.includedLevels,
    }));
    enqueueSnackbar(`"${plan.name}" rejasi tanlandi`, { variant: 'success' });
    router.push(routes.topics);
  };

  return (
    <>
      <Head>
        <title>{PRODUCT_NAME}</title>
      </Head>

      <Box sx={{ mb: 5 }}>
        <Typography variant="h3" sx={{ mb: 1 }}>
          Salom! Intervyuga tayyorgarlikni boshlaymiz
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700 }}>
          Avval o'qish rejasini tanlang. Vaqt qancha qisqa bo'lsa, faqat eng muhim mavzular kiritiladi.
          Har bir mavzu uchun nazariya, savollar va amaliy topshiriqlar mavjud.
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Strapi serverga ulana olmadi: {error.message}
        </Alert>
      )}

      <Grid container spacing={3}>
        {isLoading ? (
          [1, 2, 3, 4].map((i) => (
            <Grid item xs={12} sm={6} lg={3} key={i}>
              <Skeleton variant="rounded" height={260} />
            </Grid>
          ))
        ) : (
          studyPlans.map((plan) => {
            const isActive = activePlan?.id === plan.id;

            return (
              <Grid item xs={12} sm={6} lg={3} key={plan.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    border: isActive ? 2 : 0,
                    borderColor: 'primary.main',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0px 12px 32px rgba(67, 24, 255, 0.12)',
                    },
                  }}
                >
                  <CardContent sx={{ flex: 1 }}>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 3,
                        bgcolor: 'primary.light',
                        color: 'common.white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                      }}
                    >
                      {PLAN_ICONS[plan.slug] || <SchoolIcon fontSize="large" />}
                    </Box>

                    <Typography variant="h6" sx={{ mb: 1 }}>{plan.name}</Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 60 }}>
                      {plan.description}
                    </Typography>

                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      <Chip size="small" label={`${plan.durationDays} kun`} color="primary" variant="outlined" />
                      <Chip size="small" label={`Importance ≥ ${plan.minImportance}`} variant="outlined" />
                    </Stack>
                  </CardContent>

                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      fullWidth
                      variant={isActive ? 'outlined' : 'contained'}
                      onClick={() => handleSelectPlan(plan)}
                    >
                      {isActive ? 'Davom etish' : 'Tanlash'}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })
        )}
      </Grid>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const props = await prefetchQueries([
      (qc) => qc.prefetchQuery({
        queryKey: qk.studyPlans.list(),
        queryFn: fetchStudyPlans,
      }),
    ]);
    return { props };
  } catch (error) {
    return { props: { dehydratedState: null } };
  }
}
