import { faker } from "@faker-js/faker";

function generateItem() {
  return {
    category_name: faker.commerce.department(),
    selected: faker.datatype.boolean(),
  };
}

export function generateItems(count: number) {
  return Array.from({ length: count }).map(generateItem);
}
