import React from 'react'
import { useAppContext } from '../context/AppContext';
import { NavLink, Outlet, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import logo from "../assets/logo.png";
const DashBoardLayout = () => {

  const {axios,navigate,setIsAdmin} = useAppContext();

  const sidebarLinks = [
    { name: "Slider Form", path: "sliders-form" },
    { name: "About Form", path: "about-form" },
    { name: "Project Form", path: "project-form" },
    { name: "Customer Form", path: "customer-form" },
    { name: "Sliders", path: "sliders" },
    { name: "Contact", path: "contact" },
    { name: "Career", path: "career" },
    { name: "Customer Projects", path: "project" },
    { name: "Customers", path: "customers" },
];

const logout = async()=>{
    try {
        const {data} = await axios.get('/api/logout');
        if(data.success){
            toast.success(data.message)
            setIsAdmin(false)
            navigate("/")
            
        }else{
            toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
}

return (
    <>
        <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-primary transition-all duration-300">
            <Link to="/">
                <img className=" cursor-pointer w-20 md:w-20" src={logo} alt="dummyLogoColored" />
            </Link>
            <div className="flex items-center gap-5 text-gray-500">
                <p className=' text-white'>Hi! Admin</p>
               
            </div>
        </div>

      <div className='flex'>
      <div className="md:w-64 w-16 border-r h-[95vh] text-base bg-primary pt-4 flex flex-col">
  {sidebarLinks.map((item) => (
    <NavLink
      to={item.path}
      key={item.name}
      className={({ isActive }) =>
        `flex items-center py-3 px-4 gap-3 
         ${isActive
            ? "border-r-4 md:border-r-[6px] bg-white border-white text-black"
            : "hover:bg-gray-100/90 border-white text-white"
         }`
      }
    >
      <p className="md:block hidden text-center">{item.name}</p>
    </NavLink>
  ))}
</div>

        <Outlet/>
      </div>

       
    </>
);
}

export default DashBoardLayout