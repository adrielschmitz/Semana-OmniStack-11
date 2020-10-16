import React, { useCallback, useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import logoImg from '../../assets/logo.svg'
import styled from 'styled-components'
import api from '../../services/api'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [city, setCity] = useState('')
  const [uf, setUf] = useState('')
  const history = useHistory()

  const handleRegister = useCallback(async (event) => {
    event.preventDefault()

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    }

    await api.post('ongs', data)
      .then(response => {
        alert(`Seu ID de acesso: ${response.data.id}`)
        history.push('/')
      })
      .catch(() => alert('Erro no cadastro, tente novamente.'))
  }, [name, email, whatsapp, city, uf, history])

  return (
    <Container className="register-container">
      <Content className="content">
        <Section>
          <Link to="/">
            <img src={logoImg} alt="Be the Heroes"/>
          </Link>
          <Title>Cadastro</Title>
          <Subtitle>Faça seu dastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</Subtitle>

          <Link className="back-link" to="/">
            <FiArrowLeftIcon/>
            Já tenho cadastro
          </Link>
        </Section>

        <Form onSubmit={handleRegister}>
          <Input placeholder="Nome da ONG" value={name} onChange={e => setName(e.target.value)}/>
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />

          <InputGroup className="input-group">
            <Input placeholder="Cidade" value={city} onChange={e => setCity(e.target.value)}/>
            <Input
              placeholder="UF"
              style={{ width: 80, marginLeft: 8 }}
              value={uf}
              onChange={e => setUf(e.target.value)}
            />
          </InputGroup>

          <button className="button" type="submit">Cadastrar</button>
        </Form>
      </Content>
    </Container>
  )
}

const FiArrowLeftIcon = styled(FiArrowLeft)`
  font-size: 16px;
  color: #E02041;
`

export default Register

const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  height: 100vh;
  margin: 0 auto;

  display: flex;
  align-content: center;
  align-items: center;
  
  @media (max-width: 950px) {
  .content {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    justify-content: center;
    justify-items: center;
    padding: 50px 0 0;
  }

  .content section {
    display: grid;
    justify-items: center;
  }

  .content section p {
    text-align: center;
  }

  .content form {
    padding: 20px;
  }
}
`

const Content = styled.div`
  width: 100%;
  padding: 96px;
  background: #f0f0f5;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);

  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Section = styled.section`
  width: 100%;
  max-width: 380px;
`

const Title = styled.h1`
  margin: 64px 0 32px;
  font-size: 32px;
`

const Subtitle = styled.p`
  font-size: 18px;
  color: #737380;
  line-height: 32px;
`

const Form = styled.form`
  width: 100%;
  max-width: 450px;
`

const Input = styled.input`
  margin-top: 8px;
`

const InputGroup = styled.div`
  display: flex;
`
