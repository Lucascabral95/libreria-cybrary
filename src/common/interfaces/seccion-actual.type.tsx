export type SeccionActual =
    "inicio" |
    "inventario" |
    "productos" |
    "categorias" |
    "proveedores" |
    "movimientos" |
    "empleados" |
    "autores" |
    "";

export const seccionesValidadas: SeccionActual[] = [
    "inicio",
    "inventario",
    "productos",
    "categorias",
    "proveedores",
    "movimientos",
    "empleados",
    "autores",
    ""
];

// Para detalles de recursos de la empresa
export type DetallesRecursos =
    "movimiento" |
    "producto" |
    "categoria" |
    "proveedor" |
    "empleado" |
    "autor" |
    "";

export const recursosValidados: DetallesRecursos[] = [
    "movimiento",
    "producto",
    "categoria",
    "proveedor",
    "empleado",
    "autor",
    ""
]

export type DetallesRecursosSinEmpleado =
    "movimiento" |
    "producto" |
    "categoria" |
    "proveedor" |
    "autor" |
    "";

export const recursosValidadosSinEmpleado: DetallesRecursosSinEmpleado[] = [
    "movimiento",
    "producto",
    "categoria",
    "proveedor",
    "autor",
    ""
]

