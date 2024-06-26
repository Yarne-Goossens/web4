export class Account {
    private _account_id: number
    private _email: string
    private _username: string
    private _password: string

    constructor( email?: string, username?: string,  password?: string,account_id?: number) {
        this._email = email
        this._username = username
        this._password = password
        this._account_id=account_id
    }

    get email(): string {
        return this._email;
    }
    get account_id(): number {
        return this._account_id;
    }
    get username(): string {
        return this._username;
    }
    get password(): string {
        return this._password;
    }
    //we moeten een manier vinden om errors te throwen en catchen da ni het programma crasht
    set email(value: string) {

        this._email = value;
    }
    set account_id(value: number) {
        //gets set by the database
        this._account_id = value;
    }
    set username(value: string) {
        this._username = value;
    }
    set password(value: string) {
        this._password = value;
    }

    static from(arg0: Account) {
        return new Account(
            arg0.email,
            arg0.username,
            arg0.password,
            arg0.account_id,
        );
    }
}