import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(fileURLToPath(new URL('../', import.meta.url)))
const publicRoot = path.join(root, 'public')
const generatedImages = path.resolve(publicRoot, 'images')
if (path.dirname(generatedImages) !== publicRoot || !generatedImages.startsWith(`${root}${path.sep}`)) {
  throw new Error('Refusing to replace static assets outside this project')
}
await fs.mkdir(publicRoot, { recursive: true })
await fs.rm(generatedImages, { recursive: true, force: true })
await fs.cp(path.join(root, 'images'), generatedImages, { recursive: true })
await fs.copyFile(path.join(root, 'googlea34850c66d258141.html'), path.join(publicRoot, 'googlea34850c66d258141.html'))

const legacyRoutes = JSON.parse(await fs.readFile(path.join(root, 'src/data/legacy-routes.json'), 'utf8'))
const redirectScript = `(() => {
  const base = new URL('.', document.currentScript.src);
  const routes = ${JSON.stringify(legacyRoutes)};
  const redirect = () => {
    const current = new URL(window.location.href);
    const page = (current.searchParams.get('page') || '').trim().replace(/^\\/+|\\/+$/g, '').toLowerCase();
    const isHome = current.pathname === base.pathname || current.pathname === base.pathname + 'index.html';
    let fragment;
    try { fragment = decodeURIComponent(current.hash.slice(1)); } catch { return; }
    let destination;
    if (page === 'release-notes') {
      destination = new URL('release-notes/', base);
      destination.hash = current.hash;
    } else if (isHome && current.hash && Object.hasOwn(routes, fragment)) {
      destination = new URL(routes[fragment] || './', base);
    }
    if (!destination) return;
    destination.search = current.search;
    destination.searchParams.delete('page');
    if (destination.href !== current.href) window.location.replace(destination.href);
  };
  redirect();
  window.addEventListener('hashchange', redirect);
})();\n`
await fs.writeFile(path.join(publicRoot, 'legacy-routes.js'), redirectScript)
console.log('Prepared screenshots, legacy links, and the original Google verification file.')
