// pages/api/search.js
import { getAllPosts } from '../../lib/posts';

export default function handler(req, res) {
  const { q = '' } = req.query;
  const posts = getAllPosts();

  if (!q || q.trim() === '') {
    // return lightweight metadata for listing
    return res.status(200).json(posts.map(p => ({
      slug: p.slug,
      title: p.frontmatter.title || p.slug,
      date: p.frontmatter.date || null,
      excerpt: p.excerpt
    })));
  }

  const qlc = q.toLowerCase();
  const filtered = posts.filter(p => {
    const title = (p.frontmatter.title || '').toLowerCase();
    const desc = (p.frontmatter.description || '').toLowerCase();
    const excerpt = (p.excerpt || '').toLowerCase();
    return title.includes(qlc) || desc.includes(qlc) || excerpt.includes(qlc) || p.slug.toLowerCase().includes(qlc);
  }).map(p => ({
    slug: p.slug,
    title: p.frontmatter.title || p.slug,
    date: p.frontmatter.date || null,
    excerpt: p.excerpt
  }));

  res.status(200).json(filtered);
}