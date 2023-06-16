import { Link } from 'react-router-dom';
import style from './LandingPage.module.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import getVideogames from '../../actions/getVideogames';

export default function LandingPage() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getVideogames())
  }, [dispatch])

  return (
    <div className={style.div}>
      <div className={style.container}>
        <div className={style.div2}>
          <h1 className={`${style.h1} ${style.fadeIn}`}>If you like videogames get in here</h1>
        </div>
        <Link to="/home">
          <button className={`${style.button} ${style.buttonScale}`} type="submit">
            ENTER APP
          </button>
        </Link>
      </div>
    </div>
  );
}