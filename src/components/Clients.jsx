import React, { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import ClientRow from './ClientRow'
import Spinner from '../assets/spinner.gif'
import AddClientModal from './AddClientModal'
import { GET_CLIENTS } from '../queries/clientQueries'

const Clients = () => {

    const {data, loading, error } = useQuery(GET_CLIENTS);
    const [showModel, setShowModel] = useState(false)

    const handleOnClose = ()=>{
        setShowModel(false);
    }
    const handleModal = ()=>{
        setShowModel(true)
    }
    if(loading){
        return <img src={Spinner} alt="" className='w-[150px] m-auto' />
    }
    if(error){
        return <h1 className='ml-6 text-xl lg:text-2xl'>Something went wrong...</h1>
    }

    

  return (
    <div >

    <button className='bg-green-700 text-white rounded py-2 px-4 my-2 ml-5 lg:ml-[4.3rem]' onClick={handleModal}>New Client</button>
    {
        !loading && !error && 
        

<div className="relative w-[90%] m-auto mb-8 overflow-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Client Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Email
                </th>
                <th scope="col" className="px-6 py-3">
                    Phone
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {
                data.clients.map((client)=>(
                      <ClientRow key={client.id} client={client}/>
                ))
            }
        </tbody>
    </table>
</div>

    }

{ showModel ?
<AddClientModal onClose={handleOnClose}/> :""}

</div>
  )
}

export default Clients