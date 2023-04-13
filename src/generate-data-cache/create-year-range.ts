export function createYearRange(startYear: number, endYear: number = new Date().getFullYear()): number[] {
  return Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
}
