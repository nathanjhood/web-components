# Web Components

OOP in the browser!

```html
<!doctype html>
<html lang="en">
  <head>(...)</head>
  <body>
    <div id="root">
      <app-component>
        <slot>"Your App Goes Here!"</slot>
      </app-component>
    </div>
    <script type="module"></script>
  </body>
</html>
```

- No config
- No framework
- No abstractions

Just raw [Web API](https://developer.mozilla.org/en-US/docs/Web/API).

Powered by TailwindCSS, ESBuild, and fast-refreshing development server!

## How to...

Step by step!

- [`start`](#start)
- [`class AppComponent {}`](#class-appcomponent-)
- [`AppComponent.constructor()`](#appcomponentconstructor)
- [`AppComponent extends HTMLElement`](#appcomponent-extends-htmlelement)
- [`HTMLElement.super()`](#htmlelementsuper)
- [`this`](#this)
- [`AppComponent.innerHtml`](#appcomponentinnerhtml)
- [`CustomElementRegistry`](#customelementregistry)
- [`'app-component': AppComponent`](#app-component-appcomponent)
- [`AppComponent.render()`](#appcomponentrender)
- [`AppComponent.render(innerHTML)`](#appcomponentrenderinnerhtml)
- [`AppComponent.setup()`](#appcomponentsetup)
- [`createElement('app-component')`](#createelementapp-component)
- [`App()`](#app)
- [`render(App)`](#renderapp)
- [`<app-component>`](#app-component)
- [Tips](#tips)
- [Further Reading](#further-reading)

### `start`

```sh
$ git clone git@github.com:nathanjhood/web-components.git
```

```sh
$ cd web-components
```

```sh
$ npm install
```

```sh
# For Windows...
$env:NODE_ENV="development"

# For Linux/Mac...
export NODE_ENV="development"
```

```sh
$ npm run start
# ...

Rebuilding...

Done in 1623ms.

Server running at http://127.0.0.1:3000/
To exit: Ctrl + c

```

[Open in your browser](http://localhost:3000) and edit `src/App.js` - the page will automatically refresh itself after every save.

---

### `class AppComponent {}`

```js
// src/App.js

class AppComponent {}
```

---

### `AppComponent.constructor()`

```js
class AppComponent {
  constructor() {/** setup goes here... */}
}
```

---

### `AppComponent extends HTMLElement`

```js
// "I am a HTMLElement"

class AppComponent extends HTMLElement {
  constructor() {}
}

// "...plus more ;) "
```

---

### `HTMLElement.super()`

```js
class AppComponent extends HTMLElement {
  constructor() {
    super(); // MUST do this first...
  }
}
```

---

### `this`

```js
class AppComponent extends HTMLElement {
  constructor() {
    // inside here, "this" means "this 'AppComponent'"...

    super();
    this. // <-- '.' should produce a long list of props and methods...
  }
}
```

---

### `AppComponent.innerHtml`

```js
// 'innerHTML' === <app-component>innerHTML</app-component>

class AppComponent extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `<slot>Your app goes here</slot>`;
  }
}
```

### `CustomElementRegistry`

```js
// IMPORTANT
window.customElements.define('app-component', AppComponent);
```

---

### `'app-component': AppComponent`

```js
window.customElements.define('app-component', // <-- wrap the class!
  class AppComponent extends HTMLElement {
    constructor() {
      super();
      this.innerHTML = `<slot>Your app goes here</slot>`;
    }
  }
); // <-- '.define()' ends here!
```

---

### `AppComponent.render()`

```js
window.customElements.define('app-component',
class AppComponent extends HTMLElement {
    constructor() {
      super();
      this.innerHTML = this.render();
    }
    render() {
      return `<slot>Your app goes here</slot>`;
    }
  }
);
```

---

### `AppComponent.render(innerHTML)`

```js
window.customElements.define('app-component',
  class AppComponent extends HTMLElement {
    constructor() {
      super();
      this.innerHTML = this.render('Your app goes here');
    }
    render(innerHTML) {
      return `<slot>${innerHTML}</slot>`;
    }
  }
);
```

---

### `AppComponent.setup()`

```js
window.customElements.define('app-component',
  class AppComponent extends HTMLElement {
    constructor() {
      super();
      this.setup();
    }
    setup() {
      this.innerHTML = this.render('Your app goes here');
    }
    render(innerHTML) {
      return `<slot>${innerHTML}</slot>`;
    }
  }
);
```

---

### `createElement('app-component')`

```js
window.customElements.define('app-component',
  class AppComponent extends HTMLElement {
    constructor() {
      super();
      this.setup();
    }
    setup() {
      this.innerHTML = this.render('Your app goes here');
    }
    render(innerHTML) {
      return `<slot>${innerHTML}</slot>`;
    }
  }
);

const app = document.createElement('app-component');
```

---

### `App()`

```js
const App = () => {
  // define the component
  window.customElements.define('app-component',
    class AppComponent extends HTMLElement {
      constructor() {
        super();
        this.setup();
      }
      setup(): void {
        this.innerHTML = this.render('Your app goes here');
      }
      render(innerHTML) {
        return `<slot>${innerHTML}</slot>`;
      }
    }
  );
  // then return it
  return document.createElement('app-component');
}

// Now we can assign it :)
const app = App();
```

---

### `render(App)`

```js
// src/index.js

import App = require('./App');

const render = (element) = {
  // ...attaches passed-in element to document
}

// so, pass it our App :)
render(App)

```

---

### `<app-component>`

```html
<!-- This is what you see in your IDE... -->
<!doctype html>
<html lang="en">
  <head></head>
  <body>
    <div id="root"></div>
    <script type="module" src="./static/js/index.js"></script>
  </body>
</html>
```

```html
<!-- ...this is what you see in your web browser! -->
<!doctype html>
<html lang="en">
  <head></head>
  <body>
    <div id="root">
      <app-component>
        #shadowRoot (open)
        <slot>"Your App Goes Here!"</slot>
      </app-component>
    </div>
    <script type="module"></script>
  </body>
</html>
```

---


## Tips

---

### functional approach

```js
// example:

const Button = () => {
  return document.createElement('button')
}

// HTMLButtonElement
const button = Button();

```

---

### factory method

```js
// example

const CustomButton = () => {
  class CustomButtonElement extends HTMLButtonElement {
    constructor() {
      super();
    }
  }
  customElements.define('custom-button', CustomButtonElement)
  return document.createElement('custom-button');
};

// CustomButtom
const customButton = CustomButton();
```

---

### passing props

```js
/**
 * @typedef CustomButtonProps
 * @property {'submit' | 'reset' | 'button'} type
 */

/**
 * @param {CustomButtonProps} props
 * @returns {HTMLButtonElement}
 */
const CustomButton = (props) => {
  class CustomButtonElement extends HTMLButtonElement {
    constructor() {
      super();
      this.type = props.type;
    }
  }
  customElements.define('custom-button', CustomButtonElement);
  return document.createElement('custom-button');
};

const customButton = CustomButton({ type: 'submit' });

```

---

### adding children

```js
/**
 * @typedef CustomButtonProps
 * @property {'submit' | 'reset' | 'button'} type
 * @property {Node | undefined} children
 */

/**
 * @param {CustomButtonProps} props
 * @returns {HTMLButtonElement}
 */
const CustomButton = (props) => {
  class CustomButtonElement extends HTMLButtonElement {
    constructor() {
      super();
      this.type = props.type;
      if (props.children) this.appendChild(props.children);
    }
  }
  customElements.define('custom-button', CustomButtonElement);
  return document.createElement('custom-button');
};

const customButtonA = CustomButton({ type: 'submit' });
const customButtonB = CustomButton({ type: 'submit', children: customButtonA });

```

---

### adding styles

```js

/**
 * @typedef CustomButtonProps
 * @property {'submit' | 'reset' | 'button'} type
 * @property {Node | undefined} children
 * @property {string | undefined} className
 */

/**
 * @param {CustomButtonProps} props
 * @returns {HTMLButtonElement}
 */
const CustomButton = (props) => {
  class CustomButtonElement extends HTMLButtonElement {
    constructor() {
      super();
      this.type = props.type;
      if (props.children) this.appendChild(props.children);
      if (props.className) this.className = props.className;
    }
  }
  customElements.define('custom-button', CustomButtonElement);
  return document.createElement('custom-button');
};

const tailwindButton = CustomButton({
  type: 'submit',
  className: 'flex align-left text-white bg-red-500',
});

```

---

## Further Reading

- [eisenebergeffect @ Medium: Hello Web Components](https://eisenbergeffect.medium.com/hello-web-components-795ed1bd108e)
- [MDN's Web Component examples](https://github.com/mdn/web-components-examples)
- [MDN's Web API glossary](https://developer.mozilla.org/en-US/docs/Web/API)
- [MDN's Web API - HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)
- [Building Interoperable Web Components (including React)](https://css-tricks.com/building-interoperable-web-components-react/)

[Read me on github.com](https://github.com/nathanjhood/web-components)

[Read me on nathanjhood.github.io](https://nathanjhood.github.io/web-components)
