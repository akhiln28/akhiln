class AkhilHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
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
              <a href="/resume.html">Resume</a>
            </div>
          </nav>
        `;
  }
}

class AkhilFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <footer>
        <div class="container">
          <div style="display: flex; flex-direction: row; align-items: center; justify-content: center; gap: 1rem">
            <a href="https://github.com/akhiln28" target="_blank">
              <img src="/github.svg" alt="github icon" height="16px" width="16px">
              <span>akhiln28</span>
            </a>
            <a href="https://www.linkedin.com/in/akhiln28/" target="_blank">
              <img src="/linkedin.svg" alt="linkedin icon" height="16px" width="16px">
              <span>akhiln28</span>
            </a>
          </div>
          <p style="text-align: center;">© 2024 Akhil N</p>
        </div>
    </footer>
`;
  }
}

customElements.define('akhil-header', AkhilHeader);
customElements.define('akhil-footer', AkhilFooter);


