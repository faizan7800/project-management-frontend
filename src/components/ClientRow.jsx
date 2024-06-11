import React from 'react'
import { useMutation } from '@apollo/client'
import { DELETE_CLIENT } from '../mutations/clientMutations'
import { GET_CLIENTS } from '../queries/clientQueries'

const ClientRow = ({client}) => {

  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: {id: client.id},
    // refetchQueries: [{query: GET_CLIENTS}]
    update(cache, {data: {deleteClient}}){
      const {clients} = cache.readQuery({query: GET_CLIENTS});
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {clients: clients.filter(client => client.id !== deleteClient.id)}
      })
    }
  })

  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   {client.name}
                </th>
                <td className="px-6 py-4">
                   {client.email}
                </td>
                <td className="px-6 py-4">
                    {client.phone}
                </td>
                <td className="px-6 py-4">
                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={deleteClient}>delete</a>
                </td>
            </tr>

            // 03510320009575
  )
}

export default ClientRow