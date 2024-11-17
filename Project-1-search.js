import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./Project-1-card.js";
import "./Project-1-overview.js";

export class Project1 extends DDDSuper(I18NMixin(LitElement)) {

  constructor() {
    super();
    this.title = '';
    this.value = '';
    this.items = [];
    this.loading = false;
    this.jsonURL = '';
    this.baseUrl = '';
    this.isValid = false;
    this.lastUpdated = '';
    this.data = null;
  }

  static get properties() {
    return {
        title: { type: String },
        value: { type: String },
        items: { type: Array },
        loading: { type: Boolean, reflect: true },
        jsonURL: { type: String, attribute: 'json-url' },
        baseUrl: { type: String },
        lastUpdated: { type: String },
        data: { type: Object }
    };
  }

  static get styles() {
    return [super.styles, css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .search-container {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
        display: flex;
        background-color: var(--ddd-theme-default-white);
        width: 100%;
        max-width: 600px;
        margin: 20px auto;
      }

      .results {
        display: flex;
        flex-wrap: wrap;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
        justify-content: center;
        width: 100%;
        margin-top: 20px;
      }

      input {
        border-radius: var(--ddd-radius-rounded);
        font-size: 1.5em;
        text-align: center;
        line-height: 40px;
        width: 100%;
      }

      .site-overview {
        justify-content: center;
        width: 100%;
        margin-top: 20px;
        text-align: center;
      }

      .project-card {
        flex: 1 1 300px;
      }

      .search-button button {
        background-color: var(--ddd-theme-default-wonderPurple);
        color: var(--ddd-theme-default-white);
        padding: var(--ddd-spacing-2, 8px);
        border-radius: var(--ddd-radius-sm);
        border: var(--ddd-border-sm);
        border-color: var(--ddd-theme-default-coalyGray);
        cursor: pointer;
        font-size: 1em;
        margin: 8px;
      }
    `];
  }

  render() {
    
    return html`
      <h2>${this.title}</h2>
      <div class="search-container">
        <input id="input" 
          class="analyze-input" 
          placeholder="Search HaxtheWeb" 
          @input="${this.onInputChange}"/>
        <div class="search-button"><button @click="${this.analyze}">Analyze</button></div>
      </div>

      <!-- Site Overview Section -->
       
      <div class="site-overview">
  ${this.data
    ? html`
      <project-overview
        title="${this.data.title}"
        description="${this.data.description}"
        logo="${this.data.metadata.site.logo}" 
        created="${this.formatDate(this.data.metadata?.site?.created)}"
        lastUpdated="${this.formatDate(this.data.metadata?.site?.updated)}"
        hexCode="${this.data.metadata?.theme?.variables?.hexCode}"
        theme="${this.data.metadata?.theme?.name}"
        baseURL="${this.baseUrl}"
      ></project-overview>
    `
    : html``
  }
</div>

      <!-- Search Results (Cards) -->
      <div class="results">
        ${this.items.map((item) => {
          const updated = item.metadata ? new Date(parseInt(item.metadata.updated) * 1000).toLocaleDateString() : '';
          const img = (item.metadata && item.metadata.files && item.metadata.files[0]) ? item.metadata.files[0].url : ''; 
          const readtime = item.metadata ? item.metadata.readtime : '';

          return html`
            <project-card
              title="${item.title}"
              description="${item.description}"
              logo="${img}"
              slug="${item.slug}"
              baseURL="${this.baseUrl}"
              lastUpdated="${updated}"
              location="${this.baseUrl}/${item.location}"
              readTime="${readtime}"
            ></project-card>
          `;
        })}
      </div>
    `;
  }

  onInputChange(e) {
    this.jsonURL = e.target.value;
  }

  analyze() {
    const inputUrl = this.shadowRoot.querySelector('#input').value;
    this.value = this.noJsonEnding(inputUrl) + '/site.json'; 
    this.updateResults(); 
  }

  updated(changedProperties) {
    if (changedProperties.has('value') && this.value) {
      this.updateResults(this.value);
    } else if (changedProperties.has('value') && !this.value) {
      this.items = [];
    }

    if (changedProperties.has('items') && this.items.length > 0) {
      console.log(this.items);
    }
  }

  noJsonEnding(url) {
    return url.replace(/\/[^/]*\.json$/, ''); 
  }

  updateResults() {
    this.loading = true;
    this.baseUrl = this.noJsonEnding(this.jsonURL); 
  
    fetch(this.value)
      .then((response) => response.ok ? response.json() : {})
      .then((data) => {
        if (data.items) {
          this.items = data.items;
          this.data = data;
        } else {
          this.items = [];
          this.data = null;
        }
        this.loading = false;
      })
      .catch(() => {
        this.items = [];
        this.loading = false;
      });
  }

  formatDate(date) {
    return date ? new Date(parseInt(date) * 1000).toLocaleDateString() : '';
  }

  static get tag() {
    return "project-1";
  }

}

globalThis.customElements.define(Project1.tag, Project1);
