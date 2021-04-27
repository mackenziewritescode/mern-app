import { parseISO, formatDistance, format } from "date-fns";

export const formatDate = (timestamp) => {
  timestamp = parseISO(timestamp);
  let timeAgo = formatDistance(timestamp, new Date(), { addSuffix: true });

  // if the post is less than an hour old, use a different string
  let regex = /minute|(about 1 hour)/gm;
  if (regex.test(timeAgo)) {
    timeAgo = "less than an hour ago";
  }

  const date = format(timestamp, "MM/dd/yyyy");
  return `${timeAgo} on ${date}`;
};
