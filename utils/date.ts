export function isoDateToDMY(isoDate: string) {
  // Create a new date object from the ISO date string
  const date = new Date(isoDate);

  // Use the toLocaleString() method to format the date in the dd/mm/yyyy format
  return date.toLocaleString('default', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
