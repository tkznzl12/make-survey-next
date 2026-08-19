export function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(isoDate));
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("ko-KR").format(value);
}
