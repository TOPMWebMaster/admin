import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast';
import pdf from '../assets/pdf.png'

const Projects = () => {

    const [projects, setProjects] = useState([])
    const { axios, user } = useAppContext();

    const fetchproject = async () => {
        try {
            const { data } = await axios.get("/api/projects-list")
            if (data.success) {
                console.log(data.projects);
                setProjects(data.projects)
            }
        } catch (error) {
            toast.error(data.message)
        }
    }

    useEffect(() => {
        fetchproject();
        // if(user){
        //     fetchMyOrders();
        // }

    }, [])

    const deleteProject = async (id) => {
        try {
            const { data } = await axios.post("/api/delete-project",{id: id})
            if (data.success) {
                toast.success(data.message);
               fetchproject();
            }
        } catch (error) {
            toast.error(data.message)
        }
    }


    return (
        <div className="w-full md:p-10 p-4">
            <h2 className="pb-4 text-lg font-medium">project</h2>
            <div className="flex flex-col items-center max-w-7xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
                <table className="md:table-auto table-fixed w-full overflow-hidden">
                    <thead className="text-gray-900 text-sm text-left">
                        <tr>
                            <th className="px-4 py-3 font-semibold truncate">Image</th>
                            <th className="px-4 py-3 font-semibold truncate">Name</th>
                            <th className="px-4 py-3 font-semibold truncate">Language</th>
                            <th className="px-4 py-3 font-semibold truncate">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-500">
                        {projects.map((project) => (
                            <tr key={project._id} className="border-t border-gray-500/20">
                                <td className="px-4 py-3">
                                   <img src={project.image} alt="cv" className="w-6 h-6 inline-block mr-2"/>
                                </td>
                                <td className="px-4 py-3">{project.name}</td>
                                <td className="px-4 py-3 ">{project.lang}</td>
                                <td className="px-4 py-3 ">
                                    {/* <span className=' text-blue-500 px-2'>Edit</span> */}
                                    <span onClick={()=>{
                                        deleteProject(project._id);
                                    }} className=' text-red-500 cursor-pointer'>Delete</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

}

export default Projects