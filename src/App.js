import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FrontPage from './pages/frontpage/frontpage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <Routes>
            <Route path="/" element={<FrontPage/>}/>
            <Route path="*" element={<FrontPage/>}/>
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
