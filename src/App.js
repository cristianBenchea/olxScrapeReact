import { useState } from 'react';
import './App.css';
import Anunt from './components/Anunt/Anunt';
import Header from './components/Header/Header';
import favoritesJSON from './scrapedFavorites.json';
import anunturiJSON from './anunturi.json';

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
        <div className='buttons'>
          <button onClick={() => sortBy([...anunturiArray], 'asc', 'price')}>Sort price Asc</button>
          <button onClick={() => sortBy([...anunturiArray], 'desc', 'price')}>Sort price Desc</button>
          <button onClick={() => sortBy([...anunturiArray], 'asc', 'year')}>Sort Year Asc</button>
          <button onClick={() => sortBy([...anunturiArray], 'desc', 'year')}>Sort Year Desc</button>
          <button onClick={() => sortBy([...anunturiArray], 'asc', 'km')}>Sort KM Asc</button>
          <button onClick={() => sortBy([...anunturiArray], 'desc', 'km')}>Sort KM Desc</button>
        </div>
        <div className='categorii'>
          <button onClick={() => changeAnunturi("favorites")}>Favorites</button>
          <button onClick={() => changeAnunturi("anunturi")}>Anunturi</button>
        </div>
        <div className="anunturi">
          {anunturiArray.map((key, i) => (
            <Anunt key={i} title={key.title} price={key.price} thumbnail={key.thumbnail} link={key.link} yearAndKm={key.yearAndKm} locationAndDate={key.locationAndDate} />
          ))}
        </div> 
    </div>
  );
}

export default App;
