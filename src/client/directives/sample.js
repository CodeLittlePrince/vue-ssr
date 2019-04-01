function directiveSample() {
  if (process.env.VUE_ENV === 'client') {
    console.log('%cdirectives works', 'color: green')
  }
}

export default {
  bind: directiveSample,
  update: directiveSample
}