const htmlContent = await fetch('templates.html').then((response) => response.text());
const template = (new DOMParser().parseFromString(htmlContent, 'text/html')).getElementById('header-template');

console.log(template)

class MyHeader extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: 'open'});
    }
    connectedCallback() {
        // this.innerHTML = `
        // <header class="bg-white shadow">
        //     <div class="container mx-auto px-6 py-4">
        //         <div class="flex justify-between items-center">
        //             <h1 class="text-3xl font-bold text-gray-800">My Blog</h1>
        //             <nav>
        //                 <ul class="flex space-x-4">
        //                     <li><a href="index.html" class="text-gray-600 hover:text-gray-800">Home</a></li>
        //                     <li><a href="tech.html" class="text-gray-600 hover:text-gray-800">Tech</a></li>
        //                     <li><a href="lifestyle.html" class="text-gray-600 hover:text-gray-800">Lifestyle</a></li>
        //                     <li><a href="travel.html" class="text-gray-600 hover:text-gray-800">Travel</a></li>
        //                     <li><a href="about.html" class="text-gray-600 hover:text-gray-800">About</a></li>
        //                 </ul>
        //             </nav>
        //         </div>
        //     </div>
        // </header>
        // `
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

}
customElements.define('my-header', MyHeader);
