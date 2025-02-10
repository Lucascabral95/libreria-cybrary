export interface Product {
    id: number;
    name: string;
    sku: string;
    price: number;
    stock: number;
    slug: string;
    category_id: number;
    supplier_id: number;
    created_at: string;
    updated_at: string;
    author: string;
    quantity_pages: number;
    publication_date: string;
    language: string;
    synopsis: string;
    image: string;
};