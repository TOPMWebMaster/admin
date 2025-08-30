import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast';
import pdf from '../assets/pdf.png'

const Career = () => {

    const [career, setCareer] = useState([])
    const { axios, user } = useAppContext();

    const fetchCareer = async () => {
        try {
            const { data } = await axios.get("/api/career-list")
            if (data.success) {
                console.log(data.career);
                setCareer(data.career)
            }
        } catch (error) {
            toast.error(data.message)
        }
    }

    useEffect(() => {
        fetchCareer();
        // if(user){
        //     fetchMyOrders();
        // }

    }, [])


    return (
        <div className="w-full md:p-10 p-4">
            <h2 className="pb-4 text-lg font-medium">Career</h2>
            <div className="flex flex-col items-center max-w-7xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
                <table className="md:table-auto table-fixed w-full overflow-hidden">
                    <thead className="text-gray-900 text-sm text-left">
                        <tr>
                            <th className="px-4 py-3 font-semibold truncate">Cv</th>
                            <th className="px-4 py-3 font-semibold truncate">Name</th>
                            <th className="px-4 py-3 font-semibold truncate">Email</th>
                            <th className="px-4 py-3 font-semibold truncate ">Message</th>
                            <th className="px-4 py-3 font-semibold truncate ">Download Cv</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-500">
                        {career.map((career) => (
                            <tr key={career._id} className="border-t border-gray-500/20">
                                <td className="px-4 py-3">
                                   <img src={pdf} alt="cv" className="w-6 h-6 inline-block mr-2"/>
                                </td>
                                <td className="px-4 py-3">{career.name}</td>
                                <td className="px-4 py-3 ">{career.email}</td>
                                <td className="px-4 py-3 ">{career.message}</td>
                                <td className="px-4 py-3 ">  {career.cv && <a href={career.cv} download className="text-blue-600 hover:underline">Download</a>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

}

export default Career