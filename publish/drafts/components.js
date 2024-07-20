class MyArticle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.fetchArticleData();
  }

  render(date = 'Loading...') {
    const src = this.getAttribute('src');
    const title = this.getAttribute('title');

    this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            margin-bottom: 1rem;
          }
          a {
            display: block;
            padding: 1rem;
            background-color: white;
            border-radius: 0.25rem;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
            text-decoration: none;
            color: inherit;
            transition: box-shadow 0.3s ease;
          }
          a:hover {
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }
          h3 {
            font-size: 1.25rem;
            font-weight: 600;
            margin: 0 0 0.5rem 0;
          }
          p {
            color: #4B5563;
            margin: 0;
          }
        </style>
        <a href="${src}">
          <h3>${title}</h3>
          <p>Posted on ${date}</p>
        </a>
      `;
  }

  async fetchArticleData() {
    const src = this.getAttribute('src');
    try {
      const response = await fetch(src);
      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      const metaDate = doc.querySelector('meta[name="date"]');
      if (metaDate) {
        const date = new Date(metaDate.getAttribute('content'));
        this.render(date.toLocaleDateString());
      } else {
        this.render('Date not found');
      }
    } catch (error) {
      console.error('Error fetching article data:', error);
      this.render('Error loading date');
    }
  }
}

customElements.define('my-article', MyArticle);

// Utility function to load template
async function loadTemplate(url) {
  const response = await fetch(url);
  const text = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, 'text/html');
  return doc.querySelector('template');
}

async function loadStyles(url) {
  const response = await fetch(url);
  const text = await response.text();
  const style = document.createElement('style');
  style.textContent = text;
  return style;
}

// Header Component
class MyHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    const [template, style] = await Promise.all([
      loadTemplate('header-template.html'),
      loadStyles('output.css')
    ]);
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

// Footer Component
class MyFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    const [template, style] = await Promise.all([
      loadTemplate('footer-template.html'),
      loadStyles('output.css')
    ]);
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('my-header', MyHeader);
customElements.define('my-footer', MyFooter);