import { format, parseISO } from 'date-fns';

type DateProps = {
  dateString: string;
};

export function Date({ dateString }: DateProps): JSX.Element {
  const date = parseISO(dateString);
  const formattedDate = format(date, 'eeee, dd MMMM yyyy');

  return (
    <time className='text-secondary text-lg' dateTime={dateString}>
      {formattedDate}
    </time>
  );
}
