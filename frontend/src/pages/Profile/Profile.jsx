import React, { useEffect, useCallback, useState } from 'react';
import IncidentCard from './IncidentCard';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import styled from 'styled-components';
import api from '../../services/api';
import './styles.css';

const Profile = () => {
  const ong_name = localStorage.getItem('ongName');
  const ong_id = localStorage.getItem('ongID');
  const [incidents, setIncidents] = useState([]);

  const history = useHistory();

  useEffect(() => {
    api.get('profile', {
      headers: { Authorization: ong_id }
    })
      .then(response => setIncidents(response.data || []))
      .catch(() => alert('Não foi possível listar os casos. Tente novamente!'));
  }, [ong_id]);

  const handleDeleteIncident = useCallback((id) => {
    api.delete(`incidents/${id}`, {
      headers: {
        authorization: ong_id
      }
    })
      .then((response) => {
        setIncidents(incidents.filter(incident => incident.id !== id));

      })
      .catch((error) => alert(error));
  }, [ong_id, incidents]);

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className="profile-container">
      <header>
        <div className="header-logo">
          <img src={logoImg} alt="Be the Hero"/>
          <span>Bem vinda, {ong_name}</span>
        </div>

        <div className="header-buttons">
          <Link className="button" to="/incidents/new"> Cadastrar novo caso </Link>

          <button type="button" onClick={handleLogout}>
            <FiPowerIcon/>
          </button>
        </div>
      </header>

      <h1>Casos cadastrados: {incidents?.length || 0}</h1>

      <ul>
        {incidents.map((incident, index) => (
          <IncidentCard
            key={index}
            id={incident.id}
            title={incident.title}
            description={incident.description}
            value={incident.value}
            handleDeleteIncident={handleDeleteIncident}
          />
        ))}
      </ul>
    </div>
  );
};

const FiPowerIcon = styled(FiPower)`
  font-size: 18px;
  color: #E02041;
`;

export default Profile;