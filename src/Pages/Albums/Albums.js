import './Albums.scss'
import { data } from '../../Data'
import { useNavigate } from 'react-router-dom'
import { useCars } from '../../hooks/useCars'
import { useState } from 'react'


export  const Albums = () =>{
  const [marka, setMarka] = useState()
  const [model, setModel] = useState()
  const [maxPrice, setMaxPrice] = useState()
  const [bodyType,setBodyType] = useState() 

  const navigate = useNavigate();
  const { payload, loading } = useCars()

  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(marka, model, maxPrice)
  }

  const detailsButton = (data) =>{    
    navigate(`/albums/car/${data.id}`)
  }

  return(
    <div className="container albums-module">
      <h3>Nasze pojazdy</h3>
      <div className="row justify-content-md-center border-box search-box">
        <div className="col-md-8 ">
          <h4>Wyszukaj samochód</h4>
          <form>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="brand" className="form-label">Marka</label>
                <input type="text" id="brand" className="form-control" placeholder="Wpisz markę" onChange={e=>setMarka(e.target.value)} />
              </div>
              <div className="col-md-6">
                <label htmlFor="model" className="form-label">Model</label>
                <input type="text" id="model" className="form-control" placeholder="Wpisz model" onChange={e=>setModel(e.target.value)}/>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="price" className="form-label">Cena maksymalna</label>
                <input type="number" id="price" className="form-control" placeholder="Podaj cenę w PLN" onChange={e=>setMaxPrice(e.target.value)}/>
              </div>
              <div className="col-md-6">
                <label htmlFor="bodyType" className="form-label">Typ nadwozia</label>
                <select id="bodyType" className="form-select" onChange={e=>setBodyType(e.target.value)}>
                  <option value="">Wybierz typ</option>
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="hatchback">Hatchback</option>
                  <option value="coupe">Coupe</option>
                </select>
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Szukaj</button>
            </div>
          </form>
        </div>
      </div>
      <div className='search-result'>
        { !loading ?
          payload.map((item, index) =>(
            <div className='row border-box '>
              <div className='col img-box' >
                <img alt='zdjęcie' src={`/images/${item.id}/a.webp`}/>
              </div>
              <div className='col-6 d-flex align-content-center flex-wrap'>
                <p>
                  {item.description}
                </p>
              </div>
              <div className='col justify-content-md-center d-flex align-content-center flex-wrap'>
                <button type="button" className="btn btn-primary" onClick={() => detailsButton(item)}>Szczegóły</button>
              </div>
            </div>
          )     
        ):<p>Loading...</p>}
      </div>
    </div>

  )
  
}