import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDir = path.join(process.cwd(), 'posts');

function stripMarkdown(md = '') {
  // very simple markdown stripper for excerpts
  return md
    .replace(/[#>*_`\[\]\(\)~\-]/g, '')
    .replace(/\n+/g, ' ')
    .trim();
}

export function getPostSlugs() {
  if (!fs.existsSync(postsDir)) return [];
  return fs.readdirSync(postsDir).filter((f) => /\.(md|mdx)$/.test(f));
}

export async function getPostBySlug(slug) {
  const realSlug = slug.replace(/\.mdx?$/, '');
  const fullPath = path.join(postsDir, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  return {
    slug: realSlug,
    frontmatter: data,
    content: contentHtml,
  };
}

export function getAllPosts() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => {
    const fullPath = path.join(postsDir, slug);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const excerpt = stripMarkdown(content).slice(0, 240);
    return {
      slug: slug.replace(/\.mdx?$/, ''),
      frontmatter: data,
      excerpt,
    };
  }).sort((a, b) => {
    // sort by date if available
    const da = new Date(a.frontmatter.date || 0).getTime();
    const db = new Date(b.frontmatter.date || 0).getTime();
    return db - da;
  });
}