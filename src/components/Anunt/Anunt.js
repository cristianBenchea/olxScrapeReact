import './Anunt.css';

function Anunt({ detaliiAnunt }) {
  
  return (
    <div className='flex'>
      <div className='thumbnail'>
        <img src={detaliiAnunt.thumbnail} alt={detaliiAnunt.title} className='w-60 h-48 object-cover'/>
      </div>
      <div className='ml-10'>
        <div className='detaliiZ'>
          <h3><a href={detaliiAnunt.link} target='_blank' rel="noreferrer">{detaliiAnunt.title}</a></h3>
          <div>
            <p>{detaliiAnunt.locationAndDate}</p>
            <p>{detaliiAnunt.yearAndKm}</p>
          </div>
          <div>
            <h5>{detaliiAnunt.price}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Anunt;
