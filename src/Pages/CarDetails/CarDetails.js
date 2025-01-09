import React from 'react';
import { useParams  } from 'react-router-dom';
import { useState } from 'react'
import './CarDetails.scss';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import DatePicker from '../../Modules/Calendar/DatePicker';
import { data } from '../../Data';
import { useCars } from '../../hooks/useCars'

export const CarDetails = () => {
  const { id } = useParams(); // Pobiera parametr 'id' z URL
  const car = data.cars.find((car) => car.id === parseInt(id, 10)); // Znajduje odpowiedni samochód na podstawie ID
  const [imgInFrame, setImgInFrame] = useState('a')
  const { payload, loading } = useCars(id)

  let parsedDetails;

  if (typeof payload.details === "string") {
    try {
      parsedDetails = JSON.parse(payload.details); // Parsuj tylko string
    } catch (error) {
      console.error("Błąd parsowania JSON:", error);
      parsedDetails = {}; // Fallback w przypadku błędu
    }
  } else {
    parsedDetails = payload.details; // Jeśli już jest obiektem, używaj bez zmian
  }

  if (!car) {
    return <div>Nie znaleziono samochodu o podanym ID.</div>;
  }

  return (
    <div className="container mt-4 car-details-module">
      <div className="row">
        <div className="col-md-6">
          <div className="gallery">
            <img
              src={`/images/${payload.id}/${imgInFrame}.webp`}
              alt="Samochód główne"
              className="img-fluid mb-3"
            />
            <div className="gallery-thumbnails d-flex justify-content-between">
              {['b','c','d','e'].map((item, index) =>
              <img key={index} src={`/images/${payload.id}/${item}.webp`} alt="Miniatura 1" className="img-thumbnail"  onClick={()=>setImgInFrame(item)}/>
             )} 
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Dane techniczne</h4>
          <ul className="list-group">
            <li className="list-group-item">Marka: {payload.brand}</li>
            <li className="list-group-item">Model: {payload.model}</li>
            {!loading ? <li className="list-group-item">Silnik: {parsedDetails.engine}</li>:<p>loading</p>}
            <li className="list-group-item">Moc: {payload.power} KM</li>
            <li className="list-group-item">Skrzynia biegów: {payload.transmission}</li>
            <li className="list-group-item">Kolor: {payload.color}</li>
            <li className="list-group-item">Rok produkcji: {payload.production_year}</li>
          </ul>
        </div>
      </div>:<p>Loading</p>
      <div className="mt-4">
        <h4>Opis samochodu</h4>
        <p>{payload.description}</p>
        <h5>Dane szczegółowe:</h5>
        {!loading && <ul>
          {parsedDetails.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>}
      </div>
      <Popup trigger={<button className="btn btn-info">Zarezerwuj jazdę próbną</button>} modal nested closeByBackdropClick>
      {(close) => (
        <DatePicker closePopup={close}/>
      )}
      </Popup>
    </div>
  );
};
