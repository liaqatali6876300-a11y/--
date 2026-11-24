import { RawMasalaTuple, SawalJawab } from '../../types/bahar';

export function mapMasail(baabId: string, rows: RawMasalaTuple[]): SawalJawab[] {
  return rows.map(([sawal, jawab, fatwa], idx) => ({
    id: `${baabId}-${idx + 1}`,
    baabId,
    sawal,
    jawab,
    fatwa,
  }));
}
