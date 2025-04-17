import fs from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { marked } from 'marked';


const projectRoot = dirname(fileURLToPath(new URL('../../', import.meta.url)));


export async function getPageContent(
  numero: string,
  folder: 'pages' | 'pages2' = 'pages'  
) {
  const fileName = `pagina-${numero.padStart(3, '0')}.md`;
  const filePath = join(projectRoot, 'content', folder, fileName);

  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    const { data, content } = matter(raw);
    return { title: data.title ?? null, body: marked.parse(content) };
  } catch {
    return { title: null, body: null };
  }
}

export const getPageContent1 = (n: string) => getPageContent(n, 'pages');
export const getPageContent2 = (n: string) => getPageContent(n, 'pages2');