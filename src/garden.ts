import path from 'path';
import slugify from 'slugify';
import * as cheerio from 'cheerio';
import fs from 'fs';
import recursiveReadSync from 'recursive-readdir-sync';

let fsCache = undefined;

const GARDEN_PATH = path.join(process.cwd(), 'content', 'garden');
const GARDEN_PATH_REL = '/garden/';

function generateFsCache() {
  const contentFiles = recursiveReadSync(GARDEN_PATH)
  fsCache = contentFiles
    .map((p) => path.relative(GARDEN_PATH, p)) // change abs to relative path
    .filter((p) => p.endsWith('.md')) // filter only .md files    
    .map((p) => p.replace(/\.md$/, ''))
}

export function getContentMdFileList() {
  if (!fsCache) { generateFsCache() }
  return fsCache;
}

export function helperDirsAndFile(mdPath) {
  const dirsAndFile = mdPath.split('/')
  const filename = dirsAndFile.pop();
  return {
    dir: dirsAndFile.join('/'),
    filename,
  }
}

export function generatePathSlug(dir, filename) {
  return [dir, slugify(filename, { lower: true })].join('/').replace(/^\//, '')
}

export function format(garden) {
  const parsedGarden = garden.map((g) => ({
    ...g,
    gardenDirsAndFile: helperDirsAndFile((g.file.split('garden/').pop().replace(/\.md$/, ''))),
  }))

  const staticPaths = parsedGarden
    .map((n) => {
      return ({
        params: {
          slug: generatePathSlug(n.gardenDirsAndFile.dir, n.gardenDirsAndFile.filename),
        },
        props: {
          post: n,
          // gardenDirsAndFile: n.gardenDirsAndFile, // currently unused
          title: n.gardenDirsAndFile.filename,
          frontmatter: {
            ...n.frontmatter,
            created: (n.frontmatter.created) ? n.frontmatter.created.replaceAll(/\[/gm, '').replaceAll(/\]/gm, '') : undefined,
            updated: (n.frontmatter.updated) ? n.frontmatter.updated.replaceAll(/\[/gm, '').replaceAll(/\]/gm, '') : undefined,
          },
        }
      })
    })
    .sort((a, b) => new Date(b.props.frontmatter.updated || b.props.frontmatter.created || '1970-01-01') - new Date(a.props.frontmatter.updated || a.props.frontmatter.created || '1970-01-01'));

  return staticPaths
}

type Graph = { [key: string]: GraphNode }

interface GraphNode {
  title: string,
  abstract: string,
  outgoing: { slug: string, title: string, abstract: string, isExist: boolean }[],
  incoming: { slug: string, title: string, abstract: string }[],
  upperDirs: { slug: string, name: string, isExist: boolean }[],
}

export function buildGraph(formattedGarden) {
  const graph: Graph = {}
  for (const garden of formattedGarden) {
    const postContent = garden.props.post.compiledContent();
    const $ = cheerio.load(postContent);
    let postLinks: GraphNode['outgoing'] = []
    $('a').each((_, a) => {
      if ($(a).attr('href')?.startsWith('/garden/')) {
        postLinks.push({
          slug: String($(a).attr('href')?.replace(GARDEN_PATH_REL, '')),
          title: $(a).text(),
          abstract: '',
          isExist: false, // will do in the next part
        })
      }
    })
    graph[garden.params.slug] = {
      title: garden.props.title,
      abstract: garden.props.frontmatter.abstract || '',
      outgoing: postLinks,
      incoming: [],
      upperDirs: [],
    }
  }

  /* find incoming and check if exist */
  const allSlugs = Object.keys(graph);
  for (const slug of allSlugs) {

    // Check if outgoing link exists
    graph[slug].outgoing.forEach(({ slug: outgoingSlug }, i) => {
      if (allSlugs.indexOf(outgoingSlug) !== -1) {
        graph[slug].outgoing[i].isExist = true;
        graph[slug].outgoing[i].abstract = graph[outgoingSlug].abstract;
      }
    })

    // Find outgoing link to this slug in all nodes
    Object.entries(graph).forEach(([nodeSlug, graphNode]) => {
      graphNode.outgoing.forEach(({ slug: nodeOutgoingSlug }, i) => {
        if (nodeOutgoingSlug === slug) graph[slug].incoming.push({
          slug: nodeSlug,
          title: graphNode.title,
          abstract: graphNode.abstract,
        });
      })
    })

    // Extract upper dirs from slug (i.e. /dnd/cyceri/zook -> [/dnd, /dnd/cyceri])
    const dirs = slug.split('/');
    if (dirs.length > 1) { // not in root
      dirs.pop();
      const allUpperDirs = dirs.map((d, i) => dirs.slice(0, i + 1).join('/')).map((d) => ({
        slug: d,
        name: d.split('/').pop() || '',
        isExist: allSlugs.indexOf(d) !== -1,
      }))
      
      graph[slug].upperDirs = allUpperDirs;
    }
  }

  const gardenWithGraphNode = formattedGarden.map((g) => ({
    ...g,
    props: {
      ...g.props,
      node: graph[g.params.slug],
    }
  }));

  return gardenWithGraphNode
}