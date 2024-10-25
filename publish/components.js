class AkhilHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <header>
        <div class="container">
          <nav style="display: flex; 
                justify-content: space-between; 
                margin-top: 1rem; 
                margin-bottom: 1rem;">
            <a href="/index">Home</a>
            <div style="display: flex; gap: 1rem;">
              <a href="/timeline/">Timeline</a>
              <a href="/guide/">Guides</a>
              <a href="/projects/">Projects</a>
              <a href="/about/">About</a>
              <a href="/resume-without-tailwind/">Resume</a>
            </div>
          </nav>
        </div>
    </header>
`;
  }
}

class AkhilFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <footer>
        <div class="container">
            <p style="text-align: center;">© 2024 Akhil N</p>
        </div>
    </footer>
`;
  }
}

customElements.define('akhil-header', AkhilHeader);
customElements.define('akhil-footer', AkhilFooter);


