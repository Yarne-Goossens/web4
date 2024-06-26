import AccountService from "@/services/AccountService"
import { Account, StatusMessage } from "@/types"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styles from '@/styles/Home.module.css'



const AccountAdd = () => {
    const[accounts,setAccounts] = useState<Array<Account>>([])

    const[username,setUsername] = useState<string>('')
    const[usernameError,setUsernameError] = useState<string>('')

    const[email,setEmail] = useState<string>('')
    const[emailError,setEmailError] = useState<string>('')

    const[password,setPassword] = useState<string>('')
    const[passwordError,setPasswordError] = useState<string>('')

    const[statusMessage,setStatusMessage] = useState<StatusMessage | null>(null);

    const router=useRouter()
    var { id } = router.query;

    useEffect(()=>{
        if (id) {
          
        }
      }, [id])

    const validate=():boolean=>{
        setUsernameError('');
        setEmailError('');
        setPasswordError('');

        setStatusMessage(null);
        var errorBool=true;

        if(!username &&username.trim()===""){
            setUsernameError('Username is required');
            errorBool=false;
        }
        if(!email &&email.trim()===""){
            setEmailError('Email is required');
            errorBool= false;
        }
        if(!password &&password.trim()===""){
            setPasswordError('Password is required');
            errorBool= false;
        }
        //check if email is valid using regex
        if(email && !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
            setEmailError('Email is invalid');
            errorBool= false;
        }


        return errorBool;
    }

    const handleSubmit=async (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        if(!validate()){
            return; 
        }
        
        const response= await AccountService.addAccount({username:username,email:email,password:password});
        const data= await response.json();
        
        if(response.status===200){
            setStatusMessage({message: `The account was added succesfully`, type: 'success'})

            if(sessionStorage.getItem("token")==null){
                setTimeout(()=>{
                    router.push('/')
                },500)
            }
            else{
                setTimeout(()=>{
                    router.push('/account/overview')
                },500)
            }
            
        }else if(response.status===400){
            setStatusMessage({type:'error',message:data.message})
        }
    };

    return (<>
    <form onSubmit={handleSubmit}>
        <div>
            <div>
                <label htmlFor="usernameInput">Account Name:</label>
            </div>
            <div>
                <input id='usernameInput' type="text" value={username} onChange={(event)=>setUsername(event.target.value)}/>
                {usernameError && <div className={styles.error}>{usernameError}</div>}
            </div>
            <div>
                <label htmlFor="emailInput">Email:</label>
            </div>
            <div>
                <input id='emailInput' type="text" value={email} onChange={(event)=>setEmail(event.target.value)}/>
                {emailError && <div className={styles.error}>{emailError}</div>}
            </div>
            <div>
                <label htmlFor="passwordInput">Password:</label>
            </div>
            <div>
                <input id='passwordInput' type="text" value={password} onChange={(event)=>setPassword(event.target.value)}/>
                {passwordError && <div className={styles.error}>{passwordError}</div>}
            </div>
        </div>
        <div>
            <button type='submit' className="px-7 py-3">
                Add Account
            </button>
        </div>
        {statusMessage && <div className={styles.success}>{statusMessage.message}</div>}
      </form>
    
    </>)
}
export default AccountAdd