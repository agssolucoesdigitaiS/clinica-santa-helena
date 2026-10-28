# Clínica Odontológica Santa Helena — site

Experiência digital odontológica (projeto demonstrativo, clínica fictícia).
React 18 · TypeScript · Vite · Tailwind CSS v3 · GSAP + ScrollTrigger + SplitText · Lenis · Three.js / React Three Fiber / Drei · React Router · Lucide.

## Rodar
```bash
npm install
cp .env.example .env      # ajuste VITE_SITE_URL
npm run dev               # desenvolvimento
npm run build             # produção (gera dist/ + sitemap.xml)
npm run preview           # serve o build
```
Hospedagem SPA: `public/_redirects` (Netlify) e `vercel.json` (Vercel) já reescrevem rotas para `index.html`.

## Onde editar
| O quê | Arquivo |
|---|---|
| Dados da clínica, contatos, CRO, horários, endpoint do formulário | `src/data/clinic.ts` |
| Tratamentos (catálogo e páginas) | `src/data/treatments.ts` |
| Equipe, FAQ, jornada, menu | `src/data/content.ts` |
| Artigos | `src/data/articles.ts` |
| Fotografias (substituir placeholders) | `src/data/images.ts` + `public/assets/images/` |
| Estruturas do explorador 3D | `src/components/three/structures.ts` |

Campos `null` aparecem no site com o indicador **"A configurar"**. Veja `CHECKLIST-PRE-PUBLICACAO.md`.

## Imagens
Nenhuma fotografia real acompanha o projeto. Cada imagem é uma ilustração vetorial temática marcada como **Placeholder**.
Ao preencher `photo` em `images.ts`, o componente `<DentalImage>` passa a gerar `<picture>` com AVIF/WebP/JPG, `srcset`, `sizes`, lazy loading e `fetchpriority` na imagem principal.

## Arquitetura
```
src/components/layout      Header, menu mobile, Footer, Preloader, Lenis, JSON-LD
src/components/animations  RevealText (SplitText), Reveal, Parallax, MagneticButton
src/components/sections    Hero, Welcome, Treatments, SmileExplorer, Journey, Team, Faq, Articles, Contact
src/components/three       ToothCanvas (R3F, lazy), ToothFallback (SVG), structures
src/components/ui          DentalImage, ilustrações, Logo, Eyebrow
src/components/forms       ContactForm
src/pages  src/data  src/hooks  src/lib  src/styles
```

## Movimento e acessibilidade
- `gsap.matchMedia()` separa desktop/mobile/movimento reduzido; `useGSAP()` faz o cleanup.
- `prefers-reduced-motion`: Lenis desligado, sem pin/scrub, jornada empilhada, preloader curto.
- 3D só monta perto da viewport, pausa fora dela e cai para SVG interativo sem WebGL (`?nowebgl` para testar) ou em aparelhos de baixo desempenho (botão "Ver modelo 3D"; `?force3d` força).
- Skip link, foco visível, tablist com setas, accordion com ARIA, menu com focus trap e Esc.
- Preloader aparece uma vez por sessão; `VITE_PRELOADER=off` desativa.
