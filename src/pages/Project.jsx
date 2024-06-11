import { Link, useParams } from "react-router-dom"
import Spinner from '../assets/spinner.gif'
import { useQuery } from "@apollo/client"
import { GET_PROJECT } from "../queries/projectQueries"
import {FaEnvelope, FaPhone, FaIdBadge} from 'react-icons/fa'
import DeleteProjectButton from "../components/DeleteProjectButton"
import UpdateProjectForm from "../components/UpdateProjectForm"
import { useState } from "react"
const Project = () => {

const [showUpdateForm, setShowUpdateForm] = useState(false)
  const {id} = useParams();
  const {loading, error, data} = useQuery(GET_PROJECT,
    {
      variables: {id}
    }
  );

const closeUpdateForm = ()=>{
  setShowUpdateForm(false)
}

const handleUpdate = ()=>{
  setShowUpdateForm(true)
}

  function statusColor(status) {
    if (status === "completed" || status === "COMPLETED" || status === "Completed")
        return "text-green-500";
    else if (status === "IN PROGRESS" || status === "in progress" || status === "In Progress") {
        return "text-indigo-500";
    }
    else {
        return "text-red-500"
    }
}

  if (loading) {
    return <img src={Spinner} alt="" className='w-[150px] m-auto' />
}
if (error) {
    return <h1 className='ml-6 text-xl lg:text-2xl'>Something went wrong...</h1>
}
  return ( 
    <>
    {
      !loading && !error && (
        <div class="p-5 bg-white px-4 border-2 border-gray-400 mb-2 w-[90%] lg:w-[55%] rounded-md m-auto">
        { showUpdateForm === false ?
          (<div>
        <div class="flex items-center -mt-1">
            <h3 class="my-2 ml-3 text-3xl lg:text-5xl font-bold text-gray-800">{data.project.name}</h3>
        </div>
        <p class={`mt-3 mb-1 ml-3 text-xs font-medium  ${statusColor(data.project.status)} uppercase`}><strong className="text-black">Project Status: </strong><span className="bg-slate-300 px-2 py-1 w-fit rounded-lg ml-1 font-bold">{data.project.status}</span></p>
        <p class="mb-2 text-gray-600 ml-3">{data.project.description}</p>
        <div class="flex flex-col items-start text-center -mt-1">
            <h3 class="my-2 ml-3 text-lg lg:text-xl font-bold text-gray-800"> Client Information</h3>
        <div className="border-2 border-gray-400 my-2 mb-4 ml-0 lg:ml-3 lg:mr-3 rounded " >
        <div className=" flex items-center justify-start lg:justify-center gap-0 lg:gap-3 px-4 border-b-2 p-2 border-gray-400 w-full"><span className="mr-2"><FaIdBadge/></span><span className="font-bold">{data.project.client.name}</span></div>
        <div className=" flex items-center justify-start lg:justify-center gap-0 lg:gap-3 px-4 border-b-2 p-2 border-gray-400 w-full"><span className="mr-2"><FaEnvelope/></span><span className="font-bold">{data.project.client.email}</span></div>
        <div className=" flex items-center justify-start lg:justify-center gap-0 lg:gap-3 px-4 p-2 w-full"><span className="mr-2"><FaPhone/></span><span className="font-bold">{data.project.client.phone}</span></div>
        
        </div>
        </div>
        <div class="flex justify-between items-center ">
        <Link class="mt-3 ml-3 mb-1 text-xs font-medium text-white px-4 py-2 rounded-md bg-slate-400 uppercase" to={`/projects`}>Back</Link>
        <button class="mt-3 ml-3 mb-1 text-xs font-medium text-white px-4 py-2 rounded-md bg-yellow-500 uppercase" onClick={handleUpdate}>Update/Edit</button>
        <DeleteProjectButton projectId={data.project.id}/>
        </div>
        </div>
        ):
        (
        <UpdateProjectForm project={data.project} onCloseUpdateForm={closeUpdateForm}/>
        )
        }
        
        
    </div>
      )
    }
    </>
  )
  
}

export default Project