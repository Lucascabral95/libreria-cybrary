enum MovementType {
    IN = "in",
    OUT = "out"
}

export interface StockMovimientos {
    id: number,
    product_id: number,
    user_id: number,
    movement_type: MovementType,
    quantity: number,
    created_at: string,
    updated_at: string
}

export interface StockMovimientosWithUsuarioYProducto extends StockMovimientos {
    users_id: number
    users_email: string
    users_full_name: string
    users_is_active: string
    users_role: string
    product_id: number
    product_name: string
    product_price: number
    product_stock: number
    product_author: string
    product_quantity_pages: number
    product_publication_date: string
    product_language: string
    product_synopsis: string
    product_image: string
    total_amount: number
}