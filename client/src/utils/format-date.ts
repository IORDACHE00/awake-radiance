export function formatDate(timestamp: string): string {
  const date = new Date(timestamp);
  const today = new Date();

  if (date.toDateString() === today.toDateString()) {
    return `Today, ${formatTime(date)}`;
  }

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday, ${formatTime(date)}`;
  }

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayOfWeek = days[date.getDay()];
  return `${dayOfWeek}, ${formatTime(date)}`;
}

function formatTime(date: Date): string {
  let hours = date.getHours();
  const minutes = padWithZero(date.getMinutes());
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${padWithZero(hours)}:${minutes} ${ampm}`;
}

function padWithZero(num: number): string {
  return num.toString().padStart(2, "0");
}
