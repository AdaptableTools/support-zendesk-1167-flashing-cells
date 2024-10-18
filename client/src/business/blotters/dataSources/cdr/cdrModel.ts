export const cdrs = ['99999', '70805'] as const;
export const books = ['ABC', 'DEF', 'XYZ', 'JFK', 'NYC'] as const;

export type Cdr = (typeof cdrs)[number];
export type Book = (typeof books)[number];

export const booksMap: { [k in Cdr]: Book[] } = {
  '99999': ['ABC', 'DEF', 'XYZ'],
  '70805': ['JFK', 'NYC'],
};
