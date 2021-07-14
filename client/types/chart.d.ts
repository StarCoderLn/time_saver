declare namespace ChartLine {
  interface ChartLineData {
    date: string; // 时间，格式：2021-07-14 00:00:00
    total: number; // 数值，对应 Y 轴的值
    type: string; // 类型，对应图例和线表达的类型
  }
}