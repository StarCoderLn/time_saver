// 云函数入口函数
exports.main = async (event, context) => {
  const { werundata } = event
  return werundata
}