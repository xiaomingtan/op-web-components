import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import stylesheet from './op-header.css';

@customElement('my-header')
export class Header extends LitElement {
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    ${unsafeCSS(stylesheet)}
  `;

  // Declare reactive properties
  @property({ type: String })
  name: string = 'World';

  // Render the UI as a function of component state
  render() {
    return html`<p class="title">Hello, ${this.name}!</p>`;
  }
}
