# Web Components

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

## How to...

### `<projectFolder>`

```sh
./
├── package.json
├── index.html
└── static/
    ├── css/
    │   └── index.css
    ├── js/
    │   └── index.js
    └── png/
        └── logo.png

4 directories, 4 files
```

```sh
./package.json
./index.html
./static/css/index.css
./static/js/index.js
./static/png/logo.png

4 directories, 4 files
```

---

### `class AppComponent {}`

```ts
// static/js/index.js

class AppComponent {}
```

---

### `AppComponent.constructor()`

```ts
class AppComponent {
  constructor() {/** setup goes here... */}
}
```

---

### `AppComponent extends HTMLElement`

```ts
// "I am a HTMLElement"

class AppComponent extends HTMLElement {
  constructor() {}
}

// "...plus more ;) "
```
<pre>
  <s>italics</s>
</pre>
---

### `HTMLElement.super()`

```ts
class AppComponent extends HTMLElement {
  constructor() {
    super(); // MUST do this first...
  }
}
```

---

### `this`

```ts
class AppComponent extends HTMLElement {
  constructor() {
    // inside here, "this" means "this 'AppComponent'"...

    super();
    this.
  }
}
```

---

### `AppComponent.shadowRoot`

```ts
// "attachShadow()" comes from extending the HTMLElement class ;)

class AppComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
}

```

---

### `AppComponent.shadowRoot.innerHtml`

```ts
// 'innerHTML' === <app-component>innerHTML</app-component>

class AppComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<slot>Your app goes here</slot>`;
  }
}
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

### `AppComponent.render()`

```ts
class AppComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = this.render();
  }
  render() {
    return `<slot>Your app goes here</slot>`;
  }
}
```

---

### `AppComponent.render(message)`

```ts
class AppComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = this.render('Your app goes here');
  }
  render(message) {
    return `<slot>${message}</slot>`;
  }
}
```

---

### `'app-component': AppComponent`

```ts
window.customElements.define('app-component',
  class AppComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `<slot>Your app goes here</slot>`;
    }
  }
);
```

---

### `CustomElementRegistry`

```ts
customElements.define('app-component', AppComponent);
```

---

###

```html
<!doctype html>
<html lang="en">
  <head></head>
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

---

_tip:_

```ts
// short
customElements.define()
```

or...

```ts
// fully-qualified
window.customElements.define()
```

---

_tip:_

```ts
class AppComponent extends HTMLElement {}

customElements.define('app-component', AppComponent);
```

or...

```ts
customElements.define('app-component',
  class AppComponent extends HTMLElement {}
);
```

---
