import { styleMap } from 'lit/directives/style-map.js';

export function loadStyles(stylesObject) {
  const keys = Object.keys(stylesObject);
  for (const key of keys) {
    const element = this.shadowRoot.querySelector(key);
    element.setAttribute('style', styleMap(stylesObject[key]));
  };
};