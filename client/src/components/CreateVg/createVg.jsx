import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import createVg from '../../actions/createVg'
import getVideogames from '../../actions/getVideogames';
import style from './createVg.module.css'
import getgenres from '../../actions/getGenres';
import axios from 'axios';



export default function CreateVg() {

  const [input, setInput] = useState({
    name: '',
    image: '',
    description: '',
    released: '',
    rating: 0,
    platform: [],
    genres: [],
  });

  function validate(input) {
    let errors = {}
    if (!input.name) {
      errors.name = 'Name is required'
    } else if (!input.rating || input.rating < 0 || input.rating > 10) {
      errors.rating = 'Rating must be a nummber between 0-10'
    } else if (!input.description.length || input.description.length > 50) {
      errors.description = 'Description missing or too long'
    }
    return errors
  };


  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState({})
  let allGenres = useSelector((state) => state.genres)


  const platform = ['playstation', 'xbox', 'pc', 'nintendo']

  useEffect(() => {
    dispatch(getgenres());
  }, [dispatch])

  function handleOnChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setErrors(validate({
      ...input, [e.target.name]: e.target.value
    }))
  }

  function handlePlatform(e) {
    const selectedPlatform = e.target.value;

    // Verificar si el género ya está seleccionado
    const isPlatformSelected = input.platform.includes(selectedPlatform);

    // Actualizar el estado según si se agrega o se elimina el género seleccionado
    if (isPlatformSelected) {
      setInput({
        ...input,
        platform: input.platform.filter(p => p !== selectedPlatform)
      });
    } else {
      setInput({
        ...input,
        platform: [...input.platform, selectedPlatform]
      });
    }
  }

  function handleGenres(e) {
    const selectedGenre = e.target.value;

    // Verificar si el género ya está seleccionado
    const isGenreSelected = input.genres.includes(selectedGenre);

    // Actualizar el estado según si se agrega o se elimina el género seleccionado
    if (isGenreSelected) {
      setInput({
        ...input,
        genres: input.genres.filter(genre => genre !== selectedGenre)
      });
    } else {
      setInput({
        ...input,
        genres: [...input.genres, selectedGenre]
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(input.released)) { return alert('Wrong released date format. Should be YYYY-MM-DD OR YYYY-M-D') }
    if (!input.rating) { return alert('Rating is required') }
    if (!/^(?:[1-9]\d{0,2}(?:,\d{3})*|0)(?:\.\d+)?$/.test(input.rating) ||
      input.rating < 0 || input.rating > 10) {
      return alert('Wrong format for Rating. Should be a number between 0-10')
    }


    dispatch(createVg(input));
    dispatch(getVideogames());
    alert(`The videogame ${input.name} has been added correctly`)
    setInput({
      name: '',
      image: '',
      description: '',
      released: '',
      rating: 0,
      platform: [],
      genres: [],
    })
    history.push('/home')
  }


  return (
    <>

      <div className={style.wrapper}>
        <h1 className={style.h1}>Create your own videogame</h1>

        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.container}>
            <label className={style.name}> <b>Game Name:</b></label>
            <input className={style.name} onChange={handleOnChange} onBlur={handleOnChange}
              type='text' name='name' value={input.name} />
            {errors.name && (<p className={style.error}> {errors.name} </p>)}
          </div>
          <br />

          <div className={style.container}>
            <div className={style.label}>
              <label><b> Image:</b></label>
              <input onChange={handleOnChange} type='text' name='image' value={input.image} />
            </div>
            <div className={style.img}>
              {
                input.image ?
                  <img src={input.image} alt={input.name} className={style.img} /> :
                  <>
                  </>
              }
            </div>

          </div>

          <div className={style.msgarea}>
            <label className={style.labeldes}> <b>Description:</b></label>
            <textarea onChange={handleOnChange} type='text' name='description' value={input.description} />
          </div>


          <div className={style.reles}>
            <label> <b>Released date:</b></label>
            <input onChange={handleOnChange} type='text' name='released' value={input.released}
              placeholder='YYYY-MM-DD' />
          </div>

          <div className={style.rating}>
            <label><b>Rating:</b></label>
            <input onChange={handleOnChange} onBlur={handleOnChange}
              type='text' name='rating' value={input.rating} placeholder='ex 4.3' />
            {errors.rating && (<p className={style.error}> {errors.rating} </p>)}
          </div>
          <hr />
          <div>
            <label><b>Genres:</b></label>
            <div style={{ display: 'flex', maxWidth: 800, flexWrap: 'wrap', justifyContent: 'space-around' }}>
              {allGenres?.map(p => {
                return (<> <p><input onChange={handleGenres} key={p.id} id={p.id} type="checkbox" value={p.name} /> {p.name}</p></>)
              })}
            </div>

          </div>
          <hr />
          <div>
            <label><b>Platforms:</b></label>
            <div style={{ display: 'flex', maxWidth: 800, flexWrap: 'wrap', justifyContent: 'space-around' }}>
              {platform?.map(p => {
                return (<> <p><input onChange={handlePlatform} key={p} type="checkbox" value={p} /> {p}</p></>)
              })}
            </div>
          </div>

          <hr />
          <div style={{ display: 'flex', justifyContent: 'space-evenly', maxHeight: 20 }}>
            <button type='submit' style={{ maxHeight: 20, }}><b>Add Game</b></button>
            <><Link to='/home'><button><b>Back To Home</b></button></Link> </>
          </div>


        </form >
      </div >

    </>
  )
}