import { quotes } from "../data/quotes";

function getTodayKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
}

function hashString(input: string): number {
  let hash = 0;

  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }

  return Math.abs(hash);
}

export function getDailyQuote(): string {
  const todayKey = getTodayKey();
  const hash = hashString(todayKey);

  const index = hash % quotes.length;

  return quotes[index];
}
