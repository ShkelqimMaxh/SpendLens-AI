export type RecurrenceType = 'weekly' | 'biweekly' | 'monthly' | 'bimonthly' | 'quarterly' | 'semiannual' | 'annual' | 'biannual';

export type IncomeType = 'salary' | 'freelance' | 'passive' | 'investment' | 'business' | 'other';

export type Income = {
  id: string;
  name: string;
  amount: number;
  type: IncomeType;
  recurrence: RecurrenceType;
};

export type SpendingType = 'fixed' | 'variable' | 'discretionary';

export type Spending = {
  id: string;
  name: string;
  amount: number;
  type: SpendingType;
  recurrence: RecurrenceType;
};

export type SavedFunds = {
  id: string;
  name: string;
  amount: number;
  type: 'savings' | 'investment' | 'emergency' | 'other';
};

export type SavingGoal = {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: Date;
  monthlyContribution: number;
}; 