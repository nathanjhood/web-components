// @ts-check

import './App.css';
import logo from './logo.svg';

/**
 * @returns {HTMLElement}
 */
const App = () => {
  //
  console.log('constructing App()');
  //
  const logoSrc = 'data:image/svg+xml;base64,' + logo;
  //
  if (!window.customElements.get('app-component')) {
    window.customElements.define(
      'app-component',
      /**
       * The `AppComponent` class.
       * @extends {HTMLElement}
       */
      class AppComponent extends HTMLElement {
        /**
         *
         */
        constructor() {
          super();
          console.debug('constructor()');
        }
        /**
         * @returns {void}
         * @private
         */
        setup() {
          this.innerHTML = this.render();
          console.debug('setup()');
        }
        /**
         * @returns {void}
         * @private
         */
        connectedCallback() {
          this.setup();
          console.debug(
            '<app-component connectedCallback()> - element added to page.'
          );
        }
        /**
         * @returns {void}
         * @private
         */
        disconnectedCallback() {
          console.debug(
            '<app-component disconnectedCallback()> - element removed from page.'
          );
        }
        /**
         * @returns {void}
         * @private
         */
        adoptedCallback() {
          console.debug(
            '<app-component adoptedCallback()> - element moved to new page.'
          );
        }
        /**
         * @param {string} name
         * @param {string} oldValue
         * @param {string} newValue
         * @returns {void}
         * @private
         */
        attributeChangedCallback(name, oldValue, newValue) {
          console.debug(
            '<app-component attributeChangedCallback()> attributes changed.',
            {
              name: name,
              oldValue: oldValue,
              newValue: newValue,
            }
          );
        }
        /**
         * @returns {string}
         * @private
         */
        render() {
          return `
<div class="App">
  <header class="App-header">
  <img
    src="${logoSrc}"
    class="App-logo"
    alt="logo"
  />
  <p>
    Edit <code>src/App.js</code> and save to reload.
  </p>
  <a
    class="App-link"
    href="https://github.com/nathanjhood/web-components"
    target="_blank"
    rel="noopener noreferrer"
  >
    Powered by web-components
  </a>
  </header>
</div>
          `;
        }
      }
    );
  }
  return document.createElement('app-component');
};

export default App;
