import React, { useState, useEffect } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import styled from 'styled-components';
import api from '../../services/api';

const Logon = () => {
  const ong_id = localStorage.getItem('ongID') || '';

  const [id, setId] = useState(ong_id);
  const history = useHistory();

  useEffect(() => {
    if (ong_id.length) {
      loginRequest();
    }
  }, []);

  const loginRequest = () => {
    api.post('sessions', { id })
      .then((response) => {
        localStorage.setItem('ongID', id);
        localStorage.setItem('ongName', response.data.name);

        history.push('/profile');
      })
      .catch(() => alert('Falha ao fazer login. Tente novamente.'));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!id.length) return;

    loginRequest();
  };

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be the Heroes"/>
        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <input value={id} onChange={e => setId(e.target.value)} placeholder="Sua ID"/>

          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogInIcon/>
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes"/>
    </div>
  );
};

const FiLogInIcon = styled(FiLogIn)`
  font-size: 16px;
  color: #E02041;
`;

export default Logon;