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

  return (
    <div className="App">
        <Header />
        <div className='container mx-auto'>
          <div className='flex justify-center space-x-4 font-sans mt-4'>
            <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded' onClick={() => sortBy([...anunturiArray], 'asc', 'price')}>Sort price Asc</button>
            <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded' onClick={() => sortBy([...anunturiArray], 'desc', 'price')}>Sort price Desc</button>
            <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded' onClick={() => sortBy([...anunturiArray], 'asc', 'year')}>Sort Year Asc</button>
            <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded' onClick={() => sortBy([...anunturiArray], 'desc', 'year')}>Sort Year Desc</button>
            <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded' onClick={() => sortBy([...anunturiArray], 'asc', 'km')}>Sort KM Asc</button>
            <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded' onClick={() => sortBy([...anunturiArray], 'desc', 'km')}>Sort KM Desc</button>
          </div>
          <div className='flex justify-center space-x-4 font-sans mt-4'>
            <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded' onClick={() => setAnunturi(favoritesJSON)}>Favorites</button>
            <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded' onClick={() => setAnunturi(anunturiJSON)}>Anunturi</button>
          </div>
          <div className="flex justify-center flex-col space-y-8 mb-8 font-sans mt-8">
            {anunturiArray.map((key, i) => (
              <Anunt key={i} detaliiAnunt={key} />
            ))}
          </div>  
        </div>
    </div>
  );
}

export default App;
