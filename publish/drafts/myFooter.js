class MyFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer class="bg-gray-800 text-white p-5">
            <div class="container mx-auto">
                <p class="text-center">© 2021 My Blog</p>
            </div>
        </footer>
        `;
    }
}
customElements.define('my-footer', MyFooter);
