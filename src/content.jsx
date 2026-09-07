import yaml from 'js-yaml';
import { marked } from 'marked';

const markdownFiles = import.meta.glob('../content/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});
const imageFiles = import.meta.glob('../content/**/*.{avif,gif,jpeg,jpg,png,svg,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const normalizePath = path => path.replace(/\\/g, '/');
const parseFile = ([path, source]) => {
  const match = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/);
  const frontmatter = match ? yaml.load(match[1]) || {} : {};
  let body = match ? match[2] : source;
  const directory = normalizePath(path).slice(0, normalizePath(path).lastIndexOf('/'));
  const coverPath = frontmatter.cover?.replace(/^\.\//, '');

  if (coverPath) {
    frontmatter.cover = imageFiles[`${directory}/${coverPath}`];
  }

  body = body.replace(/(!?\[[^\]]*\]\()([^\s)]+)(\))/g, (full, opening, url, closing) => {
    if (/^(?:[a-z]+:|\/|#)/i.test(url)) {return full;}
    const asset = imageFiles[`${directory}/${url.replace(/^\.\//, '')}`];
    return asset ? `${opening}${asset}${closing}` : full;
  });

  return { path: normalizePath(path), frontmatter, html: marked.parse(body) };
};

const allContent = Object.entries(markdownFiles).map(parseFile);
const inDirectory = directory =>
  allContent.filter(item => item.path.includes(`/content/${directory}/`));
const byDate = (a, b) => new Date(b.frontmatter.date || 0) - new Date(a.frontmatter.date || 0);

export const posts = inDirectory('posts')
  .filter(({ frontmatter }) => frontmatter.draft !== true && frontmatter.slug)
  .sort(byDate);
export const projects = inDirectory('projects').sort(byDate);
export const jobs = inDirectory('jobs').sort(byDate);
export const featured = inDirectory('featured').sort((a, b) =>
  String(a.frontmatter.date).localeCompare(String(b.frontmatter.date)),
);

export const tags = Object.entries(
  posts.flatMap(({ frontmatter }) => frontmatter.tags || []).reduce((counts, tag) => {
    counts[tag] = (counts[tag] || 0) + 1;
    return counts;
  }, {}),
).map(([fieldValue, totalCount]) => ({ fieldValue, totalCount }));
