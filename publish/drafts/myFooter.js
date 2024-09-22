class MyFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
                margin-top: 2rem;
                --background-color: #333;
                color: white;
            }
            :host (prefers-color-scheme: dark) {
                --background-color: white;
                color: #333;
            }
            footer {
                background-color: var(--background-color);
                padding: 2rem;
            }
        </style>
        <footer style="background-color: #333; padding: 2rem;">
            <div class="container mx-auto">
                <p style="text-align: center;">© 2024 Akhil N</p>
            </div>
        </footer>
        `;
    }
}
customElements.define('my-footer', MyFooter);
