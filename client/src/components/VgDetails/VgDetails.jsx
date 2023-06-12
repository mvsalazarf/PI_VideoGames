import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import getVgById from '../../actions/getVgById';
import style from './VgDetails.module.css'
import { useParams } from 'react-router-dom';
import { strictEqual } from 'assert';






export default function VgDetails() {
  const dispatch = useDispatch();
  const vgByIdSelect = useSelector((state) => state.videogameDetails)
  const { id } = useParams();

  const [defaultImage, setDefaultImage] = useState('https://play-lh.googleusercontent.com/xTAR-qIdqOBZJzQhx1IJsJgMc0kVsNGnxG-LdqVnuOgibZpqFwmKh6DcTeiuXBWCwcw');
  useEffect(() => {
    dispatch(getVgById(id))
  }, [])

  var detail = useSelector((state) => state.videogameDetails)

  useEffect(() => {
    if (detail.image !== null) {
      setDefaultImage(detail.image)
    }
  }, [detail])

  return (
    <div className={style.wrapper}>
      {
        !vgByIdSelect.id ? <h1 style={{
          display: 'flex', justifyContent: 'space-around'
        }}>Loading...</h1> :
          (
            <>
              <div className={style.wrapper}>
                <div className={style.divs}>

                  <h2 style={{ color: 'darksalmon' }}>{detail.name}</h2>
                  <img src={detail.image ? detail.image : defaultImage} className={style.img} alt='no imag found' width='250px' height='300px' />
                </div>
                <hr />

                <div style={{ maxWidth: 400 }}>
                  <h3><b style={{ color: 'darksalmon' }}>Description:</b></h3>
                  <div dangerouslySetInnerHTML={{ __html: detail.description }}></div>
                </div>

                <hr />


                <div className={style.divs}>
                  <h4><b style={{ color: 'darksalmon' }}>Rating:</b> {detail.rating}</h4>
                </div>

                <hr />
                <hr />

                <div className={style.divs}>
                  <h4><b style={{ color: 'darksalmon' }}>Released date:</b> {detail.released}</h4>
                </div>

                <hr />
                <hr />

                <div style={{ maxWidth: 200 }}>
                  <h4><b style={{ color: 'darksalmon' }}>Genres:</b> {detail.genres}</h4>
                  <h4> <b style={{ color: 'darksalmon' }}>Platforms:</b> {detail?.platforms}{detail?.platform}</h4>
                </div>
              </div>
            </>
          )
      }

      <hr />
      <Link to='/home' > <b style={{ color: 'tomato', backgroundColor: 'bisque' }}>Back Home</b> </Link>
    </div >
  )
}