# Checklist pré-publicação — Clínica Odontológica Santa Helena

> O site foi construído como **projeto demonstrativo**. Nada abaixo pode ser preenchido com dados inventados.
> Só altere `verifiedForPublication` para `true` em `src/data/clinic.ts` depois de concluir todos os itens.

## 1. Dados oficiais da clínica (`src/data/clinic.ts`)
- [ ] Razão social (`legalName`)
- [ ] CNPJ (`cnpj`)
- [ ] Inscrição da clínica no CRO, quando aplicável (`croClinic`)
- [ ] Responsável técnico: nome completo e número do CRO (`technicalLead`)
- [ ] Telefone fixo (`contact.phone`)
- [ ] WhatsApp oficial, formato `55DDDNUMERO` (`contact.whatsapp`)
- [ ] E-mail de contato e de privacidade (`contact.email`)
- [ ] Endereço completo, CEP e link real do Google Maps (`address`)
- [ ] Coordenadas (lat/lng) — opcional, para dados estruturados
- [ ] Horários de atendimento (`hours`)
- [ ] Redes sociais oficiais (`social`)
- [ ] `VITE_SITE_URL` no `.env` com o domínio definitivo

## 2. Profissionais (`src/data/content.ts → team`)
- [ ] Substituir os 3 perfis ilustrativos por profissionais reais
- [ ] Número de CRO de cada profissional, conferido no site do conselho
- [ ] Especialidades **somente** se registradas no CFO (`registeredSpecialties`)
- [ ] Autorização de uso de imagem de cada profissional
- [ ] Definir `illustrative: false` e remover a etiqueta "Perfil ilustrativo"

## 3. Serviços (`src/data/treatments.ts`)
- [ ] Confirmar quais tratamentos são realmente oferecidos (`active: false` para ocultar)
- [ ] Confirmar que há profissional habilitado para cada área anunciada
- [ ] Revisar os textos com o responsável técnico

## 4. Fotografias (`src/data/images.ts`)
- [ ] Substituir **todas** as ilustrações-placeholder por fotografias licenciadas ou próprias
- [ ] Coerência odontológica: cada foto corresponde ao assunto da seção
- [ ] Sem antes/depois, sem procedimentos invasivos em execução, sem casos de terceiros
- [ ] Autorização de imagem (termo assinado) de qualquer pessoa reconhecível
- [ ] Registrar licença/origem de cada arquivo no campo `license`
- [ ] Exportar em AVIF, WebP e JPG nas larguras 640/1024/1600/2200
- [ ] Temperatura de cor e iluminação consistentes entre as fotos

## 5. Normas publicitárias (CFO/CRO — Código de Ética Odontológica)
- [ ] Sem promessas de resultado ou de tratamento indolor
- [ ] Sem depoimentos fictícios; depoimentos reais só se permitidos pelas normas vigentes
- [ ] Sem comparativos de antes e depois
- [ ] Sem alegação de superioridade sobre outros profissionais
- [ ] Sem títulos de especialista não comprovados
- [ ] Nome e CRO do responsável técnico visíveis
- [ ] Revisão final das resoluções do CFO vigentes sobre publicidade odontológica

## 6. Conteúdo educativo (`src/data/articles.ts`, FAQ)
- [ ] Revisão técnica dos 6 artigos e do FAQ pelo responsável técnico
- [ ] Aviso de caráter educativo mantido

## 7. Privacidade e formulário
- [ ] Revisar `src/pages/PrivacyPage.tsx` com assessoria jurídica (LGPD)
- [ ] Definir prazo de retenção e fornecedores
- [ ] Integrar backend do formulário (`formEndpoint`) com proteção anti-spam (honeypot já incluso; adicionar rate-limit/captcha no servidor)
- [ ] Testar envio real e mensagem de retorno (o site nunca confirma agendamento)

## 8. Técnico
- [ ] `npm run build` sem erros
- [ ] Lighthouse/PageSpeed no domínio real: LCP ≤ 2,5 s · CLS ≤ 0,1 · INP ≤ 200 ms
- [ ] Avaliar `VITE_PRELOADER=off` se o LCP da primeira visita ficar acima da meta
- [ ] Testar em iPhone e Android reais (3D, menu, formulário)
- [ ] Enviar `sitemap.xml` ao Google Search Console
- [ ] Ativar `verifiedForPublication: true` (habilita JSON-LD) somente ao final
