import "../assets/css/galeria.css";
import Heart from "../components/Heart";
import Contextherartnat from "../contextnature";
import { useContext } from "react";

export default function Favoritos() {
  const { fotos, setFotos } = useContext(Contextherartnat);

  const setFavorito = (id) => {
    const updatedFotos = fotos.map((foto) => {
      if (foto.id === id) {
        return {
          ...foto,
          favorito: !foto.favorito,
        };
      }
      return foto;
    });

    setFotos(updatedFotos);
  };

  const favoritos = fotos.filter((foto) => foto.favorito);

  return (
    <div>
      <h1>Fotos favoritas</h1>
      <div className="p-3 galeria grid-columns-5">
        {favoritos.map((foto) => (
          <div
            className="foto"
            style={{ backgroundImage: `url(${foto.src})` }}
            key={foto.id}
            onClick={() => setFavorito(foto.id)}
          >
            <Heart filled={foto.favorito} />
            <p>{foto.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
