import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Login = () => {

  const [login, setLogin] = useState()
  const [password, setPassword] = useState()
  const [noAutenticate, setNoAutenticate ] = useState(true)
  const navigate = useNavigate()

  let id = null

  const handleButton = (id) =>{
    if(login === 'a' && password == 'a'){
      setNoAutenticate(true)
      id = '1'
      localStorage.setItem('userId', id); // Zapisz ID użytkownika w localStorage
      localStorage.setItem('isLoggedIn', true); // Ustaw flagę zalogowania
      navigate(`/Login/user/${id}`)
    }if(login === 'adam' && password == 'adam'){
      setNoAutenticate(true)
      id = '2'
      localStorage.setItem('userId', id); // Zapisz ID użytkownika w localStorage
      localStorage.setItem('isLoggedIn', true); // Ustaw flagę zalogowania
      navigate(`/Login/user/${id}`)
    }else{
      setNoAutenticate(false)   
    }  
  }

  return (
    <div className="login-module">
      <div className="login-box">
        <h3 className="text-center">Zaloguj</h3>
        {!noAutenticate && <h2> Błędny login lub hasło</h2>}
        <form onSubmit={(e)=>{
          e.preventDefault()
          handleButton(null)
        }}>
          <div className="form-group row mb-4">
            <label htmlFor="login" className="col-sm-4 col-form-label text-end">Login:</label>
            <div className="col-sm-7">
              <input type="text" id="login" className="form-control" placeholder="Wpisz login" onChange={e=>setLogin(e.target.value)}/>
            </div>
          </div>
          <div className="form-group row mb-3">
            <label htmlFor="password" className="col-sm-4 col-form-label text-end">Hasło:</label>
            <div className="col-sm-7">
              <input type="password" id="password" className="form-control" placeholder="Wpisz hasło" onChange={e=>setPassword(e.target.value)}/>
            </div>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary w-50" >Zaloguj</button>
          </div>
        </form>
      </div>
    </div>
  );
};