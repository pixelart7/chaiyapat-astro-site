import path from 'path';
import slugify from 'slugify';

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