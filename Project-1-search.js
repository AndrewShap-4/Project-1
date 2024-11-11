/**
 * Copyright 2024 AndrewShap-4
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `Project-1`
 * 
 * @demo index.html
 * -@element Project-1
 */
export class Project1 extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "project-1";
  }

  constructor() {
    super();
    this.title = "";
    this.value = ""; 
    this.items = [];
    this.loading = false;
    this.isValid = false;
    this.jsonURL = "https://haxtheweb.org/site.json";
    this.siteURL = '';
    this.siteDetails = [];
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/Project-1.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      value: { type: String },
      siteUrl: { type: String },
      items: { type: Array },
      siteDetails: { type: Object },
      loading: { type: Boolean, reflect: true },
      isValid: { type: Boolean, reflect: true },
      jsonURL: { type: String, attribute: 'json-url' },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      .results div {
        margin: 8px 0;
      }
      details {
        margin: 16px;
        padding: 16px;
        background-color: blue;
      }
      summary {
        font-size: 24px;
        padding: 8px;
        color: white;
        font-size: 42px;
      }
      input {
        font-size: 20px;
        line-height: 40px;
        width: 100%;
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
      <div class="search-container">
        <details open>
          <summary>Search inputs</summary>
          <div class= "search icon"><button ?enabled='${!this.isValid}' @click="${this._analyze}">Analyze</button>
            <input
              id="input"
              placeholder="Search Hax the Web Pages"
              @input="${this.inputChanged}"
            />
          </div>
        </details>
      </div>

      <div class="results">
        ${this.items.length > 0
          ? this.items.map(item => html`
            <div class="card">
              <h3>${item.title || 'No Title'}</h3>
              <p>${item.description || 'No Description'}</p>
              <a href="${item.link}" target="_blank">View More</a>
            </div>
          `)
          : html`<p>No results found.</p>`
        }
      </div>

    `;
  }

  _analyze() {
    if (this.isValid) {
      this.updateResults(this.jsonURL);
    } else {
      alert("Please enter a valid search term.");
    }
  }

  inputChanged(e) {
    this.value = this.shadowRoot.querySelector('#input').value;
  }
  // life cycle will run when anything defined in `properties` is modified
  updated(changedProperties) {
    // see if value changes from user input and is not empty
    if (changedProperties.has('value') && this.value) {
      this.updateResults(this.value);
    }
    else if (changedProperties.has('value') && !this.value) {
      this.items = [];
    }
    // @debugging purposes only
    if (changedProperties.has('items') && this.items.length > 0) {
      console.log(this.items);
    }
  }

  updateResults(value) {
    this.loading = true;
    fetch(this.jsonURL).then(d => d.ok ? d.json(): {}).then(data => {
      if (data && Array.isArray(data.items)) {
        this.items = data.items.filter(item =>
          item.title.toLowerCase().includes(value.toLowerCase()) ||
          item.description.toLowerCase().includes(value.toLowerCase())
        )
      }  
    });
  }
}

globalThis.customElements.define(Project1.tag, Project1);