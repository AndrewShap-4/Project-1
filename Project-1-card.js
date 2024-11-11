import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

// Extend Project1 with DDDSuper for drag-and-drop capabilities
export class Project1 extends DDDSuper(LitElement) {
  constructor() {
    super();
    this.title = '';
    this.description = '';
    this.created = '';
    this.lastUpdated = '';
    this.logo = '';
    this.slug = 'https://haxtheweb.org';
  }

  static get properties() {
    return {
      title: { type: String },
      description: { type: String },
      created: { type: String },
      lastUpdated: { type: String },
      logo: { type: String },
      slug: { type: String },
    };
  }

  static get styles() {
    return [
      super.styles, // Inherit styles from DDDSuper
      css`
        :host {
          display: inline-block;
          margin: 16px;
          padding: 16px;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
          background-color: #fff;
          cursor: move;
          transition: box-shadow 0.3s ease;
        }
        :host(:hover) {
          box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.2);
        }
        img {
          max-width: 100px;
          border-radius: 50%;
          margin-bottom: 8px;
        }
        h3 {
          margin: 0;
          font-size: 1.2em;
        }
        p {
          font-size: 0.9em;
          color: #666;
        }
        a {
          display: inline-block;
          margin-top: 8px;
          font-size: 0.9em;
          color: #0073e6;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      `,
    ];
  }

  render() {
    const { title, description, logo, slug } = this.item;

    return html`
      <!-- The DDDSuper container manages drag events -->
      <d-d-d draggable="true" @dragend="${this._onDragEnd}">
        <div class="card" @click="${() => window.open(slug, '_blank')}">
          <img src="${logo || ''}" alt="${title}" />
          <h3>${title}</h3>
          <p>${description || 'No description available'}</p>
          <a href="${slug}" target="_blank">View More</a>
        </div>
      </d-d-d>
    `;
  }

  _onDragEnd(event) {
    // Handle the drag-end event, like saving the new position
    this.dispatchEvent(new CustomEvent("card-drag-end", {
      detail: { position: event.target.position }
    }));
  }
}

customElements.define("project-1", Project1);


