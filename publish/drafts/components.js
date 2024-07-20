// Base Component class
class BaseComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async loadTemplate(url) {
    const response = await fetch(url);
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    return doc.querySelector('template');
  }

  async loadStyles(url) {
    const response = await fetch(url);
    const text = await response.text();
    const style = document.createElement('style');
    style.textContent = text;
    return style;
  }

  async render(templateUrl, styleUrl) {
    console.log('Rendering', this.constructor.name);
    this.shadowRoot.innerHTML = '<div>Loading...</div>';
    const [template, style] = await Promise.all([
      this.loadTemplate(templateUrl),
      this.loadStyles(styleUrl)
    ]);
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.afterRender();
  }

  afterRender() {
    // Hook for post-render operations
  }
}

// Header Component
class MyHeader extends BaseComponent {
  connectedCallback() {
    this.render('header-template.html', 'output.css');
  }
}

// Footer Component
class MyFooter extends BaseComponent {
  connectedCallback() {
    this.render('footer-template.html', 'output.css');
  }
}

// Article Component
class MyArticle extends BaseComponent {
  static get observedAttributes() {
    return ['src', 'title'];
  }

  connectedCallback() {
    this.render('article-template.html', 'output.css');
  }

  afterRender() {
    this.updateContent();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this.shadowRoot) {
      this.updateContent();
    }
  }

  async updateContent() {
    const title = this.getAttribute('title');
    const src = this.getAttribute('src');
    const titleElement = this.shadowRoot.querySelector('.article-title');
    const dateElement = this.shadowRoot.querySelector('.article-date');
    const articleLinkElement = this.shadowRoot.querySelector('.article-link');

    if (titleElement) titleElement.textContent = title;

    if (src) {
      try {
        const response = await fetch(src);
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const metaDate = doc.querySelector('meta[name="date"]');
        if (metaDate && dateElement) {
          const date = new Date(metaDate.getAttribute('content'));
          dateElement.textContent = `Posted on ${date.toLocaleDateString()}`;
        }
        articleLinkElement.href = src;
      } catch (error) {
        console.error('Error fetching article data:', error);
        if (dateElement) dateElement.textContent = 'Error loading date';
      }
    }
  }
}

// Blog Post List Component
class MyBlogPostList extends BaseComponent {
  connectedCallback() {
    this.render('blog-post-list-template.html', 'output.css');
  }

  afterRender() {
    const posts = [
      { title: 'First Post', src: 'posts/first-post.html' },
      { title: 'Second Post', src: 'posts/second-post.html' },
      // Add more posts as needed
    ];

    const container = this.shadowRoot.querySelector('.post-list');
    posts.forEach(post => {
      const article = document.createElement('my-article');
      article.setAttribute('title', post.title);
      article.setAttribute('src', post.src);
      container.appendChild(article);
    });
  }
}

// Define custom elements
customElements.define('my-header', MyHeader);
customElements.define('my-footer', MyFooter);
customElements.define('my-article', MyArticle);
customElements.define('my-blog-post-list', MyBlogPostList);

// Preload all templates and styles
async function preloadResources() {
  console.log("Preloading resources...");
  const components = [MyHeader, MyFooter, MyArticle, MyBlogPostList];
  await Promise.all(components.map(async (Component) => {
    if (Component.templateUrl) await loadTemplate(Component.templateUrl);
    if (Component.styleUrl) await loadStyles(Component.styleUrl);
  }));
}

// Call preloadResources before the window loads
preloadResources();