import { useEffect } from 'react';
import { clinic, siteUrl } from '@/data/clinic';

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

/** Atualiza title, description, canonical e Open Graph por rota. */
export function useDocumentMeta({ title, description, path }: { title?: string; description: string; path: string }) {
  useEffect(() => {
    const full = title ? `${title} — ${clinic.name}` : `${clinic.name} — ${clinic.tagline.replace(/\.$/, '')}`;
    document.title = full;
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', full);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    if (siteUrl) {
      setMeta('meta[property="og:url"]', 'property', 'og:url', siteUrl + path);
      let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = siteUrl + path;
    }
  }, [title, description, path]);
}
