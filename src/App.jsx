import './App.css'
import { Routes, Route } from "react-router-dom"
import { ApolloProvider, ApolloClient, InMemoryCache, } from '@apollo/client'
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Project from './pages/Project';
import Header from './components/Header';
import Footer from './components/Footer';
import Clients from './components/Clients';
import Projects from './components/Projects';

const cache = new InMemoryCache({
  typePolicies:{
    Query:{
      fields:{
        clients:{
          merge(existing, incoming){
            return incoming;
          }
        },
        projects:{
          merge(existing, incoming){
            return incoming;
          }
        }
      }
    }
  }
})

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache
})

function App() {
  return (
    <>
    
    <Header />
      <ApolloProvider client={client}>
          <Routes>
          <Route path='/' element={<Home/>}/> 
          <Route path='/clients' element={<Clients/>}/>
          <Route path='/projects' element={<Projects/>}/>
          <Route exact path='projects/projects/:id' element={<Project/>}/> 
          <Route path='*' element={<NotFound/>}/>
          </Routes>
      </ApolloProvider>
      <Footer/>
    </>
  )
}

export default App
