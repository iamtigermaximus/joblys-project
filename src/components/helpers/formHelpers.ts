import { format } from 'date-fns';

export const capitalizeFirstLetter = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const formatFilenameFromDate = (updatedAt: string) => {
  const date = new Date(updatedAt);
  return format(date, 'yyyy-MM-dd');
};
