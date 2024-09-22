class MyHeader extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: 'open'});
    }
    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
                margin-bottom: 2rem;
                --background-color: white;
            }
            :host (prefers-color-scheme: dark) {
                --background-color: #333;
            }

            header {
                background-color: var(--background-color);
                box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
                padding: 16px;
            }

            .logo {
                font-size: 24px;
                font-weight: bold;
                color: #333;
            }
            nav {
                display: flex;
                justify-content: flex-end;
                margin-top: 1rem;
                gap: 2rem;
            }
            .nav-item {
                margin-left: 16px;
            }

            .nav-link {
                color: #666;
                text-decoration: none;
            }

            .nav-link:hover {
                color: #000;
            }
        </style>

        <header>
            <div style="max-width: 960px; margin: 0 auto;">
                <div class="logo">My Blog</div>
                <nav>
                    <slot name="nav-items">
                        <a href="index.html" class="nav-link">Home</a>
                        <a href="tech.html" class="nav-link">Tech</a>
                        <a href="lifestyle.html" class="nav-link">Lifestyle</a>
                        <a href="travel.html" class="nav-link">Travel</a>
                        <a href="about.html" class="nav-link">About</a>
                    </slot>
                </nav>
            </div>
        </header>
        `;
    }

}
customElements.define('my-header', MyHeader);
