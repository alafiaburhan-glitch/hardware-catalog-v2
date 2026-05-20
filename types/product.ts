export type Product = {
  id: number;

  name: string;

  slug: string;

  code: string;

  category: string;

  description: string;

  image: string;

  specifications: {
    [key: string]: string;
  };
};