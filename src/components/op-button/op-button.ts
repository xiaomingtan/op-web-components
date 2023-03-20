import { LitElement, css, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import stylesheet from './op-button.css';

@customElement('op-button')
export class OpButton extends LitElement {
  static styles = css`
    ${unsafeCSS(stylesheet)}
  `;

  render() {
    return html`<button>test</button>`;
  }
}
