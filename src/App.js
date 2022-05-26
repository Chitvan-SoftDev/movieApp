import NavBar from './1_components/NavBar';
import Banner from './1_components/Banner';
import MovieList from './1_components/MovieList';
import './App.css';
import Favourites from './1_components/Favourites';
import { BrowserRouter, Routes, Route } from 'react-router-dom'//used to create routing

function App() {
  return (
    <BrowserRouter>

      <NavBar />
      <Routes>
        <Route path='/' element={
          <>
            <Banner />
            <MovieList />
          </>
        } />
        <Route path='/fav' element={
          <Favourites />
        } />
      </Routes>

    </BrowserRouter>

  );
}

export default App;
