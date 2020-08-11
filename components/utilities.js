export function concatClassnames(...classNames) {
  return classNames.filter((cn) => cn).join(' ');
}

export function getAbsoluteUrl(path) {
  return new URL(path, process.env.BASE_URL).toString();
}
