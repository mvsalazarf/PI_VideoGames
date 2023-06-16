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


  const [errors, setErrors] = useState({})
  function validate(input) {
    let errors = {}
    if (!input.name) {
      errors.name = 'Name is required'
    } else if (input.name.length > 20) {
      errors.name = 'Name is too long'
    } else if (!/^(?:[1-9]\d{0,2}(?:,\d{3})*|0)(?:\.\d+)?$/.test(input.rating) ||
      input.rating < 0 || input.rating > 10) {
      errors.rating = 'Wrong format for Rating. Should be a number between 0-10'
    } else if (!input.description.length) {
      errors.description = 'Description required'
    } else if (input.description.length > 200) {
      errors.description = 'Description too long, must not exceed 300 characters'
    } else if (!/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(input.released)) {
      errors.released = 'Wrong released date format. Should be YYYY-MM-DD OR YYYY-M-D'
    } else if (!input.released) {
      errors.released = 'released date required'
    } else if (input.genres.length === 0) {
      errors.genres = 'You must select at least one Genre'
    } else if (input.platform.length === 0) {
      errors.platform = 'You must select at least one platform'
    };
    return errors
  }


  const dispatch = useDispatch();
  const history = useHistory();
  let allGenres = useSelector((state) => state.genres)
  // const createVideoGame = useSelector((state) => state.createVg);
  const platform = ['playstation', 'xbox', 'pc', 'nintendo']

  useEffect(() => {
    dispatch(getgenres());
  }, [dispatch])

  function handleOnChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }
  function handleOnBlur(e) {
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
    setErrors(validate({
      ...input, [e.target.name]: e.target.value
    }))
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
    setErrors(validate({
      ...input, [e.target.name]: e.target.value
    }))

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(getVideogames());
    const vgCard = input;
    if (input.genres.length === 0) { return alert('Genre is required') }
    if (input.platform.length === 0) { return alert('Platform is required') }
    if (!vgCard.image) {
      vgCard.image = 'https://colombia.unir.net/wp-content/uploads/sites/4/2015/04/videojuegos_1920x1080.jpg';
    }
    // dispatch(createVg(vgCard))
    try {
      const { data } = await axios.post('http://localhost:3001/videogames', vgCard)
      alert(`The videogame ${input.name} has been added correctly`)

    } catch (error) {
      alert(error.response.data.error)

    }
    history.push('/home')
  }


  return (

    <div className={style.pageContainer}>

      <div className={style.wrapper}>
        <h1 className={style.h1}>Create your own videogame</h1>

        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.container}>
            <label className={style.name}> <b>Game Name:</b></label>
            <input className={style.name} onChange={handleOnChange} type='text' name='name' value={input.name} onBlur={handleOnBlur} />
            {/* {errors.name && (<p className={style.error}> {errors.name} </p>)} */}
          </div>
          <br />

          <div className={style.container}>
            <div className={style.label}>
              <label><b> Image:</b></label>
              <input onChange={handleOnChange} type='text' name='image' value={input.image} onBlur={handleOnBlur} />
            </div>
            <div className={style.img}>
              {
                input.image ?
                  <img src={input.image} alt={input.name} className={style.img} /> :
                  <>
                    <img src='https://colombia.unir.net/wp-content/uploads/sites/4/2015/04/videojuegos_1920x1080.jpg' alt={input.image} className={style.img} />
                  </>
              }
            </div>

          </div>

          <div className={style.msgarea}>
            <label className={style.labeldes}> <b>Description:</b></label>
            <textarea onChange={handleOnChange} type='text' name='description' value={input.description} onBlur={handleOnBlur} />
            {/* {errors.description && (<p className={style.error}> {errors.description} </p>)} */}
          </div>


          <div className={style.reles}>
            <label> <b>Released date:</b></label>
            <input onChange={handleOnChange} type='text' name='released' value={input.released}
              placeholder='YYYY-MM-DD' onBlur={handleOnBlur} />
            {/* {errors.released && (<p className={style.error}> {errors.released} </p>)} */}

          </div>

          <div className={style.rating}>
            <label><b>Rating:</b></label>
            <input onChange={handleOnChange}
              type='text' name='rating' value={input.rating} placeholder='ex 4.3' onBlur={handleOnBlur} />
            {/* {errors.rating && (<p className={style.error}> {errors.rating} </p>)} */}
          </div>
          <hr />
          <div>
            <label><b>Genres:</b></label>
            <div style={{ display: 'flex', maxWidth: 800, flexWrap: 'wrap', justifyContent: 'space-around' }}>
              {allGenres?.map(p => {
                return (<> <p><input onChange={handleGenres} key={p.id} id={p.id} type="checkbox" value={p.name} onBlur={handleOnBlur} /> {p.name}</p></>)
              })}
              {/* {errors.genres ? <p className={style.error}> {errors.genres} </p> : <> </>} */}
            </div>

          </div>
          <hr />
          <div>
            <label><b>Platforms:</b></label>
            <div style={{ display: 'flex', maxWidth: 800, flexWrap: 'wrap', justifyContent: 'space-around' }}>
              {platform?.map(p => {
                return (<> <p><input onChange={handlePlatform} key={p.platform} type="checkbox" value={p} onBlur={handleOnBlur} /> {p}</p></>)
              })}
              {/* {errors.platform && (<p className={style.error}> {errors.platform} </p>)} */}
            </div>
          </div>

          <hr />
          <div style={{ display: 'flex', justifyContent: 'space-evenly', maxHeight: 20 }}>
            <button type='submit' style={{ maxHeight: 20, }}><b>Add Game</b></button>
            <><Link to='/home'><button><b>Back To Home</b></button></Link> </>
          </div>
          {Object.keys(errors).length > 0 && (
            <div className={style.errorsContainer}>
              {Object.values(errors).map((errorMsg, index) => (
                <p key={index} className={style.error}>{errorMsg}</p>
              ))}
            </div>
          )}


        </form >
      </div >

    </div>
  )
}