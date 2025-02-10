import { Product } from "./products.interface";

export interface ProductWithAuthor extends Product {
     id_author: number;
     name_author: string;
     birth_date_author: string;
     biography_author: string;
     nacionality_author: string;
     created_at_author: string;
     image_author: string;
     slug_author: string;
     id_category: number;
     category_product: string;
     description_category: string;
     slug_category: string;
}