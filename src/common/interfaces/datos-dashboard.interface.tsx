interface ArticuloMostSell {
    product_name: string;
    total_price_products: number | null;
    total_quantity: number | null;
}

interface TotalExpenditure {
    products_total_selled: number | undefined | null;
    total_price: number | undefined | null;
}

interface TotalIncome {
    products_total_buyed: number | undefined | null;
    total_price: number | undefined | null;
}

export interface DatosDelDashboard {
    articulesMostSell: ArticuloMostSell[];
    quantityCategorys: number;
    quantityProducts: number;
    quantitySupliers: number;
    totalExpeditures: TotalExpenditure;
    totalIncome: TotalIncome;
    totalProducts: number;
}
