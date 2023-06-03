import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Contextherartnat from "./contextnature";

import Home from "./views/Home";
import Favoritos from "./views/Favoritos";

export default function App() {
  const endpoint = "/fotos.json";
  const [fotos, setFotos] = useState([]);

  const getFotos = async () => {
    try {
      const res = await fetch(endpoint);
      const { photos } = await res.json();
      const mappedPhotos = photos.map((photo) => ({
        id: photo.id,
        src: photo.src.large,
        desc: photo.alt,
        favorito: false,
      }));
      setFotos(mappedPhotos);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  useEffect(() => {
    getFotos();
  }, []);

  const globalState = { fotos, setFotos };

  return (
    <div className="App">
      <Contextherartnat.Provider value={globalState}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favoritos" element={<Favoritos />} />
          </Routes>
        </BrowserRouter>
      </Contextherartnat.Provider>
    </div>
  );
}
