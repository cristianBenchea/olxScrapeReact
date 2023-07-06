import './Anunt.css';

function Anunt({title, price, thumbnail, link, yearAndKm, locationAndDate}) {
  
  return (
    <div className='anunt'>
      <div className='thumbnail'>
        <img src={thumbnail} alt={title} />
      </div>
      <div className='detaliiAnunt'>
        <div className='detaliiZ'>
          <h3><a href={link} target='_blank' rel="noreferrer">{title}</a></h3>
          <div>
            <p>{locationAndDate}</p>
            <p>{yearAndKm}</p>
          </div>
          <div>
            <h5>{price}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Anunt;
