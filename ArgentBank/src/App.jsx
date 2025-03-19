import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Layout from './components/Layout/Layout'
import Accueil from './page/Accueil'
import Signin from "./page/Signin";

function App() {
  return (<>
      <BrowserRouter>
        <Layout />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
    </BrowserRouter>
  </>)
}

export default App
