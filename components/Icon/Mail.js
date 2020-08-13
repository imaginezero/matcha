// taken from https://simpleicons.org/, optimized using https://vecta.io/nano

export default function Mail({ title = 'Mail', ...props }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>{title}</title>
      <path d="m24 4.5v15a1.47 1.47 0 0 1 -1.5 1.5h-1.5v-13.613l-9 6.463-9-6.463v13.613h-1.5a1.47 1.47 0 0 1 -1.5-1.5v-15a1.49 1.49 0 0 1 .431-1.068c.269-.272.645-.432 1.069-.432h.5l10 7.25 10-7.25h.5c.425 0 .8.162 1.07.432s.43.643.43 1.068z" />
    </svg>
  );
}
