import Routes from "./Routes/routers"
import PublicRoutes from "./Routes/publicRoutes"
import GeneralRoutes from "./Routes/generalRoutes"
import {AuthContext} from "./Auth/index"  
import React,{useState,useEffect} from "react"
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';


const App = () => {

      const [user, setUser] = useState({
        isAuthenticated: false,
        authToken: ''
      })

    const authenticate = token => {
        localStorage.setItem('auth_token', JSON.stringify(token))
        setUser({
            isAuthenticated: true,
            authToken: token
        })
    }

    const logout = () => {
        localStorage.removeItem('auth_token')
        setUser({
            isAuthenticated: false,
            authToken: ''
        })
    }

    useEffect(() => {
        if (localStorage.getItem('auth_token')) {
            const authToken = JSON.parse(localStorage.getItem('auth_token'))
            authenticate(authToken)
        }
    }, [user.isAuthenticated, user.authToken])

    const client = new ApolloClient({
      link: new HttpLink({ 
        uri: 'http://127.0.0.1:8000/graphql/',
        headers: {Authorization: `JWT ${user.authToken}`}
       }),
      cache: new InMemoryCache(),
    });


  const RouterReturn = () =>{

    if(window.location.href.split("/url/").length == 1){

      if(user.isAuthenticated){
        return <Routes />
      }else{
        return <PublicRoutes />
      }

    }else{
      return <GeneralRoutes />
    }
  }

  return (
    <div className="container mt-5">
       <AuthContext.Provider value={{user, authenticate, logout}} >
          <ApolloProvider client={client}>
            <RouterReturn />
          </ApolloProvider>
       </AuthContext.Provider>
    </div>
  )
}

export default App;