// taken from https://simpleicons.org/, optimized using https://vecta.io/nano

export default function Facebook({ title = 'Facebook', ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <title>{title}</title>
      <path d="M23.998 12A12 12 0 0 0 11.999 0 12 12 0 0 0 0 11.999c0 5.99 4.388 10.953 10.124 11.853v-8.385H7.078V12h3.047V9.356c0-3.007 1.79-4.668 4.532-4.668 1.313 0 2.686.234 2.686.234v2.953H15.83c-1.49 0-1.955.925-1.955 1.874V12h3.328l-.532 3.468h-2.796v8.385c5.736-.9 10.124-5.864 10.124-11.853z" />
    </svg>
  );
}
