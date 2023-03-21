import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FrontPage from './pages/frontpage';
import ProjectPage from './pages/projectpage'
import ProfilePage from './pages/profilepage'
import MyProfilePage from './pages/myProfilePage'
import Header from './components/header';
import DummyPage from './pages/dummy';
import KeycloakRoute from "./routes/KeycloakRoute";
import { ROLES } from "./const/roles";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <Header></Header>
          <Routes>
            <Route path="/" element={<FrontPage/>}/>
            <Route path="/project/:id" element={<KeycloakRoute role={ ROLES.User }><ProjectPage/></KeycloakRoute>}/>
            <Route path="/profile/me" element={<KeycloakRoute role={ROLES.User}><MyProfilePage/></KeycloakRoute>}/>
            <Route path="/profile/:username" element={<ProfilePage/>}/>
            <Route path="/dummy" element={<DummyPage/>}/>
            <Route path="*" element={<FrontPage/>}/>
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
