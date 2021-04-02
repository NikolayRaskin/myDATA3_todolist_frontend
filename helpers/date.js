export const formatDate = (inputDate) => {
  const date = new Date(inputDate).toLocaleString().split(',')
  return `${date[0]} ${date[1]}`
}
