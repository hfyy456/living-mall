export default function setDate(date: string) {
  const ymd = date.split('T')[0]
  const month = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec'
  ]
  const ymdArray = ymd.split('-')
  const [y, m, d] = ymdArray
  return `${month[parseInt(m) - 1]} ${d},${y}`
}