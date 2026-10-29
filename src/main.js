import DOMPurify from 'dompurify';
import { marked } from 'marked';
import './style.css';

const markdownFiles = import.meta.glob('/content/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const cleanText = (value) => value
  .replace(/^#+\s*/, '')
  .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
  .replace(/[*_`~]/g, '')
  .trim();

const normalizeSearch = (value) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLocaleLowerCase('vi');

const documents = Object.entries(markdownFiles).map(([path, markdown]) => {
  const filename = path.split('/').at(-1);
  const heading = markdown.match(/^#\s+(.+)$/m)?.[1];
  const title = cleanText(heading || filename.replace(/\.md$/i, ''));
  const description = markdown
    .split(/\r?\n\s*\r?\n/)
    .find((block) => block.trim() && !/^#{1,6}\s/.test(block.trim()))
    ?.split(/\r?\n/)
    .map(cleanText)
    .join(' ')
    .slice(0, 120) || 'Mở để đọc tài liệu.';

  return { path, filename, title, description, markdown };
}).sort((a, b) => a.title.localeCompare(b.title, 'vi'));

const list = document.querySelector('#document-list');
const article = document.querySelector('#article');
const search = document.querySelector('#search');
const readTime = document.querySelector('#reading-time');
const downloadButton = document.querySelector('#download');
let activeDocument = null;

function renderList() {
  const query = normalizeSearch(search.value.trim());
  const filtered = documents.filter((doc) =>
    normalizeSearch(`${doc.title} ${doc.description}`).includes(query),
  );

  list.replaceChildren();
  if (!filtered.length) {
    list.innerHTML = '<p class="empty-list">Không tìm thấy tài liệu.</p>';
    return;
  }

  for (const doc of filtered) {
    const button = document.createElement('button');
    button.className = 'document-item';
    button.type = 'button';
    button.setAttribute('aria-current', doc.path === activeDocument?.path ? 'page' : 'false');
    button.innerHTML = '<span class="document-dot" aria-hidden="true"></span><span class="document-copy"><strong></strong><small></small></span>';
    button.querySelector('strong').textContent = doc.title;
    button.querySelector('small').textContent = doc.description;
    button.addEventListener('click', () => openDocument(doc));
    list.append(button);
  }
}

function openDocument(doc, updateUrl = true) {
  if (!doc) return;
  activeDocument = doc;
  if (updateUrl) window.location.hash = `doc=${encodeURIComponent(doc.path)}`;

  document.title = `${doc.title} · Thư viện nhỏ`;
  readTime.textContent = `${Math.max(1, Math.ceil(doc.markdown.trim().split(/\s+/).length / 220))} PHÚT ĐỌC`;
  article.innerHTML = DOMPurify.sanitize(marked.parse(doc.markdown));

  const firstHeading = article.querySelector('h1');
  if (firstHeading && cleanText(firstHeading.textContent) === doc.title) firstHeading.remove();
  renderList();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

search.addEventListener('input', renderList);
downloadButton.addEventListener('click', () => {
  if (!activeDocument) return;
  const file = new Blob([activeDocument.markdown], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.download = activeDocument.filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
});

window.addEventListener('hashchange', () => {
  const path = new URLSearchParams(window.location.hash.slice(1)).get('doc');
  const doc = documents.find((item) => item.path === path);
  if (doc && doc.path !== activeDocument?.path) openDocument(doc, false);
});

document.querySelector('#document-count').textContent = documents.length;
const initialPath = new URLSearchParams(window.location.hash.slice(1)).get('doc');
openDocument(documents.find((doc) => doc.path === initialPath) || documents[0], false);

if (!documents.length) {
  article.innerHTML = '<div class="empty-state"><span>✳</span><h2>Chưa có bài viết</h2><p>Thêm file Markdown vào thư mục <code>content/</code> để bắt đầu.</p></div>';
  readTime.textContent = '';
  downloadButton.disabled = true;
  renderList();
}
