export interface UserJWT {
    id: number;
    email: string;
    full_name: string;
    is_active: boolean;
    role: string;
    iat: number;
    exp: number;
}