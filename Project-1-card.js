import { LitElement, html, css } from "lit";

export class ProjectCard extends LitElement {

  constructor() {
    super();
    this.title = '';
    this.description = '';
    this.created = '';
    this.lastUpdated = '';
    this.logo = '';
    this.slug = '';
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
    return [super.styles,css`

    .card {
        display: inline-flex;
        border: var(--ddd-border-md);
        align-items: center;
        background-color: #f9f9f9;
        width: 100%;
    }

    .image-container {
        border: var(--ddd-border-xs);
        width: 100%;
        display: inline-flex;
        align-items: center;
        margin-bottom: 16px;
    }

    `];
  }

  render() {
    return html`
    <a class="card"
        tabindex="0"
        href="${this.baseURL+'/'+this.slug}"
        target="_blank"
    >

    <div class="image-container">
        <img src="${this.baseURL}/${this.logo}" alt="${this.title}">
    </div>
    <div class="info"> ${this.title}</div>
    <div class="text">${this.description}</div>
    </a>
    `;
  }


  static get tag() {
    return "project-card";
  }

}


customElements.define(ProjectCard.tag, ProjectCard);



