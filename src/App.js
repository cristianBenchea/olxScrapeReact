import { useState } from 'react';
import './App.css';
import Anunt from './components/Anunt/Anunt';
import Header from './components/Header/Header';
import favoritesJSON from './scrapedFavorites.json';
import anunturiJSON from './scrapedAnunturi.json';

function App() {
  const [anunturiArray, setAnunturi] = useState(favoritesJSON);

  const sortBy = (arr, ascDesc, field) => {
    const sorted = arr.sort((a, b) => {
      let tempA;
      let tempB;
      if(field === 'price') {
        tempA = parseInt(a[field].replace(" ", "").replace("€", ""));
        tempB = parseInt(b[field].replace(" ", "").replace("€", ""));
      } else if (field === 'year') {
        tempA = parseInt(a.yearAndKm.substring(0,4));
        tempB = parseInt(b.yearAndKm.substring(0,4));
      } else if (field === 'km') {
        let kIndexA = a.yearAndKm.indexOf('k');
        let kIndexB = b.yearAndKm.indexOf('k');
        tempA = parseInt(a.yearAndKm.substring(7,kIndexA).replaceAll(" ", ""));
        tempB = parseInt(b.yearAndKm.substring(7,kIndexB).replaceAll(" ", ""));
      }

      if(tempA > tempB) {
        if(ascDesc === 'asc') {
          return 1;
        } return -1;
      }
      if(tempB > tempA) {
        if(ascDesc === 'asc') {
          return -1;
        } return 1;
      }
      return 0;
    });
    
    setAnunturi(sorted);
  }

  const changeAnunturi = (categorie) => {
    if(categorie === 'favorites') {
      setAnunturi(favoritesJSON);
    } else if (categorie === 'anunturi') {
      setAnunturi(anunturiJSON);
    }
  }

  return (
    <div className="App">
        <Header />
        <div className='container mx-auto'>
          <div className='flex justify-center space-x-4 font-sans mt-4'>
            <button className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' onClick={() => sortBy([...anunturiArray], 'asc', 'price')}>Sort price Asc</button>
            <button className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' onClick={() => sortBy([...anunturiArray], 'desc', 'price')}>Sort price Desc</button>
            <button className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' onClick={() => sortBy([...anunturiArray], 'asc', 'year')}>Sort Year Asc</button>
            <button className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' onClick={() => sortBy([...anunturiArray], 'desc', 'year')}>Sort Year Desc</button>
            <button className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' onClick={() => sortBy([...anunturiArray], 'asc', 'km')}>Sort KM Asc</button>
            <button className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' onClick={() => sortBy([...anunturiArray], 'desc', 'km')}>Sort KM Desc</button>
          </div>
          <div className='flex justify-center space-x-4 font-sans mt-4'>
            <button className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' onClick={() => changeAnunturi("favorites")}>Favorites</button>
            <button className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' onClick={() => changeAnunturi("anunturi")}>Anunturi</button>
          </div>
          <div className="flex justify-center flex-col space-y-8 font-sans mt-8">
            {anunturiArray.map((key, i) => (
              <Anunt key={i} title={key.title} price={key.price} thumbnail={key.thumbnail} link={key.link} yearAndKm={key.yearAndKm} locationAndDate={key.locationAndDate} />
            ))}
          </div> 
        </div>
    </div>
  );
}

export default App;
