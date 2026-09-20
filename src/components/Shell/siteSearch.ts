import type { DashboardSearchItem } from '../../data/dashboardSearchContent';

const normalizeSearchText = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

/**
 * Ranks site search items for a query. Shared by the home hero search box and
 * the header search panel so both always return the same results. An empty
 * query returns the highest-priority items as starting points.
 */
export const searchSiteItems = (index: DashboardSearchItem[], rawQuery: string, limit = 6) => {
  const query = normalizeSearchText(rawQuery);
  const terms = query.split(' ').filter(Boolean);

  return index
    .map((item) => {
      if (!query) {
        return { item, score: item.priority };
      }

      const title = normalizeSearchText(item.title);
      const haystack = normalizeSearchText(`${item.title} ${item.category} ${item.snippet} ${item.keywords}`);

      if (!terms.every((term) => haystack.includes(term))) {
        return null;
      }

      let score = item.priority;

      if (title.startsWith(query)) score += 7;
      if (title.includes(query)) score += 4;
      if (normalizeSearchText(item.path).includes(query)) score += 2;

      return { item, score };
    })
    .filter((result): result is { item: DashboardSearchItem; score: number } => result !== null)
    .sort((first, second) => second.score - first.score || first.item.title.localeCompare(second.item.title))
    .slice(0, limit)
    .map((result) => result.item);
};
