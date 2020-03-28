import React, { useCallback, useState } from 'react';
import './styles.css';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import styled from 'styled-components';
import api from '../../services/api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const history = useHistory();

  const handleRegister = useCallback(async (event) => {
    event.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    };

    await api.post('ongs', data)
      .then(response => {
        alert(`Seu ID de acesso: ${response.data.id}`);
        history.push('/');
      })
      .catch(() => alert('Erro no cadastro, tente novamente.'));
  }, [name, email, whatsapp, city, uf, history]);

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <Link to="/">
            <img src={logoImg} alt="Be the Heroes"/>
          </Link>
          <h1>Cadastro</h1>
          <p>Faça seu dastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

          <Link className="back-link" to="/">
            <FiArrowLeftIcon/>
            Já tenho cadastro
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input placeholder="Nome da ONG" value={name} onChange={e => setName(e.target.value)}/>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input placeholder="Cidade" value={city} onChange={e => setCity(e.target.value)}/>
            <input
              placeholder="UF"
              style={{ width: 80 }}
              value={uf}
              onChange={e => setUf(e.target.value)}
            />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

const FiArrowLeftIcon = styled(FiArrowLeft)`
  font-size: 16px;
  color: #E02041;
`;

export default Register;