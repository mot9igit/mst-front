export const WEEKDAYS = [
  { value: 1, label: 'Пн' },
  { value: 2, label: 'Вт' },
  { value: 3, label: 'Ср' },
  { value: 4, label: 'Чт' },
  { value: 5, label: 'Пт' },
  { value: 6, label: 'Сб' },
  { value: 7, label: 'Вс' },
]

const WEEKDAY_ALIASES = {
  пн: 1,
  понедельник: 1,
  monday: 1,
  mon: 1,
  вт: 2,
  вторник: 2,
  tuesday: 2,
  tue: 2,
  ср: 3,
  среда: 3,
  wednesday: 3,
  wed: 3,
  чт: 4,
  четверг: 4,
  thursday: 4,
  thu: 4,
  пт: 5,
  пятница: 5,
  friday: 5,
  fri: 5,
  сб: 6,
  суббота: 6,
  saturday: 6,
  sat: 6,
  вс: 7,
  воскресенье: 7,
  sunday: 7,
  sun: 7,
}

export function normalizeWeekdays(value) {
  if (value === null || value === undefined || value === '') return []
  let source = value
  if (typeof source === 'string') {
    source = source.split(/[\s,;]+/)
  }
  if (!Array.isArray(source)) return []
  const result = []
  source.forEach((item) => {
    let day = null
    if (typeof item === 'number' || /^\d+$/.test(String(item).trim())) {
      day = Number(item)
    } else {
      day = WEEKDAY_ALIASES[String(item).trim().toLowerCase()] ?? null
    }
    if (day >= 1 && day <= 7 && !result.includes(day)) {
      result.push(day)
    }
  })
  return result.sort((a, b) => a - b)
}

export function weekdaysLabel(value) {
  return normalizeWeekdays(value)
    .map((day) => WEEKDAYS.find((item) => item.value === day)?.label)
    .filter(Boolean)
    .join(', ')
}

export function parseCityDate(value) {
  if (!value) return null
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value
  }
  const s = String(value).trim()
  let m = s.match(/^(\d{4})-(\d{2})-(\d{2})(?:[T\s](\d{1,2}):(\d{2})(?::(\d{2}))?)?/)
  if (m) {
    return new Date(
      Number(m[1]),
      Number(m[2]) - 1,
      Number(m[3]),
      Number(m[4] || 0),
      Number(m[5] || 0),
      Number(m[6] || 0),
    )
  }
  m = s.match(/^(\d{2})\.(\d{2})\.(\d{4})/)
  if (m) return new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]))
  const d = new Date(s)
  return Number.isNaN(d.getTime()) ? null : d
}

export function formatCityDate(value, fallback = '-') {
  const d = parseCityDate(value)
  if (!d) return fallback
  const pad = (n) => String(n).padStart(2, '0')
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`
}

export function formatCityDateValue(value) {
  const d = parseCityDate(value)
  if (!d) return null
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export function formatCityDateTimeValue(value) {
  const d = parseCityDate(value)
  if (!d) return null
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
    d.getHours(),
  )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}
