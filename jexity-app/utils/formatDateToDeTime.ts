import { format } from 'date-fns';
import { de } from 'date-fns/locale';

const formatDateToDeTime = (date: Date, pattern = 'H.mm'): string => {
  return format(date, pattern, { locale: de });
};

export default formatDateToDeTime;
