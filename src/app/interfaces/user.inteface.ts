export interface User {
    firstname?: string,
    lastname?: string,
    email?: string,
    userId?: number,
    userRole?: string
}

export interface ServerResponse <T> {
    result: T
}