import {useState} from 'react'
import {useMutation, useQuery} from '@apollo/client'
import { GET_CLIENTS } from '../queries/clientQueries'
import { GET_PROJECTS } from '../queries/projectQueries'
import { ADD_PROJECT } from '../mutations/projectMutations'
const AddProjectModal = ({onClose}) => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('new')
    const [clientId, setClientId] = useState('')
    const [checkSubmit, setCheckSubmit] = useState(false)


    // addProject

    const [addProject] = useMutation(ADD_PROJECT, {
        variables: {name, description, status, clientId},
        update(cache, {data: {addProject}}){
            const {projects} = cache.readQuery({query: GET_PROJECTS})
            cache.writeQuery({
                query: GET_PROJECTS,
                data: {projects: [...projects, addProject]}
            })
        }
    })

    // getClient for select

    const {loading, error, data} = useQuery(GET_CLIENTS)

    const handleOnClose = (e)=>{
        if(e.target.id === 'container') onClose() 
    }

    const handleClose = ()=>{
      onClose()
    }

    const submitProject = (e)=>{
      
      e.preventDefault()
      if( name.length > 5 && description.length > 10){
        addProject(name, description, status, clientId)
        setCheckSubmit(true)
      }
      else{
        return alert('please fill proper values')
      }
    }


    if(loading) return "loading";
    if(error) return "something went wrong...";
  return (

    <>
    {
    !loading && !error && (
        <div id='container' onClick={handleOnClose} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center overflow-auto z-10    '>
        {checkSubmit === false ? <div className='bg-pink-500 text-white flex justify-center items-center flex-col gap-y-2 w-[800px] max-sm:w-[300px] rounded-lg py-4 px-6'>
          <h1 className='text-center py-3 px-2 font-bold tracking-wider text-white text-xl lg:text-3xl'>New Project</h1>
           <input type="text" placeholder='Project Name' className='w-full text-pink-600 bg-white px-2 py-1 text-sm lg:text-xl border-2 border-gray-400 rounded-lg placeholder:text-blue-300 focus:outline-none' required value={name} onChange={(e)=> setName(e.target.value)}/>
           <textarea type="email" placeholder='Project Description' className='w-full text-pink-600 bg-white px-2 py-1 text-sm lg:text-xl border-2 border-gray-400 rounded-lg placeholder:text-blue-300 focus:outline-none' required value={description} onChange={(e)=> setDescription(e.target.value)} ></textarea>
           <div className='flex flex-col justify-start items-center gap-3 w-full'>
           <label className='text-white text-xl font-bold'>Status</label>
           <select id="status" className='w-full p-2 text-pink-600 rounded-lg focus:outline-none' value={status} onChange={(e)=>setStatus(e.target.value)} >  
           <option value="new">Not Started</option>
           <option value="progress">In Progress</option>
           <option value="completed">Completed</option>
           </select>
           </div>

           <div className='flex flex-col justify-start items-center gap-3 w-full'>
           <label className='text-white text-xl font-bold'>Client</label>
           <select id="status" className='w-full p-2 text-pink-600 rounded-lg focus:outline-none' value={clientId} onChange={(e)=>setClientId(e.target.value)} >  
           <option value="">Select Client</option>
           {data.clients.map((client)=>(
            <option key={client.id} value={client.id}>{client.name}</option>
           ))}
           </select>
           </div>
           <input type="button" value="Save Project" className='bg-green-600 px-4 py-2 rounded-lg text-xs lg:text-xl font-bold tracking-wider hover:bg-green-700 cursor-pointer' onClick={submitProject}/>
        </div>
        
        :
    
        <div className='bg-blue-500 text-white flex justify-center items-center flex-col gap-y-2 w-[800px] max-sm:w-[300px] rounded-lg py-4 px-6'>
        <h1 className='text-center py-3 px-2 font-bold tracking-wider text-white text-xl lg:text-3xl'>Project Added Successfully</h1>
        <input type="button" value="Close" className='bg-red-600 px-4 py-2 rounded-lg text-xs lg:text-xl font-bold tracking-wider hover:bg-red-700 cursor-pointer' onClick={handleClose}/>
        </div>
        
        }
    </div>
    )
}
   
</>
  )
}

export default AddProjectModal