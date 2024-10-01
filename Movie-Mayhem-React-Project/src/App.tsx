import './App.css'
import { LikedFilmsProvider } from './assets/context/LikedFilmContext';
import { NotificationProvider } from './assets/context/NotificationContext';
import Navbar from './assets/components/Navbar'
import SearchBar from './assets/components/SearchBar'
import Particles from '../components/ui/particles'
import Footer from './assets/components/Footer'
import UpcomingFilmsSection from './assets/components/UpcomingFilmsSection'
import FilmSearchResult from './assets/components/FilmSearchResult'
import TopRatedFilms from './assets/components/TopRatedFilmSection'
import NowPlayingFilms from './assets/components/NowplayingFilmsSection'
import PopularFilms from './assets/components/PopularFilmSection'
import LikedFilmsList from './assets/components/LikedFilm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import FilmDetails from './assets/page/FilmDetails';


function App() {
  

  return (
    <div className='overflow-hidden w-[99vw]'>
      <LikedFilmsProvider>
        <NotificationProvider>
          <Router>
            {/* Navbar Section */}
            <Navbar />
            <SearchBar />
            <Particles className='w-full' quantity={500} />

            {/* Definisci le Route */}
            <Routes>
              {/* Homepage con tutte le sezioni dei film */}
              <Route path="/" element={
                <>
                  <FilmSearchResult />
                  <UpcomingFilmsSection />
                  <PopularFilms />
                  <NowPlayingFilms />
                  <TopRatedFilms />
                  <LikedFilmsList />
                </>
              } />

              {/* Route per i dettagli di un film specifico */}
              <Route path="/film/:id" element={<FilmDetails />} />

              {/* Aggiungi altre pagine o route personalizzate se necessario */}
            </Routes>

            {/* Footer Part */}
            <Particles className='w-full' quantity={500} />
            <Footer />
          </Router>
        </NotificationProvider>
      </LikedFilmsProvider>
    </div>
  );
}

export default App
