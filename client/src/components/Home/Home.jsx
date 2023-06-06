import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import getVideogames from '../../actions/getVideogames'
import SearchBar from "../SearchBar/SearchBar";
import Paging from '../Paging/Paging';
import VgCard from '../VgCard/VgCard';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import genreFilter from '../../actions/genreFilter'
import filteredGames from '../../actions/filteredGames'
import vgOrigin from '../../actions/vgOrigin'


export default function Home() {

  const dispatch = useDispatch();
  const allVg = useSelector((state) => state.videogames);
  const allGenres = useSelector((state) => state.genres);
  const [currentPage, setcurrentPage] = useState(1);
  const [vgPerPage, setvgPerPage] = useState(15);
  const lastVgIndex = currentPage * vgPerPage;
  const firstVgIndex = lastVgIndex - vgPerPage;
  const currentVgs = allVg.slice(firstVgIndex, lastVgIndex);
  const [render, setRender] = useState('');


  const actualPage = (pageNumber) => {
    setcurrentPage(pageNumber)
  }

  function handleGenreFilter(e) {
    e.preventDefault();
    dispatch(genreFilter(e.target.value))
  }

  function handleSortedGames(e) {
    e.preventDefault();
    dispatch(filteredGames(e.target.value))
    setRender(`Order ${e.target.value}`)
  }

  function handleOrigin(e) {
    dispatch(vgOrigin(e.target.value))
    setcurrentPage(1)
  }

  useEffect(() => {
    dispatch(getVideogames())
  }, [dispatch])

  if (allVg.length === 0) {
    return <h1>Loading...</h1>
  }

  return (
    <div>

      <div>

        <div>
          <SearchBar />
        </div>

        <div>
          <select onChange={(e) => handleGenreFilter(e)}>
            {
              allGenres.sort().map((genre) => {
                return <option value={genre}>{genre}</option>
              })
            }
          </select>
        </div>

        <div>
          <select onChange={e => handleSortedGames(e)} onBlur={e => handleSortedGames(e)}>
            <option value='asc'>SORT</option>
            <option value='desc'>Backward</option>
            <option value='rating'>Rating</option>
          </select>
        </div>

        <div>
          <select onChange={e => handleOrigin(e)}>
            <option value='All'>Api and DB Games</option>
            <option value='DB'>Db Games</option>
            <option value='API'>Api Games</option>
          </select>
        </div>

        <div>
          <Paging vgPerPage={vgPerPage} allVg={allVg.length} currentPage={currentPage} actualPage={actualPage} />
        </div>

        <div>
          {/* Mapeo de los videojuegos de la página actual */}
          {currentVgs && currentVgs.map((vg) => (
            <div key={vg.id}>
              <Link to={`/videogames/${vg.id}`}>
                <VgCard
                  name={vg.name}
                  image={vg.image}
                  genres={vg.genres}
                />
              </Link>
            </div>
          ))}
          {!currentVgs && (
            <div>
              <h1>loading...</h1>
            </div>
          )}
        </div>


      </div>
    </div>
  )
}

