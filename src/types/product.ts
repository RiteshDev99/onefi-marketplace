export interface EMIPlan {
  _id: string;
  tenure: number;
  monthlyPayment: number;
  interestRate: number;
  cashback: number;
  processingFee: number;
  totalCost: number;
}

export interface ProductVariant {
  _id: string;
  name: string;
  color: string;
  storage: string;
  mrp: number;
  price: number;
  image: string;
  inStock: boolean;
  emiPlans: EMIPlan[];
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  brand: string;
  description: string;
  category: string;
  variants: ProductVariant[];
  createdAt?: string;
  updatedAt?: string;
}
