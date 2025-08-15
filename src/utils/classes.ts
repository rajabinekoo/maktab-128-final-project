export const classes = (...classnames: Array<string | undefined | null>) => {
  return classnames
    .map((el) => el?.trim?.())
    .filter(Boolean)
    .join(" ");
};
