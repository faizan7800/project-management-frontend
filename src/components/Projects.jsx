import Spinner from '../assets/spinner.gif'
import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { GET_PROJECTS } from '../queries/projectQueries'
import ProjectCard from './ProjectCard'
import AddProjectModal from './AddProjectModal'
const Projects = () => {

    const {loading, error, data} = useQuery(GET_PROJECTS)
    const [showModel, setShowModel] = useState(false)

    const handleOnClose = ()=>{
        setShowModel(false);
    }
    const handleModal = ()=>{
        setShowModel(true)
    }

    if (loading) {
        return <img src={Spinner} alt="" className='w-[150px] m-auto' />
    }
    if (error) {
        return <h1 className='ml-6 text-xl lg:text-2xl'>Something went wrong...</h1>
    }
    return (
        <>
        <div className='mx-3'>
        <button className='bg-pink-700 text-white rounded-lg py-2 px-4 my-2' onClick={handleModal}>New Project</button>
            {
                data.projects.length > 0 ? (

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-3'>
                        {data.projects.map((project)=>(
                            <ProjectCard key={project.id} project={project}/>
                        ))}
                    </div>) : (<p> No Projects</p>)
            }

</div>
{ showModel ?
<AddProjectModal onClose={handleOnClose}/> :""}
        </>
    )
}

export default Projects