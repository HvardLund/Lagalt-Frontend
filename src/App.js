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


function App() {
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
