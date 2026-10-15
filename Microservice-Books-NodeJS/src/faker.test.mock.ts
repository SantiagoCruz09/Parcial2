export const faker = {
  commerce: { productName: () => "Test book", price: () => "10000" },
  person: { firstName: () => "Test", lastName: () => "User" },
  number: { int: ({ min }: { min: number }) => min },
  helpers: { arrayElement: <T>(values: T[]) => values[0] as T },
};
