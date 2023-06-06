import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import getVgByName from '../../actions/getVgByName';
import style from './SearchBar.module.css'

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getVgByName(name));
    setName('');
  }

  return (
    <div className={style.nav}>
      <nav className={style.nav}>
        <div className={style.li}>
          <Link to='/'>
            <h3 className={style.h}>Start</h3>
          </Link>
        </div>

        <div className={style.li}>
          <Link to='/home'>
            <h3 className={style.h}>Home</h3>
          </Link>
        </div>

        <div className={style.li}>
          <input className={style.input} type="text" onChange={(e) => handleInputChange(e)} value={name} placeholder='Search by name' />
          <button onClick={(e) => handleSubmit(e)} type='submit' className={style.button}>Search</button>
        </div>

        <div className={style.li}>
          <Link to='/videogames'>
            <h3 className={style.h}>Create videogame</h3>
          </Link>
        </div>

      </nav>
    </div>
  )
};