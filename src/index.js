// @ts-check

import env from 'env';
import App from './App';
import './index.css';

/**
 * The 'render' function.
 * Renders the passed-in component instance (attaches to the DOM).
 * Requires that your HTML document contains a tag with id set to "root".
 * Renders error and warning messages in case of failure.
 *
 * @param {() => HTMLElement} element The element to render
 */

const render = (element) => {
  // Prepare to collect any errors and warnings...
  /** @type {Error[]} */
  const warnings = [];
  /** @type {Error[]} */
  const errors = [];

  // get a reference to the HTML element with `id="root"`
  /** @type {HTMLElement | null} */
  const root = document.getElementById('root');

  if (root === null) {
    errors.push(new Error('Missing HTML tag with id="root"'));
  } else {
    // create a shadow root and attach it to the 'root' element...
    /** @type {ShadowRoot} */
    const shadowRoot = root.attachShadow({ mode: 'open' });
    // for CSS stylesheets to work, create a link pointing at the CSS...
    /** @type {HTMLLinkElement} */
    const extStylesheet = document.createElement('link');
    extStylesheet.setAttribute('rel', 'stylesheet');
    extStylesheet.setAttribute(
      'href',
      `${env['PUBLIC_URL']}static/css/index.css`
    );
    // include Tailwind, if you're using it...
    /** @type {HTMLLinkElement} */
    const twStylesheet = document.createElement('link');
    twStylesheet.setAttribute('rel', 'stylesheet');
    twStylesheet.setAttribute(
      'href',
      `${env['PUBLIC_URL']}static/css/tailwind.css`
    );
    // Attach the created elements to the shadow dom
    shadowRoot.appendChild(extStylesheet);
    shadowRoot.appendChild(twStylesheet);
    shadowRoot.appendChild(element());
  }

  // error reporting
  if (errors.length > 0 || warnings.length > 0) {
    // put all errors and warnings (if any) into one array
    /** @type {Error[]} */
    const messages = errors.concat(warnings);
    //
    messages.forEach((message) => {
      // attach each message to the document
      /** @type {HTMLPreElement} */
      const pre = document.createElement('pre');
      /** @type {HTMLElement} */
      const code = document.createElement('code');
      code.innerText += message.stack + '\n';
      pre.appendChild(code);
      document.body.appendChild(pre);
      // also log the message to the console
      console.error(message.message);
      return message;
    });
  }
};

export default render(App);
