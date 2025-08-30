import React, { useEffect, useState, useRef } from 'react'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast';
import pdf from '../assets/pdf.png'

const Customers = () => {

    const [customers, setCustomers] = useState([])

    const { axios, user } = useAppContext();

    const fetchCustomers = async () => {
        try {
            const { data } = await axios.get("/api/customers-list")
            if (data.success) {
                setCustomers(data.customers);
                totalSlides = data.customers.length;
            }
        } catch (error) {
            toast.error(data.message)
        }
    }

    useEffect(() => {
        fetchCustomers();
        // if(user){
        //     fetchMyOrders();
        // }

    }, [])
    const deleteCustomer = async (id) => {
      try {
          const { data } = await axios.post("/api/delete-customer",{id: id})
          if (data.success) {
             fetchCustomers();
          }
      } catch (error) {
          toast.error(data.message)
      }
  }
    return (
        <div className="p-6">
      <h2 className="text-2xl mb-4">Our Customers</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {customers.map((customer) => (
            <div c
              key={customer._id}
              className="border border-gray-200 p-4 flex-col justify-center flex rounded-md shadow hover:shadow-lg transition"
            >
             <img src={customer.image} alt={customer.name} className="w-full h-48 object-cover mb-4 rounded" />
             <button onClick={()=>{
                deleteCustomer(customer._id);
             }} className=' bg-red-500 text-white px-4 py-0.5 rounded-2xl items-center'>Delete Customer</button>
            </div>
          ))}
        </div>
    </div>
    );

}

export default Customers