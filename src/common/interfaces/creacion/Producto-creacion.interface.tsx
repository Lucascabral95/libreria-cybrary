export interface CreacionProducto {
    name: string,
    author: string,
    publication_date: string,
    synopsis: string,
    quantity_pages: number,
    language: string,
    price: number,
    stock: number,
    category_id: number,
    supplier_id: number,
    image?: File | null,
}