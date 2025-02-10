enum Role {
    ADMIN = 'admin',
    EMPLOYEE = 'employee'
}

export interface AuthRegister {
    email: string,
    password: string,
    full_name: string,
    role: Role
}

export interface AuthLogin {
    email: string,
    password: string
}