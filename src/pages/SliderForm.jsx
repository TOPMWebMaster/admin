import React, { useState } from 'react'
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const SliderForm = () => {
  const [files, setFiles] = useState([]);

  const {axios} = useAppContext();

  const onSubmitHandler = async (e)=>{
    try {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image",files[0]);
     const {data} = await   axios.post("/api/add-slider",formData);
     if(data.success){
        toast.success(data.message);
        setFiles([]);
       
     }else{
        toast.error(data.message);
     }
    } catch (error) {
        toast.error(error.message);
    } 
  }
  return (
    <div className="py-10 flex flex-col justify-between bg-white">
        <form onSubmit={onSubmitHandler} className="md:p-10 p-4 space-y-5 max-w-lg">
            <div>
                <p className="text-base font-medium">Slider Images</p>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                    {Array(1).fill('').map((_, index) => (
                        <label key={index} htmlFor={`image${index}`}>
                            <input onChange={(e)=> {
                                const updatedFiles = [...files];
                                updatedFiles[index] =e.target.files[0]
                                setFiles(updatedFiles)
                            }} type="file" id={`image${index}`} hidden />
                            <img className="max-w-24 cursor-pointer" src={files[index] ? URL.createObjectURL(files[index]): assets.upload_area} alt="uploadArea" width={100} height={100} />
                        </label>
                    ))}
                </div>
            </div>
            <button type='submit' className="px-8 py-2.5 bg-primary text-white font-medium rounded cursor-pointer">ADD</button>
        </form>
    </div>
);
  

}

export default SliderForm