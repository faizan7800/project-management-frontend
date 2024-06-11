import React, {useState} from 'react'
import {useMutation} from '@apollo/client'
import { ADD_CLIENT } from '../mutations/clientMutations'
import { GET_CLIENTS } from '../queries/clientQueries'
const AddClientModal = ({onClose}) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [checkSubmit, setCheckSubmit] = useState(false)

    const [addClient] = useMutation(ADD_CLIENT, {
      variables: {name, email, phone},
      update(cache, {data:{addClient}}){
       const {clients} = cache.readQuery({query: GET_CLIENTS});
       cache.writeQuery({
        query: GET_CLIENTS,
        data: {clients: [...clients, addClient]}
       })
      }
    } )

    const handleOnClose = (e)=>{
        if(e.target.id === 'container') onClose() 
    }

    const handleClose = ()=>{
      onClose()
    }
    function isValidEmail(email) {
      
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
  }

    const submitClient = (e)=>{
      
      e.preventDefault()
      if(isValidEmail(email) && name.length > 5 && phone.length > 7){
        addClient(name, email, phone)
        setCheckSubmit(true)
      }
      else{
        return alert('please fill proper values')
      }
    }
  return (

    <>
    <div id='container' onClick={handleOnClose} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center overflow-auto'>
    {checkSubmit === false ? <div className='bg-blue-500 text-white flex justify-center items-center flex-col gap-y-2 w-[800px] max-sm:w-[300px] rounded-lg py-4 px-6'>
      <h1 className='text-center py-3 px-2 font-bold tracking-wider text-white text-xl lg:text-3xl'>Add Client</h1>
       <input type="text" placeholder='Client Name' className='w-full text-blue-600 bg-white px-2 py-1 text-sm lg:text-xl border-2 border-gray-400 rounded-lg placeholder:text-blue-300 focus:outline-none' required value={name} onChange={(e)=> setName(e.target.value)}/>
       <input type="email" placeholder='example@email.com' className='w-full text-blue-600 bg-white px-2 py-1 text-sm lg:text-xl border-2 border-gray-400 rounded-lg placeholder:text-blue-300 focus:outline-none' required value={email} onChange={(e)=> setEmail(e.target.value)} />
       <input type="text" placeholder='123-345-6789' className='w-full text-blue-600 bg-white px-2 py-1 text-sm lg:text-xl border-2 border-gray-400 rounded-lg placeholder:text-blue-300 focus:outline-none'  required value={phone} onChange={(e)=> setPhone(e.target.value)}/>
       <input type="button" value="Save Client" className='bg-green-600 px-4 py-2 rounded-lg text-xs lg:text-xl font-bold tracking-wider hover:bg-green-700 cursor-pointer' onClick={submitClient}/>
    </div>:

    <div className='bg-blue-500 text-white flex justify-center items-center flex-col gap-y-2 w-[800px] max-sm:w-[300px] rounded-lg py-4 px-6'>
    <h1 className='text-center py-3 px-2 font-bold tracking-wider text-white text-xl lg:text-3xl'>Client Added Successfully</h1>
    <input type="button" value="Close" className='bg-red-600 px-4 py-2 rounded-lg text-xs lg:text-xl font-bold tracking-wider hover:bg-red-700 cursor-pointer' onClick={handleClose}/>
    </div>
    
    }
</div>
</>
  )
}

export default AddClientModal