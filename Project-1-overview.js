import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";


export class ProjectOverview extends DDDSuper(LitElement) {

  constructor() {
    super();
    this.title = '';
    this.description = '';
    this.created = '';
    this.logo = '';
    this.baseURL = '';
    this.lastUpdated = '';
    this.theme = '';
    this.hexCode = '';
  }

  static get properties() {
    return {
        title: { type: String },
        description: { type: String },
        created: { type: String },
        lastUpdated: {type: String },
        logo: { type: String },
        baseURL: { type: String },
        theme: {type: String},
        hexCode: { type: String },
      };
  }

  static get styles() {
    return [super.styles, css`
      .overview-card {
        display: inline-flex;
        flex-direction: column;
        border: var(--ddd-border-md);
        border-color: var(--ddd-theme-default-coalyGray);
        align-items: center;
        background-color: var(--site-hex-code, --ddd-theme-accent);
        width: 550px;
        margin: 10px;
        padding: 10px;
        height: 350px;
      }
      
  
      .image-overview {
        border: var(--ddd-border-xs);
        border-color: var(--ddd-theme-default-coalyGray);
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 16px;
      }
  
      img {
        width: 200px;
        height: auto;
        object-fit: cover;
        padding: var(--ddd-spacing-1);
        height: 125px;
      }
  
      .title {
        font-size: 1.3em;
        padding: var(--ddd-spacing-1);
        color: var(--ddd-theme-default-coalyGray);
      }

      .description {
        font-size: 1em;
        color: var(--ddd-theme-default-coalyGray);
        padding: var(--ddd-spacing-2, 8px);
      }


      .last-updated {
        font-size: 1em;
        color: var(--ddd-theme-default-coalyGray);
        padding: var(--ddd-spacing-1);
      }

      .last-created {
        font-size: 1em;
        color: var(--ddd-theme-default-coalyGray);
        padding: var(--ddd-spacing-1);
      }

      .theme {
        font-size: 1em;
        color: var(--ddd-theme-default-coalyGray);
        padding: var(--ddd-spacing-1);
      }

    `];
  }
  
  render() {
    return html`
    
    <div class="overview-card"
        tabindex="0"
        style="--site-hex-code: ${this.hexCode};">
    <div class="image-overview">
        <a href="${this.baseURL}/${this.logo}" target="_blank">
        <img src="${this.baseURL}/${this.logo}" alt="${this.title}" /></a>
    </div>
    <a href="${this.baseURL}" target="_blank"><div class="title"><strong>${this.title}</strong></div></a>
    <div class="description"><strong>Description:</strong> ${this.description}</div>
    <div class="created"><strong>Created:</strong> ${this.created}</div>
    <div class="last-updated"><strong>Last Updated:</strong> ${this.lastUpdated}</div>
    <div class="theme"><strong>Theme:</strong> ${this.theme}</div>
  </div>
    `;
  }


  static get tag() {
    return "project-overview";
  }

}


customElements.define(ProjectOverview.tag, ProjectOverview);