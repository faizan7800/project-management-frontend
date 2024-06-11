import { Link } from "react-router-dom"
const Home = () => {
  return (
    <div className="h-full">
    
      <h1 className='uppercase text-2xl lg:text-4xl text-pink-500 tracking-wide font-bold text-center'>welcome to project management application</h1>
        {/* <Projects/>
        <hr className='h-[2px] bg-gray-700 my-5  w-[96%] m-auto'/>
        <Clients/> */}
        <div className='w-[80%] m-auto flex justify-center items-center mt-10 gap-10'>
     <Link to={'/clients'} className="w-full"> <button className='text-2xl lg:text-5xl p-5 bg-pink-600 hover:bg-cyan-400 transition-all duration-500 text-white h-[100px] lg:h-[200px] w-[100%]'>Clients</button></Link>
     <Link to={'/projects'} className="w-full">
      <button className='text-2xl lg:text-5xl p-5 bg-pink-600 hover:bg-cyan-400 transition-all duration-500 text-white h-[100px] lg:h-[200px] w-[100%]'>Projects</button>
      </Link>
      </div>
    </div>
  )
}

export default Home