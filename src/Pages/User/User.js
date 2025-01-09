import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../hooks/useUsers";
import { useParams } from "react-router-dom";
import { useTestDrives } from "../../hooks/useTestDrives";

export const User = () => {
  const { id } = useParams();
  const { payload, payloadTest, loading } = useUsers(id);
  const { remove } = useTestDrives()
  const navigate = useNavigate();
  const [testRides, setTestRides] = useState()
  console.log(testRides)
  console.log(payloadTest)
  // Obsługa wysłania
  const handleSubmit = async (e) => {
    e.preventDefault();
    const lastRideId = testRides.reduce((acc, curr) => {
      const accTime = new Date(`${acc.test_drive_date}T${acc.test_drive_time}`).getTime();
      const currTime = new Date(`${curr.test_drive_date}T${curr.test_drive_time}`).getTime();
      return currTime > accTime ? curr : acc;
    }, testRides[0]).test_drive_id;
    console.log(lastRideId)
    await remove(lastRideId)
    setTestRides((prev) => prev.filter((ride) => ride.test_drive_id !== lastRideId));
  };

  useEffect(()=>{
    setTestRides(payloadTest)
  },[payloadTest])


  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Podgląd Danych Jazdy Próbnej</h2>
      {payloadTest ? <div className="card shadow p-4">
        <div className="mb-3">
          <strong>Imię:</strong>
          <p className="form-control-static">{payload.first_name}</p>
        </div>
        <div className="mb-3">
          <strong>Nazwisko:</strong>
          <p className="form-control-static">{payload.last_name}</p>
        </div>
        <div className="mb-3">
          <strong>Email:</strong>
          <p className="form-control-static">{payload.email}</p>
        </div>
        <div className="mb-3">
          <strong>Telefon:</strong>
          <p className="form-control-static">{payload.phone}</p>
        </div>
        <div className="mb-3">
          <strong>Testowane samochody:</strong>
          <ul className="form-control-static">
            {payloadTest.map((test, index) => (
              new Date(test.test_drive_date) <= new Date("2024-01-06") && (
                <li key={index}>
                  {test.car_brand} {test.car_model} - {test.test_drive_date} - {test.test_drive_time}
                </li>
              )
            ))}
          </ul>
        </div>
        <div className="mb-3">
          <strong>Preferowana godzina jazdy próbnej:</strong>
          <p className="form-control-static">{payload.preferred_test_drive_time}</p>
        </div>
        <div className="mb-3">
          <strong>Umówione testy samochodu:</strong>
          <ul className="form-control-static">
            {testRides && testRides.map((test, index) => (
              new Date(test.test_drive_date) > new Date("2024-01-06") && (
                <li key={index}>
                  {test.car_brand} {test.car_model} - {test.test_drive_date} - {test.test_drive_time}
                </li>
              )
            ))}
          </ul>
        </div>
        <button 
          type="button" 
          className="btn btn-primary w-100 mt-3" 
          onClick={handleSubmit}
        >
          Odwołaj test samochodu 
        </button>
      </div>:<p>loading</p>}
    </div>
  );
};