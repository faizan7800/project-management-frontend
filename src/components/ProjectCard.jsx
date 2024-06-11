import {Link} from 'react-router-dom'

const ProjectCard = ({ project }) => {

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

    return (
        <div class="p-5 bg-white border-2 border-indigo-500 rounded-lg w-full">
            <div class="flex items-center -mt-1">
                <h3 class="my-2 ml-3 text-lg font-bold text-gray-800">{project.name}</h3>
            </div>
            <p class={`mt-3 mb-1 ml-3 text-xs font-medium ${statusColor(project.status)} uppercase`}><strong className="text-black">Project Status: </strong>{project.status}</p>
            <p class="mb-2 text-gray-600">{project.description}</p>

            <Link button class="mt-3 ml-3 mb-1 text-xs font-medium text-white px-4 py-2 rounded-md bg-pink-500 uppercase" to={`projects/${project.id}`}>View</Link>
        </div>
    )
}

export default ProjectCard