export const normalize = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export const slugify = (value: string): string =>
  normalize(value)
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
