import { parseISO, formatDistance, format } from "date-fns";

export const formatDate = (timestamp) => {
  timestamp = parseISO(timestamp);
  const timeAgo = formatDistance(timestamp, new Date(), { addSuffix: true });
  const date = format(timestamp, "MM/dd/yyyy");
  return `${timeAgo} on ${date}`;
};
