
export type Product = {
  id: string;
  name: string;
  guarantee: string;
  paymentPeriod: string;
  category: string;
  subCategory?: string;
  image: string;
  dataAiHint: string;
  description: string;
  installments: Record<string, number>;
};
