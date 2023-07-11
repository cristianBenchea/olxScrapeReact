import { useEffect, useState } from 'react';
import './App.css';
import Anunt from './components/Anunt/Anunt';
import Header from './components/Header/Header';
import favoritesJSON from './scrapedFavorites.json';
import anunturiJSON from './scrapedAnunturi.json';
import ReactPaginate from 'react-paginate';

function App() {
  const [anunturiArray, setAnunturi] = useState(favoritesJSON);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = anunturiArray.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(anunturiArray.length / itemsPerPage);

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

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % anunturiArray.length;
    setItemOffset(newOffset);
  };

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
            {currentItems.map((key, i) => (
              <Anunt key={i} detaliiAnunt={key} />
            ))}
          </div>  
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
            className='inline-flex -space-x-px text-base h-10'
            pageClassName='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
            previousClassName='flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
            nextClassName='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
            activeClassName='flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
            breakClassName='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
            />
        </div>
    </div>
  );
}

export default App;
