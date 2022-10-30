import { RositroClass } from './core'
import './style/_index.scss'

export default function Rositro(targetElement?: HTMLElement) {
  return new RositroClass(targetElement)
}
