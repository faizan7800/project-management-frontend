import { useMutation } from "@apollo/client"
import { GET_PROJECT } from "../queries/projectQueries"
import { useState } from "react"
import { UPDATE_PROJECT } from "../mutations/projectMutations"
const UpdateProjectForm = ({project, onCloseUpdateForm}) => {

    const [name, setName] = useState(project.name)
    const [description, setDescription] = useState(project.description)
    const [status, setStatus] = useState('')

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: {id: project.id, name, description, status },
        refetchQueries: [{query: GET_PROJECT, variables:{id: project.id}}]
    })
    const onSubmit = (e)=>{
        e.preventDefault()
        if(!name || !description || !status){
            return alert('please input the values');
        }
        updateProject(name, description, status);
        onCloseUpdateForm()
    }

    const closeUpdateForm = ()=>{
        onCloseUpdateForm()
    }

  return (
    <form onSubmit={onSubmit}>
        <h1 className='text-center py-3 px-2 font-bold tracking-wider text-black text-xl lg:text-3xl'>Update Project Details</h1>
         <input type="text" placeholder='Project Name' className='w-full text-black bg-white px-2 py-1 text-sm lg:text-xl border-2 border-gray-400 rounded-lg placeholder:text-blue-300 focus:outline-none my-2' required value={name} onChange={(e)=> setName(e.target.value)}/>
           <textarea type="email" placeholder='Project Description' className='w-full text-black bg-white px-2 py-1 text-sm lg:text-xl border-2 border-gray-400 rounded-lg placeholder:text-blue-300 focus:outline-none' required value={description} onChange={(e)=> setDescription(e.target.value)} ></textarea>
           <div className='flex flex-col justify-start items-center gap-3 w-full'>
           <select id="status" className='border-2 border-gray-400 w-full p-2 text-black rounded-lg focus:outline-none' value={status} onChange={(e)=>setStatus(e.target.value)} >  
           <option value="">Select Status</option>
           <option value="new">Not Started</option>
           <option value="progress">In Progress</option>
           <option value="completed">Completed</option>
           </select>
           </div>
           <div className="w-full my-2">
           <input type="submit" className=" rounded font-bold m-auto bg-black text-white p-2" value="Update" />
           <button onClick={closeUpdateForm} className="rounded font-bold m-auto bg-blue-500 text-white p-2 mx-2">Cancel
            </button>
           </div>
    </form>
  )
}

export default UpdateProjectForm