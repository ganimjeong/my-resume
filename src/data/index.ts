import type { ResumeData } from './types';
import { enData } from './en';
import { jaData } from './ja';
import { koData } from './ko';

export type { ResumeData };

export const resumeData: Record<'en' | 'ja' | 'ko', ResumeData> = {
  en: enData,
  ja: jaData,
  ko: koData,
};
