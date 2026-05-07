import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import {
  PRODUCT_NAME, routes, DIFFICULTY_LABELS, DIFFICULTY_COLORS,
} from '@config';
import { fetchTopicBySlug } from '@services/topics';
import { useTopicBySlug } from '@hooks/use-topics';
import { useCreateAttempt } from '@hooks/use-attempts';
import { prefetchQueries } from '@lib/ssr-helpers';
import { qk } from '@lib/query-keys';
import Markdown from '@components/Markdown';

const normalize = (str) => String(str || '').trim().toLowerCase();

const evaluateAnswer = (question, userAnswer) => {
  if (!userAnswer) return { isCorrect: false, score: 0 };
  if (question.type === 'multiple_choice' || question.type === 'true_false') {
    const ok = normalize(userAnswer) === normalize(question.correctAnswer);
    return { isCorrect: ok, score: ok ? 100 : 0 };
  }
  if (question.type === 'short_answer' || question.type === 'code_output') {
    const ok = normalize(userAnswer) === normalize(question.correctAnswer);
    return { isCorrect: ok, score: ok ? 100 : 0 };
  }
  return { isCorrect: false, score: 0 };
};

export default function QuizPage({ slug }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { data: topic, isLoading, error } = useTopicBySlug(slug);
  const createAttemptMutation = useCreateAttempt();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [results, setResults] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const [startedAt] = useState(Date.now());
  const [questionStartedAt, setQuestionStartedAt] = useState(Date.now());

  if (isLoading) {
    return <Skeleton variant="rounded" height={500} />;
  }

  if (error || !topic) {
    return <Alert severity="error">{error?.message || 'Mavzu topilmadi'}</Alert>;
  }

  const questions = topic.questions || [];
  const total = questions.length;

  if (total === 0) {
    return (
      <Box>
        <Button component={Link} href={routes.topic(topic.slug)} startIcon={<ArrowBackIcon />} sx={{ mb: 3 }}>
          Mavzuga qaytish
        </Button>
        <Alert severity="info">Bu mavzu uchun savollar hali qo'shilmagan.</Alert>
      </Box>
    );
  }

  const isFinished = currentIdx >= total;
  const current = questions[currentIdx];

  const handleSubmit = async () => {
    if (!userAnswer || revealed) return;

    const evaluation = evaluateAnswer(current, userAnswer);
    const timeSpent = Math.round((Date.now() - questionStartedAt) / 1000);

    setResults((prev) => [...prev, {
      questionId: current.id,
      questionText: current.questionText,
      userAnswer,
      correctAnswer: current.correctAnswer,
      explanation: current.explanation,
      ...evaluation,
      timeSpent,
    }]);

    setRevealed(true);

    createAttemptMutation.mutate(
      {
        topic: topic.id,
        question: current.id,
        kind: 'question',
        userAnswer,
        score: evaluation.score,
        isCorrect: evaluation.isCorrect,
        timeSpentSeconds: timeSpent,
        attemptedAt: new Date().toISOString(),
      },
      {
        onError: (err) => enqueueSnackbar(`Attempt saqlanmadi: ${err.message}`, { variant: 'warning' }),
      },
    );
  };

  const handleNext = () => {
    setCurrentIdx((prev) => prev + 1);
    setUserAnswer('');
    setRevealed(false);
    setQuestionStartedAt(Date.now());
  };

  if (isFinished) {
    const correct = results.filter((r) => r.isCorrect).length;
    const avgScore = results.reduce((sum, r) => sum + r.score, 0) / total;
    const totalTime = Math.round((Date.now() - startedAt) / 1000);

    return (
      <>
        <Head><title>Natija — {topic.title}</title></Head>

        <Paper sx={{ p: 5, textAlign: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{ mb: 1 }}>Quiz yakunlandi!</Typography>
          <Typography variant="h2" sx={{ color: 'primary.main', mb: 2 }}>
            {Math.round(avgScore)}%
          </Typography>
          <Stack direction="row" spacing={3} justifyContent="center">
            <Box>
              <Typography variant="h6">{correct} / {total}</Typography>
              <Typography variant="caption" color="text.secondary">To'g'ri</Typography>
            </Box>
            <Box>
              <Typography variant="h6">{Math.floor(totalTime / 60)}:{String(totalTime % 60).padStart(2, '0')}</Typography>
              <Typography variant="caption" color="text.secondary">Vaqt</Typography>
            </Box>
          </Stack>
        </Paper>

        <Typography variant="h6" sx={{ mb: 2 }}>Javoblar tahlili</Typography>
        {results.map((r, idx) => (
          <Paper key={idx} sx={{ p: 3, mb: 2, borderLeft: 4, borderColor: r.isCorrect ? 'success.main' : 'error.main' }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              {r.isCorrect ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
              <Typography variant="subtitle2" color="text.secondary">Savol {idx + 1}</Typography>
            </Stack>
            <Typography sx={{ mb: 1 }}>{r.questionText}</Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Sizning javob:</strong> {r.userAnswer}
            </Typography>
            <Typography variant="body2" color="success.main">
              <strong>To'g'ri javob:</strong> {r.correctAnswer}
            </Typography>
            {r.explanation && (
              <Box sx={{ mt: 1.5, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                <Markdown>{r.explanation}</Markdown>
              </Box>
            )}
          </Paper>
        ))}

        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button variant="contained" onClick={() => router.reload()}>Qayta urinish</Button>
          <Button variant="outlined" component={Link} href={routes.topic(topic.slug)}>
            Mavzuga qaytish
          </Button>
        </Stack>
      </>
    );
  }

  const progress = (currentIdx / total) * 100;

  return (
    <>
      <Head><title>Quiz — {topic.title}</title></Head>

      <Box sx={{ mb: 3 }}>
        <Button component={Link} href={routes.topic(topic.slug)} startIcon={<ArrowBackIcon />}>
          Chiqish
        </Button>
      </Box>

      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
        <Typography variant="h6">{topic.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          Savol {currentIdx + 1} / {total}
        </Typography>
      </Stack>
      <LinearProgress variant="determinate" value={progress} sx={{ mb: 4, height: 8, borderRadius: 4 }} />

      <Paper sx={{ p: { xs: 3, md: 5 } }}>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip
            size="small"
            label={DIFFICULTY_LABELS[current.difficulty]}
            color={DIFFICULTY_COLORS[current.difficulty]}
            variant="outlined"
          />
          <Chip size="small" label={current.type} variant="outlined" />
        </Stack>

        <Typography variant="h6" sx={{ mb: 2 }}>{current.questionText}</Typography>

        {current.codeSnippet && (
          <Box sx={{ mb: 3 }}>
            <Markdown>{`\`\`\`javascript\n${current.codeSnippet}\n\`\`\``}</Markdown>
          </Box>
        )}

        {current.type === 'multiple_choice' && Array.isArray(current.options) && (
          <RadioGroup value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)}>
            {current.options.map((option, idx) => (
              <FormControlLabel
                key={idx}
                value={option}
                control={<Radio disabled={revealed} />}
                label={option}
                sx={{
                  mb: 1, p: 1.5, borderRadius: 2,
                  border: 1, borderColor: 'divider',
                  bgcolor: revealed && option === current.correctAnswer
                    ? 'success.light'
                    : revealed && option === userAnswer && option !== current.correctAnswer
                      ? 'error.light' : 'transparent',
                }}
              />
            ))}
          </RadioGroup>
        )}

        {current.type === 'true_false' && (
          <RadioGroup row value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)}>
            <FormControlLabel value="true" control={<Radio disabled={revealed} />} label="To'g'ri" />
            <FormControlLabel value="false" control={<Radio disabled={revealed} />} label="Noto'g'ri" />
          </RadioGroup>
        )}

        {(current.type === 'short_answer' || current.type === 'code_output' || current.type === 'open_ended') && (
          <TextField
            fullWidth
            multiline
            minRows={3}
            placeholder="Javobingizni shu yerga yozing"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            disabled={revealed}
          />
        )}

        {revealed && (
          <Alert
            severity={results[results.length - 1]?.isCorrect ? 'success' : 'error'}
            sx={{ mt: 3 }}
          >
            {results[results.length - 1]?.isCorrect ? "To'g'ri!" : `Noto'g'ri. To'g'ri javob: ${current.correctAnswer}`}
            {current.explanation && (
              <Box sx={{ mt: 1.5 }}>
                <Markdown>{current.explanation}</Markdown>
              </Box>
            )}
          </Alert>
        )}

        <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 4 }}>
          {!revealed ? (
            <Button variant="contained" size="large" disabled={!userAnswer} onClick={handleSubmit}>
              Tekshirish
            </Button>
          ) : (
            <Button variant="contained" size="large" onClick={handleNext}>
              {currentIdx + 1 === total ? 'Yakunlash' : 'Keyingi'}
            </Button>
          )}
        </Stack>
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
