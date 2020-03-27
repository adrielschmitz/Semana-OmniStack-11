import React from 'react';
import styled from 'styled-components';
import { FiTrash2 } from 'react-icons/fi';

const IncidentCard = ({ id, title, description, value, handleDeleteIncident }) => {
  return (
    <li>
      <strong>CASO:</strong>
      <p>{title}</p>

      <strong>Descrição:</strong>
      <p>{description}</p>

      <strong>Valor:</strong>
      <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}</p>

      <button type="button" onClick={() => handleDeleteIncident(id)}>
        <FiTrash2Icon/>
      </button>
    </li>
  );
};

const FiTrash2Icon = styled(FiTrash2)`
  font-size: 20px;
  color: #a8a8b3;
`;

export default IncidentCard;