export interface IUser {
    codes: Array<string>;
    name: string;
    id: string;
}

export interface IUserResponse {
    user: string;
    id: string;
    userLoged: string;
    users: Array<IUserDetail>;
}

export interface IUserDetail {
    userRegistration: string;
    userCode: string;
    userName: string;
}
