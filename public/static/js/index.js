class MyComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if(this.shadowRoot) {
      this.shadowRoot.innerHTML = this.render();
    } else {
      this.shadowRoot = new ShadowRoot;
    }
  }
  /**
   * @param {string} innerHTML
   * @returns {string}
   */
  render(innerHTML) {
    return `<slot>${innerHTML || ''}</slot>`;
  }
}

window.customElements.define('my-component', MyComponent);
