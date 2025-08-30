import React, { useState } from 'react'
import { assets, langs } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const ProjectForm = () => {
     console.log("page loading")
  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [lang, setLanguage] = useState('');

  const {axios} = useAppContext();

  const onSubmitHandler = async (e)=>{
    try {
        e.preventDefault();
        const projectData = {
            name,
            lang
        }
        const formData = new FormData();
        formData.append('projectData',JSON.stringify(projectData));
        formData.append('image',files[0]);
        // for(let i=0; i < files.length; i++){
        //     formData.append("image",files[i]);
        // }
     const {data} = await   axios.post("/api/add-project",formData);
     if(data.success){
        toast.success(data.message);
        setName('');
        setFiles([]);
        setLanguage('');
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
                <p className="text-base font-medium">Project Image</p>
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
            <div className="flex flex-col gap-1 max-w-md w-64">
                <label className="text-base font-medium" htmlFor="product-name">Project Title</label>
                <input onChange={(e)=> setName(e.target.value)} value={name} id="product-name" type="text" placeholder="Type here" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
            </div>
            <div className="w-full flex flex-col gap-1">
                <label className="text-base font-medium" htmlFor="category">Language</label>
                <select id="category" onChange={(e)=> setLanguage(e.target.value)} value={lang} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40">
                    <option value="">Select Language</option>
                   {langs.map((item,index)=>(
                    <option key={index} value={item.text}>{item.text}</option>
                   ))}
                </select>
            </div>
            <button type='submit' className="px-8 py-2.5 bg-primary text-white font-medium rounded cursor-pointer">ADD</button>
        </form>
    </div>
);
  

}

export default ProjectForm