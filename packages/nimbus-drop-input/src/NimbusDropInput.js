import { html, LitElement } from 'lit';
import { cssObject, getStyle, styleTagHTML } from './NimbusDropInputStyles.js';

export class NimbusDropInput extends LitElement {
  static get styles() {
    return cssObject;
  }

  static get properties() {
    return {
      styleOfInput: { type: String },
      max: { type: Number },
      maxLength: { type: Number },
      min: { type: Number },
      minLength: { type: Number },
      placeholder: { type: String },
      type: { type: String },
      value: { type: String },
      isRequired: { type: Boolean },
      isdisabled: { type: Boolean },
      label: { type: String },
      pattern: { type: String },
      _inputStatus: { type: String },
      _whiteSpacePattern: { type: String },
      _inputvalidator: { type: Object },
    };
  }

  /**
   * @param {Number} value
   */
  set maxLength(value) {
    if (value === 0) {
      this._maxLength = null;
    } else {
      this._maxLength = value;
    }
  }

  /**
   * @param {Number} value
   */
  set minLength(value) {
    if (value === 0) {
      this._minLength = null;
    } else {
      this._minLength = value;
    }
  }

  constructor() {
    super();
    this.styleOfInput = '';
    this.max = 0;
    this.maxLength = 0;
    this.min = 0;
    this.minLength = 0;
    this.placeholder = '';
    this.type = '';
    this.value = '';
    this.isRequired = false;
    this.isDisabled = false;
    this.label = '';
    this.pattern = '';
    this._inputStatus = '';
    this._whiteSpacePattern = '';
    this._inputvalidator = {};
    this.inputStyle = {
      fontSize: '10rem',
    };
  }

  firstUpdated() {
    super.firstUpdated();
    this._inputvalidator = this.pattern !== '' ? new RegExp(this.pattern) : new RegExp('([^s])');
  }

  _createInputTag() {
    return html`
      <input
        style="${getStyle('#input-tag')}"
        id="input-tag"
        status="${this._inputStatus}"
        max="${this.max}"
        maxlength="${this.maxLength}"
        min="${this.min}"
        minlength="${this.minLength}"
        placeholder="${this.placeholder}"
        .value="${this.value}"
        .type="${this.type}"
        ?disabled="${this.isDisabled}"
        ?required="${this.isRequired}"
        @input="${this._fireInputEvent}"
        @change="${this._fireInputChangeEvent}"
        @focus="${this._fireFocusEvent}"
        @blur="${this._fireBlurEvent}"
      />
    `;
  }

  _fireInputEvent(e) {
    this.value = e.target.value;
    this._validateValue();
    this.dispatchEvent(
      new CustomEvent('nimbus-input-changed', { detail: { value: this.value } })
    );
  }

  _validateValue() {
    if (this.value !== '' && this._inputvalidator.test(this.value)) {
      this._inputStatus = 'valid';
      this.dispatchEvent(new CustomEvent('nimbus-valid-value'));
    } else {
      this._inputStatus = '';
      this.dispatchEvent(new CustomEvent('nimbus-invalid-value'));
    }
  }

  render() {
    return html` 
      ${styleTagHTML}
      ${this._createInputTag()} `;
  }
}
