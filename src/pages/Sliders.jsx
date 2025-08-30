import React, { useEffect, useState, useRef } from 'react'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast';
const Sliders = () => {

    const [sliders, setSliders] = useState([])

    const { axios, user } = useAppContext();

    const fetchSliders = async () => {
        try {
            const { data } = await axios.get("/api/sliders-list")
            if (data.success) {
                setSliders(data.sliders);
            }
        } catch (error) {
            toast.error(data.message)
        }
    }

    useEffect(() => {
        fetchSliders();
        // if(user){
        //     fetchMyOrders();
        // }

    }, [])
    const deleteSlider = async (id) => {
      try {
          const { data } = await axios.post("/api/delete-slider",{id: id})
          if (data.success) {
             fetchSliders();
          }
      } catch (error) {
          toast.error(data.message)
      }
  }
    return (
        <div className="p-6">
      <h2 className="text-2xl mb-4">Slider Images</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sliders.map((slider) => (
            <div
              key={slider._id}
              className="border border-gray-200 p-4 flex-col justify-center flex rounded-md shadow hover:shadow-lg transition"
            >
             <img src={slider.image} alt={slider.name} className="w-full h-48 object-cover mb-4 rounded" />
             <button onClick={()=>{
                deleteSlider(slider._id);
             }} className=' bg-red-500 text-white px-4 py-0.5 rounded-2xl items-center'>Delete Slider</button>
            </div>
          ))}
        </div>
    </div>
    );

}

export default Sliders