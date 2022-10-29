import { onnext } from './rositroEvent'
import { createElement, setStyle } from '../utils/index'

export class RositroClass {
  _config: any

  _rositroStep: number

  _targetElement: HTMLElement

  _rositroList: Element[]

  'rositro-tooltip': HTMLElement

  'rositro-element': HTMLElement

  constructor(targetElement?: HTMLElement) {
    // 指引的挂载根元素
    this._targetElement = targetElement || document.body

    // 配置信息
    this._config = {
      preLabel: '上一步',
      nextLabel: '下一步',
      skipLabel: '跳过',
      doneLabel: '结束'
    }

    // 获取全部指引元素
    const stepElementList = document.querySelectorAll('[data-step]')

    this._rositroList = Array.from(stepElementList)

    this._rositroList.sort((a: any, b: any) => {
      return a.dataset.step - b.dataset.step
    })

    this._rositroStep = 0
  }

  // eslint-disable-next-line class-methods-use-this
  start() {
    // 创建mask蒙版元素
    const mask = createElement('div', {
      class: 'rositro-mask'
    })
    setStyle(mask, {
      inset: '0px',
      position: 'fixed',
      'z-index': '999'
    })

    // 创建rositro元素
    this['rositro-element'] = createElement('div', {
      class: 'rositro-element'
    })
    setStyle(this['rositro-element'], {
      position: 'absolute',
      transition: 'all 0.25s linear',
      'border-radius': '3px',
      'box-shadow': `rgb(33 33 33 / 80%) 0px 0px 1px 2px,
                    rgb(33 33 33 / 50%) 0px 0px 0px 5000px`
    })

    // 创建tooltip元素
    this['rositro-tooltip'] = createElement('div', {
      class: 'rositro-tooltip'
    })

    // TODO: tooltip的html结构与样式
    setStyle(this['rositro-tooltip'], {
      position: 'absolute',
      transition: 'all 0.25s linear'
    })

    // 挂载至页面
    this._targetElement.append(
      mask,
      this['rositro-element'],
      this['rositro-tooltip']
    )
  }

  transfer() {
    // TODO: 定位当前指引目标
    const rect = this._rositroList[this._rositroStep].getBoundingClientRect()
  }

  onnext(fn: () => void) {
    onnext.call(this, fn)
  }
}
