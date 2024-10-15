import { format } from 'date-fns';

export const capitalizeFirstLetter = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const formatFilenameFromDate = (
  updatedAt: string | null | undefined,
) => {
  // Check if updatedAt is a valid string
  if (!updatedAt) return 'Invalid date';

  const date = new Date(updatedAt);

  // Check if the date is valid (i.e., not NaN)
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }

  return format(date, 'yyyy-MM-dd');
};
