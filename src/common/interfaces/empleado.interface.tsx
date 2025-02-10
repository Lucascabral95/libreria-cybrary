enum Role {
    ADMIN = 'admin',
    EMPLOYEE = 'employee'
}

export interface Empleado {
    id: number, 
    full_name: string,
    email: string,
    is_active: boolean,
    role: Role
}