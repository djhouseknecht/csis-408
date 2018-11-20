export interface IBudgetItem {
  id?: number,
  month: number,
  year: number,
  description: string,
  amount?: number
  income?: 'Y'|'N'|null,
  category?: string,
  username?: string
}
