import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ELEMENT_NODE, parse, walkSync } from 'ultrahtml'

const root = fileURLToPath(new URL('../', import.meta.url))
const dist = path.join(root, 'dist')
const verificationFile = 'googlea34850c66d258141.html'
const originalVerification = await fs.readFile(path.join(root, verificationFile))
for (const directory of ['public', 'dist']) {
  if (!originalVerification.equals(await fs.readFile(path.join(root, directory, verificationFile)))) {
    throw new Error(`The Google verification file changed in ${directory}`)
  }
}
const legacyRoutes = JSON.parse(await fs.readFile(path.join(root, 'src/data/legacy-routes.json'), 'utf8'))
for (const [oldId, destination] of Object.entries(legacyRoutes)) {
  const [pathname, fragment] = destination.split('#')
  const html = await fs.readFile(path.join(dist, pathname || '.', 'index.html'), 'utf8')
  if (fragment && !html.includes(`id="${fragment}"`)) throw new Error(`Missing legacy anchor: ${oldId} → ${destination}`)
}
const imageFiles = await fs.readdir(path.join(root, 'images'))
for (const filename of imageFiles) {
  const source = await fs.readFile(path.join(root, 'images', filename))
  if (!source.equals(await fs.readFile(path.join(dist, 'images', filename)))) throw new Error(`Screenshot changed: ${filename}`)
}
await fs.access(path.join(dist, 'release-notes/index.html'))
await fs.access(path.join(dist, 'pagefind/pagefind.js'))

// The same output must resolve under a domain root and unrelated nested folders.
const mounts = ['/', '/another-folder/', '/products/tools/manual/']
const htmlFiles = (await fs.readdir(dist, { recursive: true })).filter(file => file.endsWith('.html') && file !== verificationFile)
let checkedLinks = 0
for (const file of htmlFiles) {
  const html = await fs.readFile(path.join(dist, file), 'utf8')
  const references = []
  walkSync(parse(html), node => {
    if (node.type !== ELEMENT_NODE) return
    for (const name of ['href', 'src', 'poster', 'action']) {
      if (node.attributes[name]) references.push(node.attributes[name])
    }
    if (node.attributes.srcset) {
      for (const match of node.attributes.srcset.matchAll(/(?:^|,\s*)([^\s,]+)(?:\s+[^,]+)?/g)) {
        if (!match[1].startsWith('data:')) references.push(match[1])
      }
    }
  })
  for (const value of references) {
    if (/^[a-z][a-z\d+.-]*:/i.test(value) || value.startsWith('//')) continue
    if (value.startsWith('/')) throw new Error(`Root-relative URL in ${file}: ${value}`)
    for (const mount of mounts) {
      const pagePath = file.replaceAll(path.sep, '/').replace(/index\.html$/, '')
      const pageUrl = new URL(mount + pagePath, 'https://portable.invalid')
      const url = new URL(value.replaceAll('&amp;', '&'), pageUrl)
      if (!url.pathname.startsWith(mount)) throw new Error(`URL escaped its deployment folder in ${file}: ${value}`)
      let target = path.join(dist, decodeURIComponent(url.pathname.slice(mount.length)))
      const stat = await fs.stat(target).catch(() => null)
      if (!stat) throw new Error(`Broken link in ${file}: ${value}`)
      if (stat.isDirectory()) target = path.join(target, 'index.html')
      await fs.access(target)
      checkedLinks++
    }
  }
}
console.log(`Verified ${checkedLinks} relative links across ${mounts.length} deployment paths, ${Object.keys(legacyRoutes).length} legacy links, ${imageFiles.length} images, search, release notes, and the unchanged Google verification file.`)
