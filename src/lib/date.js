function toDate(value) {
  return value instanceof Date ? value : new Date(value);
}

export function formatDateTime(value) {
  const date = toDate(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hour}:${minute}`;
}

export function formatShortDate(value) {
  const date = toDate(value);
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

export function formatCurrency(value) {
  return `¥${Number(value || 0).toLocaleString("zh-CN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

export function getWeekStart(value) {
  const date = new Date(toDate(value));
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  date.setDate(diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function getWeekNumber(value) {
  const baseDate = new Date(2026, 1, 23);
  const baseWeekStart = getWeekStart(baseDate);
  const targetWeekStart = getWeekStart(value);
  const diffTime = targetWeekStart.getTime() - baseWeekStart.getTime();
  const diffWeeks = Math.floor(diffTime / (7 * 24 * 60 * 60 * 1000));

  return diffWeeks + 1;
}

export function groupCompletedByWeek(completedItems) {
  const grouped = new Map();

  for (const item of completedItems) {
    const weekStart = getWeekStart(item.completedAt);
    const weekKey = weekStart.toISOString().split("T")[0];
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    if (!grouped.has(weekKey)) {
      grouped.set(weekKey, {
        key: weekKey,
        label: `${formatShortDate(weekStart)} - ${formatShortDate(weekEnd)}`,
        badge: `第${getWeekNumber(weekStart)}周`,
        items: [],
      });
    }

    grouped.get(weekKey).items.push(item);
  }

  return [...grouped.values()]
    .sort((left, right) => right.key.localeCompare(left.key))
    .map((group) => ({
      ...group,
      items: [...group.items].sort((left, right) => right.completedAt - left.completedAt),
    }));
}
