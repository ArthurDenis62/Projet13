import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Layout from './components/Layout/Layout'
import Accueil from './page/Accueil'
import Signin from "./page/Signin";
import User from './page/User';

function App() {
  return (<>
      <BrowserRouter>
        <Layout />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/user/:id" element={<User />} />
        </Routes>
    </BrowserRouter>
  </>)
}

export default App
