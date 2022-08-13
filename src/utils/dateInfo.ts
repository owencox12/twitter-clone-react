export const year = 1930;
export const month = 12;
export const date = 30;

export const yearRes: number[] = [];

export const monthRes: number[] = []

export const dateRes: number[] = []

export const monthRus = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октрябрь', 'Ноябрь', 'Декабрь']

for (let i = 2022; i >= year; i--) {
  yearRes.push(i)
}

for (let i = 1; i <= month; i++) {
  monthRes.push(i)
}

for (let i = 1; i <= date; i++) {
  dateRes.push(i)
}


export const getYears = (date: number) => {
  const date1 = new Date(date);
  const date2 = new Date();
  const oneDay = 1000 * 60 * 60 * 24;
  const diffInTime = date2.getTime() - date1.getTime();
  const diffInDays = Math.round(diffInTime / oneDay);
  const years = Math.trunc(diffInDays / 365).toString()


  return years

}
