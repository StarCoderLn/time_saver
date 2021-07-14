import { View } from '@tarojs/components';
import { useState, useEffect, useRef } from 'react';
import F2 from '@antv/f2';
import F2Canvas from '@/components/F2Chart';

import './index.scss';

require('@antv/f2/lib/interaction/pan');
// ScrollBar 插件用于辅助 pan 和 pin 两种交互行为，以显示当前图表的数据范围。
const ScrollBar = require('@antv/f2/lib/plugin/scroll-bar');

interface Tooltip {
  x: number;
  y: number;
  name: string;
  value: string;
  title: string;
}

interface Props {
  data: Array<ChartLine.ChartLineData>;
  color: Function;
  tooltipNum?: number;
  additionalTooltip?: (tooltip: Record<any, any>) => Tooltip;
  recordScale?: F2.DataRecordScale<Record<any, any>>; // 数据记录的度量, chart.source 的第二个参数
  legend?: any;
}

export default function ChartLine(props: Props) {
  const { data, color, additionalTooltip, tooltipNum = 2, legend = false } = props;
  const [ chart, setChart ] = useState<F2.Chart | undefined>(undefined);
  const renderTimer = useRef<NodeJS.Timeout>(); // 简单防抖

  console.log(data)

  useEffect(() => {
    if (chart) {
      renderTimer.current && clearTimeout(renderTimer.current);
      renderTimer.current = setTimeout(() => {
        chart
          .point() // 几何标记类型
          .position('date * total') // 表示将 'date' 数据值映射至 x 轴坐标点，'total' 数据值映射至 y 轴坐标点
          .style('type', {
            stroke: (color as unknown) as string,
            lineWidth: 1.5,
            fill: '#fff'
          })
          .size(2)
          .shape('smooth');
        chart.changeData(data); // 图表数据更新（前后数据结构不发生变化），需要马上更新图表。
      }, 100);
    }
  }, [data, chart]);

  const onInitChart = (F2, config, node) => {
    config.plugins = ScrollBar;
    config.appendPadding = [20, 10, 0, 0];

    const chart = new F2.Chart(config);

    // 当 chart 实例创建完毕之后，通过调用 chart.source(data) 装载数据
    // 如果仅仅是更新数据，而不需要马上更新图表，可以调用 chart.source(data)，然后在需要更新图表时调用 chart.repaint()。
    chart.source(data, {
      date: {
        tickCount: 30, // 坐标轴上刻度点的个数，不同的度量类型对应不同的默认值
        range: [0, 1000] // 输出数据的范围，数值类型的默认值为 [0, 1]
      },
      total: {
        type: 'linear' // 指定不同的度量类型
      }
    });

    chart.axis('date', {
      line: null,
      label: function label(text, index, total) {
        return {
          fill: '#afafaf',
          textAlign: index === 0 ? 'left' : index === total - 1 ? 'right' : ''
        }
      }
    });

    chart.axis('total', {
      label: {
        fill: '#afafaf'
      },
      grid: text => {
        if (text === '0') {
          return {
            lineDash: null,
            lineWidth: 1
          }
        }
        return {
          stroke: '#ededed',
          lineWidth: 1
        }
      }
    });

    if (legend) {
      chart.legend('gender', legend);
    } else {
      chart.legend(false);
    }

    chart
      .line()
      .position('date * total')
      .color('type', color)
      .shape('smooth');

    chart
      .area()
      .position('date * total')
      .color('type', val => {
        const res = color(val);
        return `l(90) 0:${String(res)} 1:#f7f7f7`
      })
      .shape('smooth');

    chart.tooltip({
      alwaysShow: true, // 移出后是否还显示 tooltip
      showTitle: true,
      layout: 'vertical',
      triggerOn: ['touchstart', 'touchmove'], // tooltip 出现的触发行为，可自定义
      triggerOff: ['touchend'], // 消失的触发行为，可自定义
      onShow: e => {
        // tooltip 去重
        e.items.splice(tooltipNum);

        // 增加自定义 tooltip
        try {
          if (typeof additionalTooltip !== 'function') return;

          const additionalTooltips = additionalTooltip(e.items);
          e.items.push(additionalTooltips);
        } catch(e) {
          console.error(`增加自定义 tooltip 错误：${JSON.stringify(e)}`);
        }
      },
      offsetY: 80,
      background: {
        padding: [12, 16],
        radius: 6,
        fill: 'rgba(0, 0, 0, 0.6)'
      }
    });

    chart.render();
    setChart(chart);
    return chart;
  }

  return (
    <View className="f2_chart">
      <F2Canvas onInitChart={onInitChart} />
    </View>
  )
}