import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ELEMENT_NODE, parse, renderSync, walkSync } from 'ultrahtml'

const dist = fileURLToPath(new URL('../dist/', import.meta.url))
const files = (await fs.readdir(dist, { recursive: true })).filter(file => file.endsWith('.html'))
let count = 0

for (const file of files) {
  // This file must stay byte-for-byte identical to Google's original.
  if (file === 'googlea34850c66d258141.html') continue
  const filename = file.replaceAll(path.sep, '/')
  const directory = path.posix.dirname(filename)
  const relativeUrl = value => {
    if (!value.startsWith('/') || value.startsWith('//')) return value
    const [, pathname, suffix] = value.match(/^([^?#]*)(.*)$/)
    let relative = path.posix.relative(directory, pathname.slice(1))
    if (!relative || !relative.startsWith('.')) relative = `./${relative}`
    if (pathname.endsWith('/') && !relative.endsWith('/')) relative += '/'
    count++
    return relative + suffix
  }
  const cssUrls = value => value.replace(/url\((['"]?)(\/[^)'"\s]*)\1\)/g,
    (_, quote, url) => `url(${quote}${relativeUrl(url)}${quote})`)
  const tree = parse(await fs.readFile(path.join(dist, file), 'utf8'))
  walkSync(tree, node => {
    if (node.type !== ELEMENT_NODE) return
    for (const attribute of ['href', 'src', 'poster', 'action']) {
      if (node.attributes[attribute]) node.attributes[attribute] = relativeUrl(node.attributes[attribute])
    }
    if (node.attributes.srcset) {
      node.attributes.srcset = node.attributes.srcset.replace(/(^|,\s*)(\/[^\s,]+)/g,
        (_, separator, url) => separator + relativeUrl(url))
    }
    if (node.attributes.style) node.attributes.style = cssUrls(node.attributes.style)
    if (node.name === 'style') {
      for (const child of node.children) if (typeof child.value === 'string') child.value = cssUrls(child.value)
    }
  })
  await fs.writeFile(path.join(dist, file), renderSync(tree))
}

console.log(`Made ${count} asset and navigation URLs relative to their HTML files.`)
