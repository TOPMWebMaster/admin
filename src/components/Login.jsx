import React from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {

  const {isAdmin,setIsAdmin,axios,navigate} = useAppContext()
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onSubmitHandler = async(event)=>{
        try {
            event.preventDefault();
            const {data} = await axios.post("/api/login",{email,password},{
                withCredentials: true,  // Crucial to include the cookie
              }) 
            console.log(data)
            if(data.success){
                navigate("/");
                setIsAdmin(true)
            }else{
                toast.error(data.message)
           }
        } catch (error) {
            toast.error(error.message);
        }
    }

  return (
    <div onClick={()=> setShowLogin(false)} className=' fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center text-sm text-gray-600 bg-black/50'>
 <form onSubmit={onSubmitHandler} onClick={(e)=> e.stopPropagation()}  className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
            <p className="text-2xl font-medium m-auto">
                <span className="text-primary">User Login</span> 
            </p>
            <div className="w-full ">
                <p className=' text-start'>Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="email" required />
            </div>
            <div className="w-full ">
                <p className='text-start'>Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="password" required />
            </div>
            <button type='submit' className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">
               Login
            </button>
        </form>
    </div>
  )
}

export default Login