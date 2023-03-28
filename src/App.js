import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FrontPage from './pages/frontpage'
import ProjectPage from './pages/projectpage'
import ProfilePage from './pages/profilepage'
import EditProjectPage from './pages/editProjectpage'
import NewProjectPage from './pages/newProjectPage'
import MyProfilePage from './pages/myProfilePage'
import Header from './components/header'
import KeycloakRoute from "./routes/KeycloakRoute"
import { ROLES } from "./const/roles"
import { useDispatch } from "react-redux";
import keycloak from './keycloak';
import { useEffect } from 'react';
import { addProjects, updateUser } from './redux-parts/userSLice';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      try{
          const response = await fetch(`https://lagalt-bckend.azurewebsites.net/api/users/${keycloak.tokenParsed.sub}`, {
              headers: {Authorization: `Bearer ${keycloak.token}`, 'Content-Type': 'application/json'}
          }
          )
          if(!response.ok){
              throw new Error('User could not be loaded')
          }
          const data = await response.json()
          dispatch(updateUser(data))
      }
      catch(error){
          console.log([error.message,[]])
      }
    }
    getUser()
  },[dispatch])

  useEffect(() => {
    const getOwnedProjects = async () => {
        try{
            const response = await fetch(`https://lagalt-bckend.azurewebsites.net/api/users/${keycloak.tokenParsed.sub}/OwnedProjects`)
            if(!response.ok){
                throw new Error('Could not find your projects')
            }
            const data = await response.json()
            console.log(data.map(project => project.id))
            dispatch(addProjects({projects: data.map(project => project.id)}))
        }
        catch(error){
            return[error.message,[]]
        }
    }
    getOwnedProjects()
  },[dispatch])
  
  return (
    <BrowserRouter>
      <div className="App">
          <Header></Header>
          <Routes>
            <Route path="/" element={<FrontPage/>}/>
            <Route path="/project/:id" element={<ProjectPage/>}/>
            <Route path="/project/:id/edit" element={<KeycloakRoute role={ ROLES.User }><EditProjectPage/></KeycloakRoute>}/>
            <Route path="/project/new" element={<KeycloakRoute role={ ROLES.User }><NewProjectPage/></KeycloakRoute>}/>
            <Route path="/profile/me" element={<KeycloakRoute role={ROLES.User}><MyProfilePage/></KeycloakRoute>}/>
            <Route path="/profile/:username" element={<ProfilePage/>}/>
            <Route path="*" element={<FrontPage/>}/>
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
