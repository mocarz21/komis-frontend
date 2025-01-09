import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function NavbarUp() {
  const navigate = useNavigate();

  const [logIn, setLogin] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const handleButton = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    setLogin(false); // Zmień stan zalogowania
    navigate('/Login');
  };

  useEffect(() => {
    // Funkcja do nasłuchiwania zmian w localStorage
    const checkLoginStatus = () => {
      setLogin(localStorage.getItem('isLoggedIn') === 'true');
    };

    // Nasłuchuj zmian w localStorage
    window.addEventListener('storage', checkLoginStatus);

    // Oczyść nasłuchiwacza, aby uniknąć wycieków pamięci
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" sticky="top">
        <Container>
          <Navbar.Brand href="#home">A2M Auto</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="/">Główna</Nav.Link>
            <Nav.Link href="/Albums">Komis</Nav.Link>
            {!logIn && <Nav.Link href="/Login">Zaloguj</Nav.Link>}
            {logIn && <Nav.Link href={`/Login/user/${localStorage.getItem('userId')}`}>Dane</Nav.Link>}
            {logIn && <Nav.Link onClick={handleButton}>Wyloguj</Nav.Link>}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}