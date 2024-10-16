// Custom element whose style is copied from global.css 
const styleString = `
/* Styles based on the book refactoring UI */
:root {
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
  :root {
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

:root {
  --container-max-width: 1024px;
}

@media (min-width: 640px) {
  :root {
    --container-max-width: 640px;
  }
}

@media (min-width: 768px) {
  :root {
    --container-max-width: 768px;
  }
}

@media (min-width: 1024px) {
  :root {
    --container-max-width: 1024px;
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
  max-width: var(--container-max-width);
  margin: auto;
  color: var(--color-text);
  background-color: var(--color-bg);
  padding: 0;
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

code {
  /* Preserves whitespace and line breaks */
  white-space: pre;
  font-size: var(--font-size-xs);
  background-color: var(--color-neutral-1);
  padding: var(--spacing-xs);
  border: 1px solid var(--color-neutral-2);
  border-radius: 0.5rem;
  font-family: monospace;
}

blockquote {
  margin-left: 0;
  padding-left: var(--spacing-md);
  padding-top: var(--spacing-xs);
  padding-bottom: var(--spacing-xs);
  background-color: var(--color-neutral-0);
  border-left: 0.5rem solid var(--color-primary-5);
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
  background-color: var(--color-neutral-0);
}

/* Utility classes */
.primary-0 {
  background-color: var(--color-primary-0);
}

.primary-1 {
  background-color: var(--color-primary-1);
}

.primary-2 {
  background-color: var(--color-primary-2);
}

.primary-3 {
  background-color: var(--color-primary-3);
}

.primary-4 {
  background-color: var(--color-primary-4);
}

.primary-5 {
  background-color: var(--color-primary-5);
}

.primary-6 {
  background-color: var(--color-primary-6);
}

.primary-7 {
  background-color: var(--color-primary-7);
}

.neutral-0 {
  background-color: var(--color-neutral-0);
}

.neutral-1 {
  background-color: var(--color-neutral-1);
}

.neutral-2 {
  background-color: var(--color-neutral-2);
}

.neutral-3 {
  background-color: var(--color-neutral-3);
}

.neutral-4 {
  background-color: var(--color-neutral-4);
}

.neutral-5 {
  background-color: var(--color-neutral-5);
}

.neutral-6 {
  background-color: var(--color-neutral-6);
}

.neutral-7 {
  background-color: var(--color-neutral-7);
}

.accent-green-0 {
  background-color: var(--color-accent-green-0);
}

.accent-green-1 {
  background-color: var(--color-accent-green-1);
}

.accent-green-2 {
  background-color: var(--color-accent-green-2);
}

.accent-green-3 {
  background-color: var(--color-accent-green-3);
}

.accent-green-4 {
  background-color: var(--color-accent-green-4);
}

.accent-green-5 {
  background-color: var(--color-accent-green-5);
}

.accent-green-6 {
  background-color: var(--color-accent-green-6);
}

.accent-green-7 {
  background-color: var(--color-accent-green-7);
}

.accent-red-0 {
  background-color: var(--color-accent-red-0);
}

.accent-red-1 {
  background-color: var(--color-accent-red-1);
}

.accent-red-2 {
  background-color: var(--color-accent-red-2);
}

.accent-red-3 {
  background-color: var(--color-accent-red-3);
}

.accent-red-4 {
  background-color: var(--color-accent-red-4);
}

.accent-red-5 {
  background-color: var(--color-accent-red-5);
}

.accent-red-6 {
  background-color: var(--color-accent-red-6);
}

.accent-red-7 {
  background-color: var(--color-accent-red-7);
}

.accent-yellow-0 {
  background-color: var(--color-accent-yellow-0);
}

.accent-yellow-1 {
  background-color: var(--color-accent-yellow-1);
}

.accent-yellow-2 {
  background-color: var(--color-accent-yellow-2);
}

.accent-yellow-3 {
  background-color: var(--color-accent-yellow-3);
}

.accent-yellow-4 {
  background-color: var(--color-accent-yellow-4);
}

/* Add more specific styles as needed */
#loading-bar {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: var(--color-primary-5);
  animation: loading 1s linear infinite;
}

@keyframes loading {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}
`;
class MyHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = `
    <style>
       ${styleString}
    </style>

    <header>
        <div class="container">
            <nav>
                <slot name="nav-items">
                    <a href="index.html" class="nav-link">Home</a>
                    <a href="tech.html" class="nav-link">Tech</a>
                    <a href="science.html" class="nav-link">Science</a>
                    <a href="about.html" class="nav-link">About</a>
                    <a href="resume.html" class="nav-link">Resume</a>
                </slot>
            </nav>
        </div>
    </header>
`;
  }

}

customElements.define('my-header', MyHeader);
