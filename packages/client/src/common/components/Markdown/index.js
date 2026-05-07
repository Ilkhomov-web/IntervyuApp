import Box from '@mui/material/Box';

// Oddiy markdown renderer (sof React, lib'siz).
// Senior darajaga yetganda react-markdown + remark-gfm + react-syntax-highlighter
// bilan almashtirish mumkin. Hozir minimal ishchi versiya.
//
// Qo'llab-quvvatlanadi: # h1-h3, **bold**, *italic*, `inline code`, ``` kod bloklari ```,
// ro'yxat (-), parchalar.

const escapeHtml = (str) => str
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

const renderInline = (text) => {
  let html = escapeHtml(text);
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return html;
};

const renderToBlocks = (raw) => {
  const lines = raw.split('\n');
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Kod bloki ```...```
    if (line.trim().startsWith('```')) {
      const lang = line.trim().slice(3).trim();
      const codeLines = [];
      i += 1;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i += 1;
      }
      blocks.push({ type: 'code', lang, content: codeLines.join('\n') });
      i += 1;
      continue;
    }

    // Sarlavhalar
    if (line.startsWith('### ')) {
      blocks.push({ type: 'h3', content: line.slice(4) });
      i += 1;
      continue;
    }
    if (line.startsWith('## ')) {
      blocks.push({ type: 'h2', content: line.slice(3) });
      i += 1;
      continue;
    }
    if (line.startsWith('# ')) {
      blocks.push({ type: 'h1', content: line.slice(2) });
      i += 1;
      continue;
    }

    // Ro'yxat
    if (/^[-*]\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*]\s/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s/, ''));
        i += 1;
      }
      blocks.push({ type: 'ul', items });
      continue;
    }

    // Bo'sh qator
    if (line.trim() === '') {
      i += 1;
      continue;
    }

    // Oddiy paragraf (keyingi bo'sh qatorgacha)
    const para = [line];
    i += 1;
    while (
      i < lines.length
      && lines[i].trim() !== ''
      && !lines[i].startsWith('#')
      && !lines[i].trim().startsWith('```')
      && !/^[-*]\s/.test(lines[i])
    ) {
      para.push(lines[i]);
      i += 1;
    }
    blocks.push({ type: 'p', content: para.join(' ') });
  }

  return blocks;
};

export default function Markdown({ children }) {
  if (!children) return null;
  const blocks = renderToBlocks(children);

  return (
    <Box
      sx={{
        '& h1, & h2, & h3': { color: 'text.primary', mt: 3, mb: 1.5, fontWeight: 700 },
        '& h1': { fontSize: '2rem' },
        '& h2': { fontSize: '1.5rem', borderBottom: 1, borderColor: 'divider', pb: 1 },
        '& h3': { fontSize: '1.2rem' },
        '& p': { mb: 2, lineHeight: 1.7, color: 'text.primary' },
        '& code': {
          bgcolor: 'rgba(67, 24, 255, 0.08)',
          color: 'primary.dark',
          px: 0.7,
          py: 0.2,
          borderRadius: 1,
          fontFamily: 'Menlo, Monaco, "Courier New", monospace',
          fontSize: '0.92em',
        },
        '& pre': {
          bgcolor: '#1A1F36',
          color: '#E1E4F0',
          p: 2.5,
          borderRadius: 2,
          overflow: 'auto',
          mb: 2,
          fontSize: '0.9rem',
          fontFamily: 'Menlo, Monaco, "Courier New", monospace',
          lineHeight: 1.6,
        },
        '& pre code': {
          bgcolor: 'transparent',
          color: 'inherit',
          p: 0,
          fontSize: 'inherit',
        },
        '& ul': { mb: 2, pl: 3 },
        '& li': { mb: 0.5, lineHeight: 1.7 },
        '& strong': { fontWeight: 700 },
      }}
    >
      {blocks.map((block, idx) => {
        if (block.type === 'code') {
          return (
            <pre key={idx}>
              <code
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: escapeHtml(block.content) }}
              />
            </pre>
          );
        }
        if (block.type === 'ul') {
          return (
            <ul key={idx}>
              {block.items.map((item, j) => (
                // eslint-disable-next-line react/no-danger
                <li key={j} dangerouslySetInnerHTML={{ __html: renderInline(item) }} />
              ))}
            </ul>
          );
        }
        if (block.type === 'h1') {
          // eslint-disable-next-line react/no-danger
          return <h1 key={idx} dangerouslySetInnerHTML={{ __html: renderInline(block.content) }} />;
        }
        if (block.type === 'h2') {
          // eslint-disable-next-line react/no-danger
          return <h2 key={idx} dangerouslySetInnerHTML={{ __html: renderInline(block.content) }} />;
        }
        if (block.type === 'h3') {
          // eslint-disable-next-line react/no-danger
          return <h3 key={idx} dangerouslySetInnerHTML={{ __html: renderInline(block.content) }} />;
        }
        // eslint-disable-next-line react/no-danger
        return <p key={idx} dangerouslySetInnerHTML={{ __html: renderInline(block.content) }} />;
      })}
    </Box>
  );
}
