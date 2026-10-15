export const faker = {
  commerce: { productName: () => "Test book" },
  person: { firstName: () => "Test", lastName: () => "User" },
  date: {
    past: () => new Date("2025-01-01"),
    soon: () => new Date("2025-01-15"),
  },
  helpers: { arrayElement: <T>(values: T[]) => values[0] as T },
};
