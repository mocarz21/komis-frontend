import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main } from './Pages/Main/Main'
import { Login } from './Modules/Login/Login'
import { Albums } from './Pages/Albums/Albums'
import { Reservation } from './Pages/Reservation/Reservation'
import { NavbarUp } from './Modules/Navbar/Navbar'
import { CarDetails } from './Pages/CarDetails/CarDetails';
import { User } from './Pages/User/User'
import './App.scss';
import CarsProvider from  './provider/CarsProvider'

function App() {
  return (
    <BrowserRouter> 
      <CarsProvider>
        <div className="App">
          <NavbarUp/>
          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/Albums" element={<Albums/>}/>
            <Route path="/Reservation" element={<Reservation/>}/>
            <Route path="/Albums/car/:id" element={<CarDetails/>}/>
            <Route path="/Login/user/:id" element={<User/>}/>
          </Routes>
        </div>
      </CarsProvider>
    </BrowserRouter>
  );
}

export default App;
