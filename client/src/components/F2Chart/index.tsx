import { Component } from 'react';
import Taro, { eventCenter, getCurrentInstance } from '@tarojs/taro';
import { Canvas } from '@tarojs/components';

import F2 from '@antv/f2';

import random from 'string-random';

interface F2CanvasPropsType {
  onInitChart: (F2, config: any, node: any) => any
}

const wrapEvent = e => {
  if (!e) return;
  if (!e.preventDefault) {
    e.preventDefault = function () {};
  }
  return e;
}

export default class F2Canvas extends Component<F2CanvasPropsType> {
  id: string = `f2-canvas-${random(16)}`;
  state = {
    width: '100%',
    height: '100%'
  };
  canvas: any;
  chart: any;

  componentDidMount() {
    // onReady 生命周期 hack，不加这句的话会报错
    eventCenter.once((getCurrentInstance().router as Taro.RouterInfo<Partial<Record<string, string>>>).onReady, () => {
      const query = Taro.createSelectorQuery();
      query
        .select(`#${this.id}`)
        .fields({
          node: true,
          size: true
        })
        .exec(async res => {
          const { node, width, height } = res[0];
          const context = node.getContext('2d');
          const pixelRatio = Taro.getSystemInfoSync().pixelRatio;

          // 高清设置
          node.width = width * pixelRatio;
          node.height = height * pixelRatio;

          const config = { context, width, height, pixelRatio };
          this.chart = await this.props.onInitChart(F2, config, node);
          console.log(this.chart)
          this.canvas = this.chart.get('el');
        })
    });
  }

  touchStart(e) {
    if (this.canvas) {
      this.canvas.dispatchEvent('touchstart', wrapEvent(e));
    }
  }

  touchMove(e) {
    if (this.canvas) {
      this.canvas.dispatchEvent('touchmove', wrapEvent(e));
    }
  }

  touchEnd(e) {
    if (this.canvas) {
      this.canvas.dispatchEvent('touchend', wrapEvent(e));
    }
  }

  press(e) {
    if (this.canvas) {
      this.canvas.dispatchEvent('press', wrapEvent(e));
    }
  }

  render() {
    return (
      <Canvas
        type='2d'
        style={`width: ${this.state.width}; height: ${this.state.height}`}
        className='f2-canvas'
        canvasId={this.id}
        id={this.id}
        onTouchStart={this.touchStart.bind(this)}
        onTouchMove={this.touchMove.bind(this)}
        onTouchEnd={this.touchEnd.bind(this)}
        onLongPress={this.press.bind(this)}/>
    )
  }
}
