export default (value) => {
  if (/^\[.+]$/.test(value)) {
    return `/${value.match(/^\[(.+)]$/)[1]}/`
  }
  return value
}
