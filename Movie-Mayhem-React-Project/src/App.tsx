import './App.css'
import { LikedFilmsProvider } from './provider/LikedFilmContext';
import { NotificationProvider } from './provider/NotificationContext';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import Particles from '../components/ui/particles'
import FilmSearchResult from './components/film_components/FilmSearchResult';
import LikedFilmsList from './components/LikedShows';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FilmDetails from './page/FilmDetails';
import { SearchProvider } from './provider/SearchedFilmTitleContext';
import ErrorPage from './page/ErrorPage';
import PageBarNavigation from './components/pageBarNavigation';
import LikedPage from './page/LikedPage';
import TvSeriesPage from './page/TvSeriesPage';
import SerieDetails from './page/SerieDetails';
import SectionTitle from './components/SectionTitle';
import FilmData from './components/film_components/FilmData';


function App() {



  return (
    <div className='overflow-hidden w-[99vw]'>
      <LikedFilmsProvider>
        <NotificationProvider>
          <SearchProvider>
            <Router>
              {/* Navbar Section */}
              <Navbar />
              <SearchBar />
              <PageBarNavigation />

              {/* Search Bar */}

              {/* Route */}
              <Routes>
                {/* Homepage  */}
                <Route path="/" element={
                  <>
                    <Particles className='w-full' quantity={500} />
                    <SectionTitle title="Search Results" />
                    <FilmSearchResult />
                    <FilmData type="upcoming" sectionTitle="Upcoming" />
                    <FilmData type="popular" sectionTitle="Popular" />
                    <FilmData type="now_playing" sectionTitle="Now Playing" />
                    <FilmData type="top_rated" sectionTitle="Top Rated" />
                    <LikedFilmsList />
                  </>
                } />

                {/* Route for film details */}
                <Route path="/film/:id" element={
                  <>
                    <Particles className='w-full' quantity={500} />
                    <FilmDetails />
                  </>

                } />

                {/* Route for serie details */}
                <Route path='/series/:id' element={
                  <>
                    <Particles className='w-full' quantity={500} />
                    <SerieDetails />
                  </>
                } />

                {/* add a route path for error page */}


                <Route path='/*' element={
                  <>
                    <Particles className='w-full' quantity={500} />
                    <ErrorPage />
                  </>
                } />

                {/* add a Route for Liked Page */}

                <Route path='/liked-list' element={
                  <>
                    <Particles className='w-full' quantity={500} />
                    <LikedPage />
                  </>
                } />

                {/* add a Route for TV Series */}

                <Route path='/tv-series' element={
                  <>
                    <Particles className='w-full' quantity={500} />
                    <TvSeriesPage />
                  </>
                } />



              </Routes>

              {/* Footer Part */}
              <Particles className='w-full' quantity={500} />
            </Router>
          </SearchProvider>
        </NotificationProvider>
      </LikedFilmsProvider>
    </div>
  );
}

export default App
