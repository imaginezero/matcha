export function concatClassnames(...classNames) {
  return classNames.filter((cn) => cn).join(' ');
}
