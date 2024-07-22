const htmlContent = await fetch('templates.html').then((response) => response.text());
const dom = new DOMParser().parseFromString(htmlContent, 'text/html');
const headerTemplate = dom.getElementById('header-template');

class MyHeader extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: 'open'});
    }
    connectedCallback() {
        this.shadowRoot.appendChild(headerTemplate.content.cloneNode(true));
    }

}
customElements.define('my-header', MyHeader);

const footerTemplate = dom.getElementById('footer-template');

class MyFooter extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: 'open'});
    }
    connectedCallback() {
        this.shadowRoot.appendChild(footerTemplate.content.cloneNode(true));
    }
}
customElements.define('my-footer', MyFooter);
