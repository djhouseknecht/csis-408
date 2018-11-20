import { IBudgetItem } from "./budget-item";

export interface ICombinedBudget {
  category: string,
  budgetItems: IBudgetItem[]
}
