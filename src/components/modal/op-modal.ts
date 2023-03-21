import { LitElement, html, css, unsafeCSS, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import stylesheet from './op-modal.css';
// import './op-base-modal';

@customElement('op-modal')
export class OpModal extends LitElement {
  static styles = css`
    ${unsafeCSS(stylesheet)}
  `;

  @property({ type: String })
  title: string = '';

  @property({ type: String })
  desc: string = '';

  @property({ type: Boolean, reflect: true })
  show: boolean = false;

  _onChange({ detail }) {
    this.show = detail.show;
  }

  _onCancel() {
    this.show = false;
  }

  _onConfirm() {
    const ev = new CustomEvent('confirm');
    this.dispatchEvent(ev);
  }

  _titleTemplate() {
    return html`<div class="title">${this.title}</div>`;
  }

  _descTemplate() {
    return this.desc ? html`<div class="desc">${this.desc}</div>` : nothing;
  }

  _btnsTemplate() {
    return html`<div class="btns">
      <op-button class="cancel" border @click=${this._onCancel}>cancel</op-button>
      <op-button class="confirm" @click=${this._onConfirm}>confirm</op-button>
    </div>`;
  }

  render() {
    return html`<op-base-modal ?show=${this.show} @change=${this._onChange}>
      <div class="body">
        ${this._titleTemplate()} ${this._descTemplate()} ${this._btnsTemplate()}
      </div>
    </op-base-modal>`;
  }
}
