import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css'
import getVideogames from "../../actions/getVideogames";




export default function LandingPage() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getVideogames())
  }, [dispatch])

  return (
    <div className={style.div}>
      <div className={style.container}>
        <div className={style.div2}> <h1 className={style.h1}>Welcome to the Videogame App, if you like videogames get in here</h1> </div>
        <Link to='/home'>
          <button className={style.button} type='submit'>ENTER APP</button>
        </Link>
      </div>
    </div>
  )
}