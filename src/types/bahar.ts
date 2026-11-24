export type FatwaStatus = 'جائز' | 'ناجائز' | 'مکروہ' | 'واجب' | 'سنت' | 'فرض';

export type ScriptStyle = 'nastaliq' | 'naskh';
export type FontScale = 'small' | 'medium' | 'large';
export type ReadingTheme = 'light' | 'dark';
export type AppView = 'main' | 'baab' | 'bookmarks';

export interface SawalJawab {
  id: string;
  baabId: string;
  sawal: string;
  jawab: string;
  fatwa: FatwaStatus;
}

export type RawMasalaTuple = [sawal: string, jawab: string, fatwa: FatwaStatus];

export interface Baab {
  id: string;
  shortName: string;
  title: string;
  description: string;
  masail: SawalJawab[];
}
