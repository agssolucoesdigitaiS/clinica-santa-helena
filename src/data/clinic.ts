/**
 * CONFIGURAÇÃO OFICIAL DA CLÍNICA
 * ---------------------------------------------------------------
 * Todo campo `null` marcado com  // OBRIGATÓRIO  precisa ser preenchido
 * com dados REAIS e VERIFICADOS antes da publicação.
 * Enquanto estiver `null`, o site exibe um indicador "A configurar".
 * Nada aqui deve ser inventado (CNPJ, CRO, telefone, endereço etc.).
 */

export type Pending<T> = T | null;

export interface OpeningHours {
  days: string;
  hours: string;
}

export interface ClinicConfig {
  name: string;
  shortName: string;
  tagline: string;
  city: string;
  state: string;
  /** Razão social — OBRIGATÓRIO */
  legalName: Pending<string>;
  /** CNPJ — OBRIGATÓRIO */
  cnpj: Pending<string>;
  /** Inscrição da clínica no CRO (EPAO/EPO), quando aplicável — OBRIGATÓRIO */
  croClinic: Pending<string>;
  /** Responsável técnico — OBRIGATÓRIO (nome + CRO) */
  technicalLead: { name: Pending<string>; cro: Pending<string> };
  contact: {
    /** Telefone fixo — OBRIGATÓRIO */
    phone: Pending<string>;
    /** WhatsApp oficial no formato internacional, só dígitos (ex.: 5511900000000) — OBRIGATÓRIO */
    whatsapp: Pending<string>;
    email: Pending<string>;
  };
  address: {
    street: Pending<string>;
    district: Pending<string>;
    zip: Pending<string>;
    /** Link do Google Maps — preencher só com endereço verdadeiro */
    mapUrl: Pending<string>;
    lat: Pending<number>;
    lng: Pending<number>;
  };
  /** Horários — OBRIGATÓRIO confirmar */
  hours: Pending<OpeningHours[]>;
  social: { instagram: Pending<string>; facebook: Pending<string>; youtube: Pending<string> };
  developerCredit: { label: string; url: Pending<string> };
  /** Endpoint do formulário (backend/serviço de e-mail). Enquanto null, o formulário fica em modo demonstrativo. */
  formEndpoint: Pending<string>;
  /**
   * Trava de publicação. Só mude para `true` depois de concluir o
   * CHECKLIST-PRE-PUBLICACAO.md. Habilita dados estruturados (JSON-LD).
   */
  verifiedForPublication: boolean;
}

export const clinic: ClinicConfig = {
  name: 'Clínica Odontológica Santa Helena',
  shortName: 'Santa Helena',
  tagline: 'Cuidado em cada detalhe do seu sorriso.',
  city: 'São Paulo',
  state: 'SP',
  legalName: null, // OBRIGATÓRIO
  cnpj: null, // OBRIGATÓRIO
  croClinic: null, // OBRIGATÓRIO
  technicalLead: { name: null, cro: null }, // OBRIGATÓRIO
  contact: {
    phone: null, // OBRIGATÓRIO
    whatsapp: null, // OBRIGATÓRIO
    email: null,
  },
  address: { street: null, district: null, zip: null, mapUrl: null, lat: null, lng: null },
  hours: null, // OBRIGATÓRIO — ex.: [{ days: 'Segunda a sexta', hours: '8h às 19h' }]
  social: { instagram: null, facebook: null, youtube: null },
  developerCredit: { label: 'Desenvolvido por AGS Soluções Digitais', url: null },
  formEndpoint: null,
  verifiedForPublication: false,
};

export const PENDING_LABEL = 'A configurar';

/** Retorna o valor ou um rótulo de pendência, para exibição. */
export function show<T>(value: Pending<T>, what: string): string {
  if (value === null || value === undefined || value === '') return `${PENDING_LABEL}: ${what}`;
  return String(value);
}

export function isPending(value: unknown): boolean {
  return value === null || value === undefined || value === '';
}

export function whatsappLink(message = 'Olá! Gostaria de informações sobre atendimento na Clínica Santa Helena.') {
  if (!clinic.contact.whatsapp) return null;
  return `https://wa.me/${clinic.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const siteUrl = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ?? '';
