import {Account} from '../domain/model/account';
import { emailExists, getAllAccounts, idExists, loginValidation } from '../domain/data-access/account.db';
import { addAccount } from '../domain/data-access/account.db';
import { getAccountWithId } from '../domain/data-access/account.db';
import { deleteAccount } from '../domain/data-access/account.db';
import { updateAccount } from '../domain/data-access/account.db';
import bcrypt from 'bcrypt';
export class AccountService{

    getAllAccounts=async():Promise<Account[]>=>await getAllAccounts();

    addAccountService=async(account:Account)=>{
        const hashpass=await bcrypt.hash(account.password,12);
        account.password=hashpass;
        await addAccount(account);
    }

    getAccountById=async(id:number):Promise<Account>=>await getAccountWithId(id);

    updateAccount=async(id:number,account:Account)=>await updateAccount(id,account);

    deleteAccount=async (id:number)=>await deleteAccount(id);

    loginValidation=async(email:string,password:string):Promise<boolean>=>await loginValidation(email,password);

    idExistsService=async(id:number):Promise<boolean>=>await idExists(id);

    emailExistsService=async(email:string):Promise<boolean>=>await emailExists(email);

}