import { productCategories } from "./data";

export type ProductCategoryType = (typeof productCategories)[number];

export type ProductType = {
  id: number;
  title: string;
  description: string;
  category: ProductCategoryType;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: ProductDimensionsType;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: ProductReviewType[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: ProducMetadataType;
  images: string[];
  thumbnail: string;
};

export type ProductDimensionsType = {
  width: number;
  height: number;
  depth: number;
};

export type ProductReviewType = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

export type ProducMetadataType = {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
};
