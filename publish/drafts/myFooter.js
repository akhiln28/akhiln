const styleString = `
/* Styles based on the book refactoring UI */
:host {
    /* Light theme colors */
    --color-bg: hsl(220, 0%, 100%);
    --color-text: hsl(220, 10%, 20%);
    --color-primary-0: hsl(220, 100%, 90%);
    --color-primary-1: hsl(220, 100%, 80%);
    --color-primary-2: hsl(220, 100%, 70%);
    --color-primary-3: hsl(220, 100%, 60%);
    --color-primary-4: hsl(220, 100%, 50%);
    --color-primary-5: hsl(220, 100%, 40%);
    --color-primary-6: hsl(220, 100%, 30%);
    --color-primary-7: hsl(220, 100%, 20%);
    --color-primary-8: hsl(220, 100%, 10%);

    --color-neutral-0: hsl(220, 0%, 90%);
    --color-neutral-1: hsl(220, 0%, 85%);
    --color-neutral-2: hsl(220, 0%, 70%);
    --color-neutral-3: hsl(220, 0%, 60%);
    --color-neutral-4: hsl(220, 0%, 50%);
    --color-neutral-5: hsl(220, 0%, 40%);
    --color-neutral-6: hsl(220, 0%, 30%);
    --color-neutral-7: hsl(220, 0%, 20%);

    /* Valid accent */
    --color-accent-green-0: hsl(120, 60%, 90%);
    --color-accent-green-1: hsl(120, 60%, 80%);
    --color-accent-green-2: hsl(120, 60%, 70%);
    --color-accent-green-3: hsl(120, 60%, 60%);
    --color-accent-green-4: hsl(120, 60%, 50%);
    --color-accent-green-5: hsl(120, 60%, 40%);
    --color-accent-green-6: hsl(120, 60%, 30%);
    --color-accent-green-7: hsl(120, 60%, 20%);

    /* Error accent */
    --color-accent-red-0: hsl(0, 100%, 90%);
    --color-accent-red-1: hsl(0, 100%, 80%);
    --color-accent-red-2: hsl(0, 100%, 70%);
    --color-accent-red-3: hsl(0, 100%, 60%);
    --color-accent-red-4: hsl(0, 100%, 50%);
    --color-accent-red-5: hsl(0, 100%, 40%);
    --color-accent-red-6: hsl(0, 100%, 30%);
    --color-accent-red-7: hsl(0, 100%, 20%);

    /* Warning accent */
    --color-accent-yellow-0: hsl(40, 100%, 90%);
    --color-accent-yellow-1: hsl(40, 100%, 80%);
    --color-accent-yellow-2: hsl(40, 100%, 70%);
    --color-accent-yellow-3: hsl(40, 100%, 60%);
    --color-accent-yellow-4: hsl(40, 100%, 50%);
    --color-accent-yellow-5: hsl(40, 100%, 40%);
    --color-accent-yellow-6: hsl(40, 100%, 30%);
    --color-accent-yellow-7: hsl(40, 100%, 20%);

    /* Font sizes */
    --font-size-xs: 0.75rem;
    --font-size-sm: 0.875rem;
    --font-size-md: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;

    /* Spacing */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
}

@media (prefers-color-scheme: dark) {
    :host {
        /* Dark theme colors */
        --color-bg: hsl(220, 10%, 10%);
        --color-text: hsl(220, 10%, 80%);
        --color-primary-0: hsl(220, 100%, 10%);
        --color-primary-1: hsl(220, 100%, 20%);
        --color-primary-2: hsl(220, 100%, 30%);
        --color-primary-3: hsl(220, 100%, 40%);
        --color-primary-4: hsl(220, 100%, 50%);
        --color-primary-5: hsl(220, 100%, 60%);
        --color-primary-6: hsl(220, 100%, 70%);
        --color-primary-7: hsl(220, 100%, 80%);
        --color-primary-8: hsl(220, 100%, 90%);

        /* Neutral colors */
        --color-neutral-0: hsl(220, 10%, 20%);
        --color-neutral-1: hsl(220, 10%, 25%);
        --color-neutral-2: hsl(220, 10%, 40%);
        --color-neutral-3: hsl(220, 10%, 50%);
        --color-neutral-4: hsl(220, 10%, 60%);
        --color-neutral-5: hsl(220, 10%, 70%);
        --color-neutral-6: hsl(220, 10%, 80%);
        --color-neutral-7: hsl(220, 10%, 90%);

        /* Valid accent */
        --color-accent-green-0: hsl(120, 60%, 20%);
        --color-accent-green-1: hsl(120, 60%, 30%);
        --color-accent-green-2: hsl(120, 60%, 40%);
        --color-accent-green-3: hsl(120, 60%, 50%);
        --color-accent-green-4: hsl(120, 60%, 60%);
        --color-accent-green-5: hsl(120, 60%, 70%);
        --color-accent-green-6: hsl(120, 60%, 80%);
        --color-accent-green-7: hsl(120, 60%, 90%);

        /* Error accent */
        --color-accent-red-0: hsl(0, 100%, 20%);
        --color-accent-red-1: hsl(0, 100%, 30%);
        --color-accent-red-2: hsl(0, 100%, 40%);
        --color-accent-red-3: hsl(0, 100%, 50%);
        --color-accent-red-4: hsl(0, 100%, 60%);
        --color-accent-red-5: hsl(0, 100%, 70%);
        --color-accent-red-6: hsl(0, 100%, 80%);
        --color-accent-red-7: hsl(0, 100%, 90%);

        /* Warning accent */
        --color-accent-yellow-0: hsl(40, 100%, 20%);
        --color-accent-yellow-1: hsl(40, 100%, 30%);
        --color-accent-yellow-2: hsl(40, 100%, 40%);
        --color-accent-yellow-3: hsl(40, 100%, 50%);
        --color-accent-yellow-4: hsl(40, 100%, 60%);
        --color-accent-yellow-5: hsl(40, 100%, 70%);
        --color-accent-yellow-6: hsl(40, 100%, 80%);
        --color-accent-yellow-7: hsl(40, 100%, 90%);
    }
}

:host {
    --container-max-width: 1200px;
}

/* Responsive adjustments */
@media (max-width: 640px) {
    :host {
        --container-max-width: 640px;
    }
}

@media (max-width: 768px) {
    :host {
        --container-max-width: 768px;
    }
}

@media (max-width: 1024px) {
    :host {
        --container-max-width: 1024px;
    }
}

@media (max-width: 1280px) {
    :host {
        --container-max-width: 1280px;
    }
}

@media (max-width: 1536px) {
    :host {
        --container-max-width: 1536px;
    }
}

/* Responsive container class i.e based on the screen width*/
.container {
    width: 100%;
    max-width: var(--container-max-width);
    margin-left: auto;
    margin-right: auto;
    padding-left: var(--spacing-md);
    padding-right: var(--spacing-md);
}

/* Global styles */
body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    font-size: var(--font-size-md);
    line-height: 1.5;
    color: var(--color-text);
    background-color: var(--color-bg);
    margin: 0;
    padding: 0;
}

main {
    padding-top: var(--spacing-lg);
    padding-bottom: var(--spacing-lg);
    width: var(--container-max-width);
    margin: 0 auto;
}

footer {
    padding-top: var(--spacing-lg);
    padding-bottom: var(--spacing-lg);
    background-color: var(--color-neutral-0);
    text-align: center;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    margin-top: var(--spacing-lg);
    margin-bottom: var(--spacing-md);
    line-height: 1.2;
}

h1 {
    font-size: var(--font-size-xl);
}

h2 {
    font-size: var(--font-size-lg);
}

h3 {
    font-size: var(--font-size-md);
}

h4,
h5,
h6 {
    font-size: var(--font-size-sm);
}

p {
    margin-bottom: var(--spacing-md);
}

a {
    color: var(--color-primary-5);
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

/* Form elements */
input,
textarea,
select {
    font-size: var(--font-size-md);
    padding: var(--spacing-xs) var(--spacing-sm);
    border: 1px solid var(--color-neutral-1);
    background-color: var(--color-neutral-1);
    border-radius: 4px;
    color: var(--color-text);
    box-shadow: inset 0 1px 2px var(--color-neutral-1);
    transition:
        background-color 0.2s,
        border-color 0.2s;
}

input:focus,
textarea:focus,
select:focus {
    border-color: var(--color-primary-5);
    background-color: var(--color-neutral-0);
    box-shadow: 0 0 0 2px var(--color-primary-5);
}

button {
    font-size: var(--font-size-md);
    padding: var(--spacing-xs) var(--spacing-md);
    background-color: var(--color-primary-3);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

button:hover {
    background-color: var(--color-primary-4);
}

/* Lists */
ul,
ol {
    margin-bottom: var(--spacing-md);
    padding-left: var(--spacing-lg);
}

/* Table */
table {
    border-collapse: collapse;
    width: 100%;
    margin-bottom: var(--spacing-md);
}

th,
td {
    border: 1px solid var(--color-muted);
    padding: var(--spacing-xs) var(--spacing-sm);
    text-align: left;
}

th {
    background-color: var(--color-neutral-0);
    font-weight: bold;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    :host {
        --font-size-xl: 1.125rem;
        --font-size-lg: 1rem;
        --font-size-md: 0.875rem;
        --font-size-sm: 0.75rem;
        --font-size-xs: 0.675rem;
    }

    body {
        font-size: var(--font-size-sm);
    }
}
`;

class MyFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <style>
            ${styleString}
        </style>
        <footer>
            <p style="text-align: center;">© 2024 Akhil N</p>
        </footer>
        `;
    }
}
customElements.define('my-footer', MyFooter);
