import { JSDOM } from 'jsdom';
import walkdir from 'walkdir';
import fs from 'fs';
import { command } from 'commander';

const program = new command();

program
  .option('-d, --dir <dir>', 'Directory to search for HTML files')
  .option('-f, --function <function>', 'Function to apply to each file')
  .parse(process.argv);

program
  .command('update-all')
  .description('Update all html files, by applying the function to each file')
  .action(() => {
    let dir = program.dir || './';
    let funcName = program.function;
    let func = eval(funcName);
    if (!func) {
      console.error('Error: --function option is required');
      process.exit(1);
    }
    applyToAllFiles(dir, func);
  });

// Function to update the header in an HTML file
function updateNavBar(file) {
  const html = fs.readFileSync(file, 'utf8');
  const dom = new JSDOM(html);

  // Define the new header content
  const newNav = `
  <nav style = "display: flex; justify-content: space-between; margin-top: 1rem; margin-bottom: 1rem;" >
    <a href="/index">Home</a>
    <div style="display: flex; gap: 1rem;">
      <a href="/timeline/">Timeline</a>
      <a href="/guide/">Guides</a>
      <a href="/projects/">Projects</a>
      <a href="/about/">About</a>
      <a href="/resume/">Resume</a>
    </div>
  </nav >
  `;

  const document = dom.window.document;
  const header = document.querySelector('header');
  if (header) {
    header.innerHTML = newNav;
    fs.writeFileSync(file, dom.serialize());
  }
}

// Function to apply the update to all HTML files in the directory
function applyToAllFiles(dir, func) {
  walkdir.sync(dir, (path) => {
    if (path.endsWith('.html')) {
      func(path);
    }
  });
}

// Apply the updateHeader function to all HTML files in the current directory
applyToAllFiles('./', (file) => {
  updateNavBar(file, newHeader);
});


