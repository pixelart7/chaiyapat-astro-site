import path from 'path';
import slugify from 'slugify';
import * as cheerio from 'cheerio';

export function format(garden) {
  return garden.map((n) => ({
    params: {
      slug: slugify(path.basename(n.file, '.md'), { lower: true }),
    },
    props: {
      post: n,
      title: path.basename(n.file, '.md'),
      frontmatter: {
        ...n.frontmatter,
        created: (n.frontmatter.created) ? n.frontmatter.created.replaceAll(/\[/gm, '').replaceAll(/\]/gm, '') : undefined,
        updated: (n.frontmatter.updated) ? n.frontmatter.updated.replaceAll(/\[/gm, '').replaceAll(/\]/gm, '') : undefined,
      },
    }
  })).sort((a, b) => new Date(b.props.frontmatter.updated || b.props.frontmatter.created || '1970-01-01') - new Date(a.props.frontmatter.updated || a.props.frontmatter.created || '1970-01-01'));
}

const GARDEN_PATH = '/garden/';

type Graph = { [key: string]: GraphNode }

interface GraphNode {
  title: string,
  abstract: string,
  outgoing: { slug: string, title: string, abstract: string, isExist: boolean }[],
  incoming: { slug: string, title: string, abstract: string }[]
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
          slug: String($(a).attr('href')?.replace(GARDEN_PATH, '')),
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