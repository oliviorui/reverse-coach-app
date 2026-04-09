export function getYearProgress() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const startOfNextYear = new Date(now.getFullYear() + 1, 0, 1);

  const elapsed = now.getTime() - startOfYear.getTime();
  const total = startOfNextYear.getTime() - startOfYear.getTime();

  const progress = elapsed / total;
  const percentage = Math.floor(progress * 100);

  return {
    progress,
    percentage,
    year: now.getFullYear(),
  };
}
