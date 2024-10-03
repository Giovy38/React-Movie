import './App.css'
import { LikedFilmsProvider } from './assets/provider/LikedFilmContext';
import { NotificationProvider } from './assets/provider/NotificationContext';
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
import { SearchProvider } from './assets/provider/SearchedFilmTitleContext';
import ErrorPage from './assets/page/ErrorPage';


function App() {
  

  return (
    <div className='overflow-hidden w-[99vw]'>
      <LikedFilmsProvider>
        <NotificationProvider>
          <SearchProvider>
          <Router>
            {/* Navbar Section */}
            <Navbar />
           

            {/* Definisci le Route */}
            <Routes>
              {/* Homepage con tutte le sezioni dei film */}
              <Route path="/" element={
                <>
                 <SearchBar />
                 <Particles className='w-full' quantity={500} />
                  <FilmSearchResult />
                  <UpcomingFilmsSection />
                  <PopularFilms />
                  <NowPlayingFilms />
                  <TopRatedFilms />
                  <LikedFilmsList />
                </>
              } />

              {/* Route per i dettagli di un film specifico */}
              <Route path="/film/:id" element={
                <>
                  <Particles className='w-full' quantity={500} />
                  <FilmDetails />
                </>
                
                } />

              {/* Aggiungi altre pagine o route personalizzate se necessario */}

                {/* add a route path for error page */}
                <Route path='/*' element={
                  <>
                  <Particles className='w-full' quantity={500} />
                  <ErrorPage />
                </>
                  }>
                </Route>

            </Routes>

            {/* Footer Part */}
            <Particles className='w-full' quantity={500} />
            <Footer />
          </Router>
          </SearchProvider>
        </NotificationProvider>
      </LikedFilmsProvider>
    </div>
  );
}

export default App
