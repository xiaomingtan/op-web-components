import { LitElement, css, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import stylesheet from './op-button.css';
import { genClassNamesFromObj } from '@/utils/classUtil';

type ButtonSize = 'sm' | 'md' | 'lg';

@customElement('op-button')
export class OpButton extends LitElement {
  static styles = css`
    ${unsafeCSS(stylesheet)}
  `;

  @property()
  size: ButtonSize = 'md';

  @property({ type: Boolean })
  disabled: boolean = false;

  @property({ type: Boolean })
  block: boolean = false;

  @property({ type: Boolean })
  border: boolean = false;

  protected render() {
    return html`<div
      class="op-button ${this.size} ${genClassNamesFromObj({
        disabled: this.disabled,
        block: this.block,
        border: this.border
      })}"
    >
      <slot></slot>
    </div>`;
  }
}
