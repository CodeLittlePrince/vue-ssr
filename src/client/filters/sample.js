export default function(value, arg) {
  if (process.env.VUE_ENV === 'client') {
    console.log('%cfilters works', 'color: purple;')
  }
  return `${value}${arg}`
}