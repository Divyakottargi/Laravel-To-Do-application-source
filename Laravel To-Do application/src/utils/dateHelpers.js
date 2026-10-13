export function toISODate(dateInput) {
  if (!dateInput) return ''
  const date = new Date(dateInput)
  if (Number.isNaN(date.getTime())) return ''
  return date.toISOString().slice(0, 10)
}

export function formatDate(dateInput) {
  if (!dateInput) return '-'
  const date = new Date(dateInput)
  if (Number.isNaN(date.getTime())) return '-'
  return date.toLocaleDateString()
}

export function getMonthGrid(year, month) {
  const firstDay = new Date(year, month, 1)
  const startOffset = firstDay.getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()
  const cells = []

  for (let i = startOffset - 1; i >= 0; i -= 1) {
    cells.push({
      date: new Date(year, month - 1, daysInPrevMonth - i),
      isCurrentMonth: false,
    })
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({
      date: new Date(year, month, day),
      isCurrentMonth: true,
    })
  }

  while (cells.length % 7 !== 0) {
    const nextDay = cells.length - (startOffset + daysInMonth) + 1
    cells.push({
      date: new Date(year, month + 1, nextDay),
      isCurrentMonth: false,
    })
  }

  return cells
}
