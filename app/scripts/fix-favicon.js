// Script to ensure favicon works on GitHub Pages (which serves under /Ecommerce/ path)
// 1. Copy the configured favicon image into dist/favicon.png and dist/favicon.ico (same image)
// 2. Replace any absolute /favicon.ico links with ./favicon.png for relative resolution

const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const srcFavicon = path.join(__dirname, '..', 'assets', 'images', 'icon.png');
const targetPng = path.join(distDir, 'favicon.png');
const targetIco = path.join(distDir, 'favicon.ico');

function ensureDist() {
  if (!fs.existsSync(distDir)) {
    console.error('Dist folder not found. Run build first.');
    process.exit(1);
  }
}

function copyFiles() {
  fs.copyFileSync(srcFavicon, targetPng);
  // Duplicate png as ico fallback (GitHub Pages requests /favicon.ico by default)
  fs.copyFileSync(srcFavicon, targetIco);
}

function patchHtmlFiles() {
  const files = fs.readdirSync(distDir).filter(f => f.endsWith('.html'));
  files.forEach(file => {
    const full = path.join(distDir, file);
    let html = fs.readFileSync(full, 'utf8');
    // Replace href="/favicon.ico" with href="./favicon.png" preserving other attributes
    html = html.replace(
      /href=("|')\/favicon\.ico("|')/g,
      'href="./favicon.png"'
    );
    // Also add <link rel="icon" type="image/png" ...> if not present
    if (!/favicon\.png/.test(html)) {
      html = html.replace(
        /<head>/i,
        '<head>\n    <link rel="icon" type="image/png" href="./favicon.png" />'
      );
    }
    fs.writeFileSync(full, html, 'utf8');
  });
}

ensureDist();
copyFiles();
patchHtmlFiles();

console.log('Favicon patched for GitHub Pages.');
