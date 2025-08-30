import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast';

const ContactUs = () => {

  const [contacts , setContacts] = useState([])
  const {axios,user} = useAppContext();

  const fetchContacts = async()=>{
   try {
    const {data} = await axios.get("/api/contacts-list")
    if(data.success){
        console.log(data.contacts);
        setContacts(data.contacts)
    }
   } catch (error) {
    toast.error(data.message)
   }
  }

  useEffect(()=>{
    fetchContacts();
        // if(user){
    //     fetchMyOrders();
    // }
      
  },[])


  return (
        <div className="w-full md:p-10 p-4">
            <h2 className="pb-4 text-lg font-medium">Contact Us</h2>
            <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
                <table className="md:table-auto table-fixed w-full overflow-hidden">
                    <thead className="text-gray-900 text-sm text-left">
                        <tr>
                            <th className="px-4 py-3 font-semibold truncate">Name</th>
                            <th className="px-4 py-3 font-semibold truncate">Email</th>
                            <th className="px-4 py-3 font-semibold truncate hidden md:block">Message</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-500">
                        {contacts.map((contact) => (
                            <tr key={contact._id} className="border-t border-gray-500/20">
                                <td className="px-4 py-3">{contact.name}</td>
                                <td className="px-4 py-3 max-sm:hidden">{contact.email}</td>
                                <td className="px-4 py-3 hidden md:block">{contact.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    </div>
);

}

export default ContactUs