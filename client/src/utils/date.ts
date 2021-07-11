export function formatDate (val) {
  if (val) {
    let date = new Date(parseInt(val) * 1000);
    return (
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1) +
      '-' +
      (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
    );
  } else {
    return val;
  }
}