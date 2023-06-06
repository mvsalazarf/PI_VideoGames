import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import getVgById from '../../actions/getVgById';
import style from './VgDetails.module.css'
import { useParams } from 'react-router-dom';






export default function VgDetails() {
  const dispatch = useDispatch();
  const vgByIdSelect = useSelector((state) => state.videogameDetails)
  const { id } = useParams();

  useEffect(() => {
    dispatch(getVgById(id))
  }, [])

  var detail = useSelector((state) => state.videogameDetails)
  console.log(detail)

  return (
    <div className={style.wrapper}>
      {
        !vgByIdSelect.id ? <h1>Loading...</h1> :
          (
            <>
              <div className={style.divs}>

                <h2>{detail.name}</h2>
                <img src={detail.image} alt='no imag found' width='250px' height='300px' />
              </div>

              <div className={style.divs}>
                <h3>Description:</h3>
                <h5>{detail.description}</h5>
              </div>

              <div className={style.divs}>
                <h4>Rating: {detail.rating}</h4>
              </div>

              <div className={style.divs}>
                <h4>Released date: {detail.released}</h4>
              </div>

              <div className={style.divs}>
                <h4>Genres: {detail.genres}</h4>
                <h4>Platforms: {detail.platforms}</h4>
              </div>
            </>
          )
      }

      <Link to='/home'>Home</Link>
    </div>
  )
}