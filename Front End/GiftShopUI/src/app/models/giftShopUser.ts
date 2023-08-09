export interface GiftShopUser {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userType: UserType ;
}

export enum UserType {
    Unregistered = 0,
    Customer = 1,
    Admin = 2
}