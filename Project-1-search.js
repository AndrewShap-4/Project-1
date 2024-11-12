import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

export class Project1 extends DDDSuper(I18NMixin(LitElement)) {

  constructor() {
    super();
    this.title = '';
    this.value = '';
    this.items = [];
    this.loading = false;
    this.jsonURL = 'https://haxtheweb.org/site.json';
    this.baseURL = this.noJsonEnding(this.jsonURL);
    this.isValid = false;
    }

    static get properties() {
      return {
          title: { type: String },
          value: { type: String },
          items: { type: Array },
          loading: {type: Boolean, reflect: true },
          jsonURL: { type: String, attribute: 'json-url' },
          baseURL: { type: String },
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
          background-color: #fff;
          width: 100%;
          max-width: 600px;
          margin: 20px auto;
        }
    
        .results {
          visibility: visible;
          height: 100%;
          opacity: 1;
        }
        
        input {
          font-size: 20px;
          line-height: 40px;
          width: 100%;
        }
      `];
    }
    

    render() {
      return html`
        <h2>${this.title}</h2>
        <div class="search-container">
          <input id="input" 
          class="analyze-input" 
          placeholder="Search HaxtheWeb">
          <div class="search-button"><button @click="${this.analyze}">Analyze</button></div>
        </div>
        <div class="results">
          ${this.items.map((item) => {
            const img = item.metadata && item.metadata.files && item.metadata.files[0] ? item.metadata.files[0] : '';
            
            return html`
              <project-card
                title="${item.title}"
                description="${items.description}"
                logo="${img}"
                slug="${item.slug}"
                baseURL="${this.baseURL}"
              ></project-card>
            `;
          })}
        </div>
      `;
    }
    

    analyze(e) {
      const inputValue = this.shadowRoot.querySelector('#input').value;
      if (inputValue) {
        this.jsonURL = inputValue;
        this.updateResults(inputValue);
      } else {
        console.warn('Input is empty; fetch not initiated.');
      }
    }

  updated(changedProperties) {
    if (changedProperties.has('value')) {
      this.updateResults(this.value);
    } else if (changedProperties.has('value') && !this.value) {
      this.items = [];
    }
    if (changedProperties.has('items') && this.items.length > 0) {
      console.log(this.items);
    }
  }

  noJsonEnding(url) {
    return url.replace(/\/?[^\/]*\.json$/, '');
  }

  updateResults(value) {
    this.loading = true;
    this.baseURL = this.noJsonEnding(this.jsonURL);
    fetch(this.jsonURL).then(d => d.ok ? d.json(): {}).then(data => {
      if (data && Array.isArray(data.items)) {
        this.items = data.items.filter(item =>
          item.title.toLowerCase().includes(value.toLowerCase()) ||
          item.description.toLowerCase().includes(value.toLowerCase())
        );
      }  
      this.loading = false;
    });
  }


  static get tag() {
    return "project-1";
  }

}

globalThis.customElements.define(Project1.tag, Project1);