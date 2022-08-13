import formatDistance from 'date-fns/formatDistance'
import ruLang from 'date-fns/locale/ru'

export const formatDate = (date: string): string => {
	return formatDistance(new Date(date), new Date(), { locale: ruLang })
}
