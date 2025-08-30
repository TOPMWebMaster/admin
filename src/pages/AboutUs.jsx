import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const AboutUs = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [project, setProjects] = useState('');
  const [roi, setRoi] = useState('');
  const [client, setClient] = useState('');
  const {axios} = useAppContext();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  
    if (!name || !description || !project || !client || !roi) {
      toast.error("Please fill all fields.");
      return;
    }
  
    try {
      const aboutData = {
        company_name: name,
        company_description: description,
        completed_projects: project,
        clients: client,
        roi_increase: roi,
      };
  
      console.log("Sending data:", aboutData); // Debug log
  
      const { data } = await axios.post("/api/add-about", { aboutData: JSON.stringify(aboutData) }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (data.success) {
        toast.success(data.message);
        setName('');
        setDescription('');
        setProjects(''); // fixed typo
        setRoi('');
        setClient('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };
  


  return (
   
    <div className="py-10 flex flex-col  bg-white">
        <form onSubmit={onSubmitHandler} className="md:p-10 p-4 space-y-5 max-w-lg">
            <div className="flex flex-col gap-1  lg:max-w-5xl">
                <label className="text-base font-medium" htmlFor="product-name">About Title</label>
                <input onChange={(e)=> setName(e.target.value)} value={name} id="product-name" type="text" placeholder="Type here" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
            </div>
            <div className="flex flex-col gap-1 max-w-md">
                <label className="text-base font-medium" htmlFor="product-description">About Description</label>
                <textarea onChange={(e)=> setDescription(e.target.value)} value={description} id="product-description" rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none" placeholder="Type here"></textarea>
            </div>
            <div className="flex flex-col gap-1 max-w-md">
                <label className="text-base font-medium" htmlFor="product-name">About Projects</label>
                <input onChange={(e)=> setProjects(e.target.value)} value={project} id="product-name" type="text" placeholder="Type here" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
            </div>

            <div className="flex items-center gap-5 flex-wrap">
                <div className="flex-1 flex flex-col gap-1 w-64">
                    <label className="text-base font-medium" htmlFor="product-price">Clients</label>
                    <input onChange={(e)=> setClient(e.target.value)} value={client} id="product-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                </div>
                <div className="flex-1 flex flex-col gap-1 w-64">
                    <label className="text-base font-medium" htmlFor="offer-price">Roi Increase</label>
                    <input onChange={(e)=> setRoi(e.target.value)} value={roi} id="offer-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                </div>
            </div>
            <button className="px-[200px] py-2.5 bg-primary text-white font-medium rounded cursor-pointer">ADD</button>
        </form>
    </div>
);
  

}

export default AboutUs