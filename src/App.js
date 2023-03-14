import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FrontPage from './pages/frontpage';
import ProjectPage from './pages/projectpage'
import Header from './components/header';
import DummyPage from './pages/dummy';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <Header></Header>
          <Routes>
            <Route path="/" element={<FrontPage/>}/>
            <Route path="/project" element={<ProjectPage/>}/>
            <Route path="/dummy" element={<DummyPage/>}/>
            <Route path="*" element={<FrontPage/>}/>
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
