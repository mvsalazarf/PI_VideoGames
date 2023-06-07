import React, { useEffect } from 'react';
import st from './VgCard.module.css'
import { useState } from 'react';


export default function VgCard({ name, image, genres }) {

  const [genre, setGenre] = useState(genres.join(', '));

  // verifico si es un objeto proveniente de la base de datos, si lo es, lo convierto en string para setearlo en genre
  useEffect(() => {
    if (genres[0]?.id) {

      const genreObject = genres.map((genre) => genre.name)
      const stringGenre = genreObject.join(', ')
      setGenre(stringGenre)
    }
  }, []);


  return (
    <div className={st.div}>

      <div className={st.card}>
        <h4 className={st.h4}>{name}</h4>
        <p>{genre}</p>
        <img src={image} alt={name} className={st.image} />
      </div>

    </div>
  )
}
