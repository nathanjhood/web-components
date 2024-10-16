// @ts-check

import App from './App';
import './index.css';

/**
 * The 'render' function.
 * Renders the passed-in component instance (attaches to the DOM).
 * Requires that your HTML document contains a tag with id set to "root".
 * Renders error and warning messages in case of failure.
 */

const render = (
  /** @type {{ (): HTMLElement; (): any; }} */
  element
) => {
  /**
   * @type {Error[]}
   */
  const warnings = [];
  /**
   * @type {Error[]}
   */
  const errors = [];

  const root = document.getElementById('root');

  if (root === null) {
    errors.push(new Error('Missing HTML tag with id="root"'));
  } else {
    if (element) {
      const el = element();
      root.appendChild(el);
    }
  }

  // error reporting
  if (errors.length > 0 || warnings.length > 0) {
    //
    const messages = errors.concat(warnings);
    //
    messages.forEach(async (message) => {
      //
      const pre = document.createElement('pre');
      const code = document.createElement('code');
      code.innerText += message.stack + '\n';
      //
      pre.appendChild(code);
      document.body.appendChild(pre);
      //
      console.error(message.message);
      return message;
    });
  }
};

export default render(App);

// class AppComponent extends HTMLElement {
//   /**
//    * Constructs a new `AppComponentInstance`
//    */
//   constructor() {
//     super();
//     this.setup();
//   }
//   /**
//    * Requirements for a new `AppComponent` instance.
//    * @returns {void}
//    * @private
//    */
//   setup() {
//     this.attachShadow({ mode: 'open' });
//     this.id = "app";
//     this.className = "App";
//     return;
//   }
//   /**
//    * Renders an `AppComponent`, with optional inner HTML
//    * @param {HTMLElement['innerHTML']} innerHTML
//    * @returns {string}
//    * @private
//    */
//   render(innerHTML = '') {
//     return `<slot>${innerHTML}</slot>`;
//   }
//   connectedCallback() {
//     console.info("<application-component> element added to page.");
//     if(this.shadowRoot) {
//       this.shadowRoot.innerHTML = this.render('Your application goes here!');
//     }
//   }

//   disconnectedCallback() {
//     console.info("<application-component> element removed from page.");
//   }
// }


// if (!window.customElements.get('app-component')) {
//   window.customElements.define('app-component', AppComponent);
// }

// /** @type {Error[]} */
// let errors = [];

// // get the element which has 'id="root"'
// let root = document.getElementById("root");

// if(root !== null) {
//   const app = new AppComponent();
//   // append the web component to the "root"
//   root.appendChild(app);
// } else {
//   errors.push(new Error('Missing required <div id="root">'));
// }

// // error reporting
// if(errors.length > 0) errors.forEach(
//   async (error, index) => {
//     const errorMessage = JSON.stringify({
//       index: index,
//       [error.name]: {
//         message: error.message,
//         stack: error.stack,
//       }
//     })
//     const pre = document.createElement("pre");
//     const code = document.createElement("code");
//     code.innerText += errorMessage;
//     pre.appendChild(code);
//     document.body.appendChild(pre);
//     console.error(error.message);
//   }
// )
