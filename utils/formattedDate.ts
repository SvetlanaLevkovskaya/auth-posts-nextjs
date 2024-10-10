export const formattedDate = (dateString: string | null | undefined): string => {
  if (!dateString) return 'Дата недоступна';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Дата недоступна!!!';

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  return new Intl.DateTimeFormat('ru-RU', options).format(date);
};
