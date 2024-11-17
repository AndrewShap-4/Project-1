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
    this.lastUpdated = '';
    this.location = '';
    this.readTime = '';
    this.topLevel = false;
    this.theme = '';
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
        location: { type: String },
        readTime: { type: String },
        topLevel: {type: Boolean, reflect: true, attribute: "top-level"},
        theme: {type: String},
      };
  }

  static get styles() {
    return [super.styles, css`
      .card {
        display: inline-flex;
        flex-direction: column;
        border: var(--ddd-border-md);
        border-color: var(--ddd-theme-default-coalyGray);
        align-items: center;
        background-color: var(--ddd-theme-default-white);
        width: 300px;
        margin: 10px;
        padding: 10px;
        height: 550px;
      }
      
  
      .image-container {
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
        border-radius: 8px;
        height: 150px;
      }
  
      .title {
        font-size: 1.3em;
        margin-bottom: 8px;
      }
  
      .visit-website button {
        background-color: var(--ddd-theme-default-beaver70);
        color: var(--ddd-theme-default-white);
        padding: var(--ddd-spacing-1, 4px);
        margin: var(--ddd-spacing-1);
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1em;
      }
  
      .visit-website button:hover {
        background-color: var(--ddd-theme-default-nittanyNavy);
      }

      .description {
        font-size: 1em;
        color: var(--ddd-theme-default-coalyGray);
        padding: var(--ddd-spacing-2, 8px);
      }

      .read-time {
        font-size: 1em;
        color: var(--ddd-theme-default-coalyGray);
        padding: var(--ddd-spacing-1, 4px);
      }


      .visit-source button {
        background-color: var(--ddd-theme-default-beaver70);
        color: var(--ddd-theme-default-white);
        padding: var(--ddd-spacing-1, 4px);
        margin: var(--ddd-spacing-1);
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1em;
      }
  
      .visit-source button:hover {
        background-color: var(--ddd-theme-default-nittanyNavy);
      }

      .button-container {
      display: flex;
      gap: 10px; 
      margin-top: 6px;
    }

      .last-updated {
        font-size: 1em;
        color: var(--ddd-theme-default-coalyGray);
        padding: var(--ddd-spacing-1);
      }

    `];
  }
  
  render() {
    
    if (this.logo == '') {
      this.logo = "/files/HAX.psu%20World%20changer-circle1.png";
    }
    
    const logoURL = this.logo ? `${this.baseURL}/${this.logo}` : "/files/HAX.psu%20World%20changer-circle1.png";

    return html`
    
    <div class="card"
        tabindex="0">
    <div class="image-container">
        <a href="${logoURL}" target="_blank">
        <img src="${this.baseURL}/${this.logo}" alt="${this.title}" /></a>
    </div>
    <div class="title"><strong>${this.title}</strong></div>
    <div class="description"><strong>Description:</strong> ${this.description}</div>
    <div class="last-updated"><strong>Last Updated:</strong> ${this.lastUpdated}</div>
    <div class="read-time"><strong>Read Time(Minutes):</strong> ${this.readTime}</div>
    <div class="button-container">
    <a href="${this.baseURL+'/'+this.slug}"
        target="_blank"><div class="visit-website"><button @click="${this.visitWebsite}">Visit Website</button></div></a>
        <a href="${this.location}"
        target="_blank"><div class="visit-source"><button @click="${this.visitSource}">Visit Source</button></div></a>
    </div>
  </div>
    `;
  }

  visitWebsite(e) {
    this.value = this.shadowRoot.querySelector('#input').value;
  }

  visitSource(e) {
    this.value = this.shadowRoot.querySelector('#input').value;
  }

  static get tag() {
    return "project-card";
  }

}


customElements.define(ProjectCard.tag, ProjectCard);



