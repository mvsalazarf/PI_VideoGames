import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import getVgById from '../../actions/getVgById';
import style from './VgDetails.module.css'
import { useParams } from 'react-router-dom';






export default function VgDetails() {
  const dispatch = useDispatch();
  const vgByIdSelect = useSelector((state) => state.videogameDetails)
  const { id } = useParams();

  const [defaultImage, setDefaultImage] = useState('https://play-lh.googleusercontent.com/xTAR-qIdqOBZJzQhx1IJsJgMc0kVsNGnxG-LdqVnuOgibZpqFwmKh6DcTeiuXBWCwcw');
  useEffect(() => {
    dispatch(getVgById(id))
  }, [])

  var detail = useSelector((state) => state.videogameDetails)
  const [loading, setLoading] = useState({
    loading: true
  })



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
                <div className={style.divs} style={{ marginLeft: 20, marginTop: 100, marginRight: 20 }} >

                  <h2 style={{ color: 'darksalmon' }}>{detail.name}</h2>
                  <img src={detail.image ? detail.image : defaultImage} className={style.img} alt='no imag found' width='250px' height='300px' />
                </div>
                <hr />

                <div style={{ maxWidth: 400, marginLeft: 20, marginTop: 100, marginRight: 20 }}>
                  <h3><b style={{ color: 'darksalmon' }} className={style.h}>Description:</b></h3>
                  <div dangerouslySetInnerHTML={{ __html: detail.description }} style={{ color: 'white' }}></div>
                </div>

                <hr />


                <div className={style.divs} style={{ marginLeft: 20, marginTop: 100, marginRight: 20 }}>
                  <h4><b style={{ color: 'darksalmon' }} className={style.h}>Rating:</b> <div style={{ color: 'white' }}>{detail.rating}</div></h4>
                </div>

                <hr />
                <hr />
                <br />

                <div className={style.divs} style={{ marginLeft: 20, marginTop: 100, marginRight: 20 }}>
                  <h4><b style={{ color: 'darksalmon' }} className={style.h}>Released date:</b> <div style={{ color: 'white' }}>{detail.released}</div></h4>
                </div>

                <hr />
                <hr />

                <div style={{ maxWidth: 200, marginLeft: 20, marginTop: 100, marginRight: 20 }} >
                  <h4><b style={{ color: 'darksalmon' }} className={style.h}>Genres:</b> <div style={{ color: 'white' }}>{detail.genres}</div></h4>
                  <h4> <b style={{ color: 'darksalmon' }} className={style.h}>Platforms:</b><div style={{ color: 'white' }}>{detail?.platforms}</div></h4>
                </div>
              </div>
            </>
          )
      }

      <hr />
      <div style={{ marginRight: 100, fontSize: 30, marginLeft: 20, marginTop: 100 }}>
        <Link to='/home' > <b style={{ color: 'bisque' }} className={style.h}>Back Home</b> </Link>
      </div>
    </div >
  )
}