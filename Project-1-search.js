import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./Project-1-card.js";

export class Project1 extends DDDSuper(I18NMixin(LitElement)) {

  constructor() {
    super();
    this.title = '';
    this.value = '';
    this.items = [];
    this.loading = false;
    this.jsonURL = 'https://haxtheweb.org/site.json';
    this.baseUrl = this.noJsonEnding(this.jsonURL);
    this.isValid = false;
    this.lastUpdated = '';

    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/Project-1-search.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
    }

    static get properties() {
      return {
          title: { type: String },
          value: { type: String },
          items: { type: Array },
          loading: {type: Boolean, reflect: true },
          jsonURL: { type: String, attribute: 'json-url' },
          baseUrl: { type: String },
          lastUpdated: { type: String },
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
      display: flex;
      flex-wrap: wrap;
      gap: 20px; /* Space between cards */
      justify-content: center; /* Centers cards horizontally */
      width: 100%;
      margin-top: 20px;
    }
        
        input {
          font-size: 20px;
          line-height: 40px;
          width: 100%;
        }

        .project-card {
          flex: 1 1 300px;
        }
      `];
    }
    

    render() {
      return html`
        <h2>${this.title}</h2>
        <div class="search-container">
          <input id="input" 
          class="analyze-input" 
          placeholder="Search HaxtheWeb" />
          <div class="search-button"><button @click="${this.analyze}">Analyze</button></div>
        </div>
        <div class="results">
            ${this.items.map((item)=> {
            const updated = item.metadata ? new Date(parseInt(item.metadata.updated) * 1000).toLocaleDateString() : '';
            const img = (item.metadata && item.metadata.files && item.metadata.files[0]) ? item.metadata.files[0].url : ''; 
          
              return html`
              <project-card
                title="${item.title}"
                description="${item.description}"
                logo="${img}"
                slug="${item.slug}"
                baseURL="${this.baseUrl}"
                lastUpdated="${updated}"
              ></project-card>
           `;
            })}
        </div>
    `;
  }

  
    
  analyze(e) {
    this.value = this.shadowRoot.querySelector('#input').value;
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

  updateResults() {
    this.loading = true;
    this.baseURL = this.noJsonEnding(this.jsonURL);

    fetch(this.value)
      .then((response) => response.ok ? response.json() : {})
      .then((data) => {
        // Check if data.items exists and contains at least one item with the required properties             
          this.items = data.items;                         
          this.loading = false;                
      });
    }

    static get tag() {
      return "project-1";
    }

}

globalThis.customElements.define(Project1.tag, Project1);
