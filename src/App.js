import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';
import Conference from './Pages/Conference';

import { Route, Link, Routes, BrowserRouter } from 'react-router-dom';

import ZoomMtgEmbedded from '@zoomus/websdk/embedded'

// import Zoom from './Zoom';

function App() {

  


  return (
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/konsultasi' element={<Conference/>} />
      </Routes>
  );
}

export default App;
