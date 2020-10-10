import React, { useState, useEffect } from 'react'
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'
import styled from 'styled-components'
import api from '../../services/api'

const Logon = () => {
  const ong_id = localStorage.getItem('ongID') || ''

  const [id, setId] = useState(ong_id)
  const history = useHistory()

  useEffect(() => {
    if (ong_id.length) {
      loginRequest()
    }
  }, [])

  const loginRequest = () => {
    api.post('sessions', { id })
      .then((response) => {
        localStorage.setItem('ongID', id)
        localStorage.setItem('ongName', response.data.name)

        history.push('/profile')
      })
      .catch(() => alert('Falha ao fazer login. Tente novamente.'))
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (!id.length) return

    loginRequest()
  }

  return (
    <Container className="logon-container">
      <Section classname="form">
        <img src={logoImg} alt="Be the Heroes"/>
        <Form onSubmit={handleLogin}>
          <Title>Faça seu logon</Title>
          <input value={id} onChange={e => setId(e.target.value)} placeholder="Sua ID"/>

          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogInIcon/>
            Não tenho cadastro
          </Link>
        </Form>
      </Section>

      <img src={heroesImg} alt="Heroes"/>
    </Container>
  )
}

const FiLogInIcon = styled(FiLogIn)`
  font-size: 16px;
  color: #E02041;
`

export default Logon

const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  height: 100vh;
  margin: 0 auto;

  display: flex;
  align-items: center;
  align-content: space-between;
  
  @media (max-width: 1179px) {
    .logon-container {
      width: 95% !important;
    }
  }

  @media (max-width: 780px) {
    .logon-container {
      display: grid;
      grid-template-rows: repeat(2, 1fr);
      justify-content: center;
      justify-items: center;
      padding: 50px 0 0;
    }
  
    .logon-container section.form {
      display: grid;
      margin: 0;
      max-width: 400px;
    }
  
    .logon-container section.form img {
      justify-self: center;
    }
  
    .logon-container section.form form h1 {
      font-size: large;
    }
  
    .logon-container img {
      width: auto;
      height: auto !important;
      max-width: 80%;
    }
  }

  @media (max-width: 400px) {
    .logon-container section.form form h1 {
      font-size: medium;
    }
  }
`

const Section = styled.section`
  width: 100%;
  max-width: 350px;
  margin-right: 30px;
`

const Form = styled.form`
  margin-top: 30px;
`

const Title = styled.h1`
  font-size: x-large;
  margin-bottom: 20px;
`
