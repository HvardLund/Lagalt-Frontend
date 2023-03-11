import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//import FrontPage from './pages/frontpage/frontpage';
import StartPage from './pages/startpage/startpage';
import ProfilePage from './pages/profilepage/profilepage';
import KeycloakRoute from "./routes/KeycloakRoute";
import { ROLES } from "./const/roles";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      
          <Routes>
            <Route path="/" element={<StartPage/>}/>
            <Route path="/profile" element={<KeycloakRoute role={ ROLES.User }><ProfilePage/></KeycloakRoute>}/>
            <Route path="*" element={<StartPage/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
