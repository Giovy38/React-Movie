import './App.css'
import Navbar from './assets/components/Navbar'
import SearchBar from './assets/components/SearchBar'
import Particles from '../components/ui/particles'
import Footer from './assets/components/Footer'
import UpcomingFilmsSection from './assets/components/UpcomingFilmsSection'
import FilmSearchResult from './assets/components/FilmSearchResult'
import TopRatedFilms from './assets/components/TopRatedFilmSection'
import NowPlayingFilms from './assets/components/NowplayingFilmsSection'
import PoupularFilms from './assets/components/PopularFilmSection'



function App() {
  

  return (
    <div className=' overflow-hidden w-[99vw]'>
      {/* Navbar Section */}
      <Navbar />
      <SearchBar />
      <Particles className='w-full ' quantity={500}/> 
      {/* Films Section */}
      <FilmSearchResult />
      <UpcomingFilmsSection />
      <PoupularFilms />
      <NowPlayingFilms />
      <TopRatedFilms />
      {/* Footer Part */}
      <Particles className='w-full ' quantity={500}/> 
      <Footer />
    </div>
  )
}

export default App
