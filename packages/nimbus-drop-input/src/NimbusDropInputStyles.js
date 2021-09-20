import { html, css } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

export const cssObject = css`
  :host {
    display: block;
    padding: 25px;
    color: var(--nimbus-drop-input-text-color, #000);
  }
`;

const stylesObject = {
  '#input-tag' : { 
    fontSize: '10rem',
    backgroundColor : 'gray'
  }
};;

export const getStyle = querySelector => styleMap(stylesObject[querySelector]);

const styleRulesForComponent = `
  #input-tag {
    color: red
  }
`;

export const styleTagHTML = html`
  <style>
    ${styleRulesForComponent}
  </style>
`;