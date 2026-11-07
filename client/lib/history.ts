import type { HistoryDayGroup } from "@/types/history.types";
import type { Visit, VisitSource } from "@/types/visits.types";

export const visitSourceLabels: Record<VisitSource, string> = {
  "address-bar": "Direct visit",
  link: "From link",
  search: "From search",
  back: "Back navigation",
  forward: "Forward navigation",
  history: "From history",
};

/*
 * Group ordered visits by the viewer's local date without changing visit order.
 */
export function groupVisitsByDay(visits: Visit[]): HistoryDayGroup[] {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const groups = new Map<string, Visit[]>();
  for (const visit of visits) {
    const date = new Date(visit.visitedAt);
    let label = date.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    if (date.toDateString() === today.toDateString()) label = "Today";
    else if (date.toDateString() === yesterday.toDateString())
      label = "Yesterday";
    const group = groups.get(label);
    if (group) group.push(visit);
    else groups.set(label, [visit]);
  }
  return Array.from(groups, ([label, entries]) => ({ label, visits: entries }));
}
