const htmlContent = await fetch('templates.html').then((response) => response.text());
const template = (new DOMParser().parseFromString(htmlContent, 'text/html')).getElementById('footer-template');

class MyFooter extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: 'open'});
    }
    connectedCallback() {
        // this.innerHTML = `
        // <footer class="bg-gray-800 text-white p-5">
        //     <div class="container mx-auto">
        //         <p class="text-center">© 2021 My Blog</p>
        //     </div>
        // </footer>
        // `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}
customElements.define('my-footer', MyFooter);
