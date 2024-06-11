import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { GET_PROJECTS } from "../queries/projectQueries";
import { useMutation } from "@apollo/client";
import { DELETE_PROJECT } from "../mutations/projectMutations";
const DeleteProjectButton = ({projectId}) => {
  const navigate = useNavigate()

  const  [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: {id: projectId},
    onCompleted: ()=> navigate("/projects"),
    refetchQueries: [{query: GET_PROJECTS}]
  })


  return (
    <button class="mt-3 mb-1 text-xs font-medium text-white px-4 py-2 rounded-md bg-red-500 uppercase" onClick={deleteProject}>Delete</button>
  )
}

export default DeleteProjectButton