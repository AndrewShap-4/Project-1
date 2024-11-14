import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class ProjectCard extends DDDSuper(LitElement) {

  constructor() {
    super();
    this.title = '';
    this.description = '';
    this.created = '';
    this.lastUpdated = '';
    this.logo = '';
    this.slug = 'google.com';
    this.baseURL = 'google.com';
  }

  static get properties() {
    return {
        title: { type: String },
        description: { type: String },
        created: { type: String },
        lastUpdated: {type: String },
        logo: { type: String },
        slug: { type: String },
        baseURL: { type: String },
    };
  }

  static get styles() {
    return [super.styles, css`
      .card {
        display: inline-flex;
        flex-direction: column;
        border: var(--ddd-border-md);
        align-items: center;
        background-color: #f9f9f9;
        width: 200px;
        margin: 10px;
        padding: 10px;
      }
  
      .image-container {
        border: var(--ddd-border-sm);
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 16px;
      }
  
      img {
        max-width: 100%;
        height: auto;
        object-fit: cover;
        border-radius: 8px;
      }
  
      .info {
        font-size: 1.2em;
        margin-bottom: 8px;
      }
  
      .text {
        font-size: 1em;
        color: #333;
      }

      .last-updated {
        font-size: 0.9em;
        color: #888;
        margin-top: 8px;
      }
  
      .visit-website button {
        background-color: red;
        color: white;
        padding: 8px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1em;
      }
  
      .visit-website button:hover {
        background-color: darkred;
      }
    `];
  }

  render() {
    return html`
      <div class="card" tabindex="0">
        <div class="image-container">
          <img src="${this.baseURL}/${this.logo}" alt="${this.title}" />
        </div>
        <div class="info">${this.title}</div>
        <div class="text">${this.description}</div>
        
        <!-- Updated link to open index.html -->
        <a href="${this.baseURL}/index.html" target="_blank">
          <div class="visit-website">
            <button>Visit Website</button>
          </div>
        </a>

        <!-- Display last updated date -->
        ${this.lastUpdated ? html`<div class="last-updated">Last updated: ${this.lastUpdated}</div>` : ''}
      </div>
    `;
  }

  static get tag() {
    return "project-card";
  }

}

customElements.define(ProjectCard.tag, ProjectCard);
