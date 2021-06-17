export interface UserInterface {
    id: string,
    names: string,
    lastname: string;
    email: string,
    employee: boolean,
    curp?: string,
    accounts?: string[],
    address?: string,
    cp?: string
}