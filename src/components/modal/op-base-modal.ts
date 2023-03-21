import { LitElement, html, css, unsafeCSS, PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import stylesheet from './op-modal.css';
import { genClassNamesFromObj } from '@/utils/dom-util';
import { sleep } from '@/utils/tools';

let modalIndex = 2000;

type PositionType = 'top' | 'left' | 'right' | 'center' | 'bottom';

@customElement('op-base-modal')
export class OpBaseModal extends LitElement {
  static styles = css`
    ${unsafeCSS(stylesheet)}
  `;

  @state()
  _transitionName = '';

  @state()
  _show = false;

  @property({ type: Boolean, reflect: true })
  show: boolean = false;

  @property({ type: Boolean })
  overlayClickable: boolean = false;

  @property({ type: String })
  position: PositionType = 'center';

  attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
    super.attributeChangedCallback(name, _old, value);
    if (name === 'show') {
      if (value !== null) {
        modalIndex += 1;
        this._show = true;
        this._fadeAnimationShow();
      } else {
        this._fadeAnimationHide().then(() => {
          this._show = false;
        });
      }
    }
  }

  _fadeAnimationShow = async () => {
    this._transitionName = 'fade-enter-from';
    await sleep(16);
    this._transitionName = 'fade-enter-active';
    await sleep(300);
    this._transitionName = 'fade-enter-to';
    await sleep(16);
    this._transitionName = '';
  };

  _fadeAnimationHide = async () => {
    this._transitionName = 'fade-leave-from';
    await sleep(16);
    this._transitionName = 'fade-leave-active';
    await sleep(16);
    this._transitionName = 'fade-leave-to fade-leave-active';
    await sleep(300);
    this._transitionName = '';
  };

  _onClickOverlay() {
    this._close();
  }

  _close() {
    if (!this.overlayClickable) return;
    const ev = new CustomEvent('change', {
      bubbles: false,
      composed: false,
      detail: {
        show: false
      }
    });
    this.dispatchEvent(ev);
  }

  _onClickContent(e: Event) {
    e.stopPropagation();
  }

  render() {
    return html`<div
        style="z-index: ${modalIndex}"
        class="op-modal-overlay ${genClassNamesFromObj({
          show: this._show
        })} ${this._transitionName}"
        @click=${this._onClickOverlay}
      />
      <div
        style="z-index: ${modalIndex + 1}"
        class="op-modal-content ${this.position} ${genClassNamesFromObj({
          show: this._show
        })} ${this._transitionName}"
        @click=${this._onClickContent}
      >
        <slot></slot>
      </div>`;
  }
}
