declare type UserRole = "PARTICULIER" | "PROFESSIONNEL" | "CANDIDAT" | "RECRUTEUR" | "ADMIN "


declare interface Register {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    role: UserRole,
    phone: string;
}

declare interface LoginCredentials {
    email: string;
    password: string;
}

declare interface LoginResponse {
    access_token: string;
    expires_in: number;
    token_type: "Bearer";
    scope: "read write";
    refresh_token: string;
}

declare interface Profile {
    id: number;
    address: string;
    city: string;
    avatar: string;
}

declare interface User {
    id: string | number;
    first_name: string;
    last_name: string;
    email: string;
    role: UserRole;
    phone: string;
}