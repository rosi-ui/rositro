import { onnext } from './rositroEvent'
import { createElement, setStyle } from '../utils/index'

export class RositroClass {
  _config: any

  _rositroStep: number

  _targetElement: HTMLElement

  _rositroList: Element[]

  static 'rositro-tooltip': HTMLElement

  static 'rositro-element': HTMLElement

  static 'rositro-mask': HTMLElement

  constructor(targetElement?: HTMLElement) {
    // 指引的挂载根元素
    this._targetElement = targetElement || document.body

    // 配置信息
    this._config = {
      title: '标题',
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
    RositroClass['rositro-mask'] = createElement('div', {
      class: 'rositro-mask'
    })
    setStyle(RositroClass['rositro-mask'], {
      inset: '0px',
      position: 'fixed'
      // 'z-index': '999'
    })

    // 创建rositro元素
    RositroClass['rositro-element'] = createElement('div', {
      class: 'rositro-element'
    })
    setStyle(RositroClass['rositro-element'], {
      position: 'absolute',
      transition: 'all 0.25s linear',
      'border-radius': '3px',
      'box-shadow': `rgb(33 33 33 / 70%) 0px 0px 1px 2px,
                    rgb(33 33 33 / 30%) 0px 0px 0px 5000px`
    })

    // 创建tooltip元素
    RositroClass['rositro-tooltip'] = createElement('div', {
      class: 'rositro-tooltip'
    })

    // 挂载至页面
    this._targetElement.append(
      RositroClass['rositro-mask'],
      RositroClass['rositro-element'],
      RositroClass['rositro-tooltip']
    )

    this.renderRositro(this._rositroList[0])
    this.transfer()

    window.addEventListener('resize', () => this.transfer())

    return this
  }

  // 渲染指引tooltip
  private renderRositro(currentStep: any) {
    if (currentStep) {
      RositroClass['rositro-tooltip'].innerHTML = `
        <div class="tooltip-element">
          <div class="tooltip-elemenet-header">
            <span>${currentStep.dataset.title || this._config.title}</span>
            <button>${this._config.skipLabel}</button>
          </div>

          <div class="tooltip-elemenet-context">
            ${currentStep.dataset.content || ''}
          </div>

          <div class="tooltip-elemenet-progress">
            ${this._rositroStep + 1}
          </div>

          <div class="tooltip-elemenet-footer">
            <button class="pre">${this._config.preLabel}</button>
            <button class="next">${
              this._rositroList.length - 1 === this._rositroStep
                ? this._config.doneLabel
                : this._config.nextLabel
            }</button>
          </div>
        </div>
      `

      const pre = document.querySelector<HTMLButtonElement>(
        '.rositro-tooltip .pre'
      )!
      pre.onclick = this.preStep.bind(this)

      const next = document.querySelector<HTMLButtonElement>(
        '.rositro-tooltip .next'
      )!
      next.onclick = this.nextStep.bind(this)
    } else {
      throw new Error(
        'Rositro need a starting point, try using data-step on the element'
      )
    }
  }

  // 定位当前位置，刷新方法
  private transfer() {
    // TODO: 定位当前指引目标
    const rect = this._rositroList[this._rositroStep].getBoundingClientRect()
    const styles = {
      top: `${String(rect.top - 5)}px`,
      left: `${String(rect.left - 4)}px`,
      width: `${String(rect.width + 8)}px`,
      height: `${String(rect.height + 10)}px`
    }
    setStyle(RositroClass['rositro-element'], styles)
    setStyle(RositroClass['rositro-tooltip'], styles)
  }

  // 下一步的回调事件，待定，需更好方式替换
  onnext(fn: () => void) {
    onnext.call(this, fn)
  }

  // 默认的下一步事件
  nextStep() {
    if (this._rositroList.length - 1 === this._rositroStep) {
      RositroClass['rositro-element'].remove()
      RositroClass['rositro-tooltip'].remove()
      RositroClass['rositro-mask'].remove()
    } else {
      // eslint-disable-next-line no-plusplus
      ++this._rositroStep
      this.renderRositro(this._rositroList[this._rositroStep])
      this.transfer()
    }
  }

  // 默认的上一步事件
  preStep() {
    if (this._rositroStep !== 0) {
      // eslint-disable-next-line no-plusplus
      --this._rositroStep
      this.renderRositro(this._rositroList[this._rositroStep])
      this.transfer()
    }
  }
}
