export type WellbeingEntry = {
  id: string;
  date: string;        
  rating: 1 | 2 | 3 | 4 | 5;
  notes?: string;
};
