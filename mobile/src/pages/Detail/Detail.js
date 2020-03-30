import React from 'react';
import Constants from 'expo-constants/src/Constants';
import { View, Image, TouchableOpacity, Text, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';
import { useNavigation, useRoute } from '@react-navigation/native';
import logoImg from '../../assets/logo.png';
import styled from 'styled-components';

const Detail = () => {
  const navigation = useNavigation();
  const navigateBack = () => navigation.goBack();
  const route = useRoute();
  const incident = route.params.incident;
  const value = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value || 0);
  const message = ` Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso 
                    "${incident.title}" com o valor de ${value}.`;

  const sendEmail = () => {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.description}`,
      recipients: [incident.email],
      body: message
    });
  };

  const sendWhatsApp = () => Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={navigateBack}>
          <Image source={logoImg}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#E02041"/>
        </TouchableOpacity>
      </Header>

      <View>
        <Title>Detalhes do caso:</Title>
      </View>

      <IncidentCard>
        <FirstCardLabel>ONG:</FirstCardLabel>
        <CardValue>{incident.name} de {incident.city} - {incident.uf}</CardValue>

        <CardLabel>CASO:</CardLabel>
        <CardValue>{incident.title}</CardValue>

        <CardLabel>VALOR:</CardLabel>
        <CardValue>{value}</CardValue>
      </IncidentCard>

      <ContactBox>
        <ContactBoxTitle>Seja o herói desse caso!!</ContactBoxTitle>

        <ContactBoxDescription>Entre em contato:</ContactBoxDescription>

        <Actions>
          <Action onPress={sendWhatsApp}>
            <ActionText>WhatsApp <Feather name="message-square" size={16} color="#FFF"/></ActionText>
          </Action>

          <Action onPress={sendEmail}>
            <ActionText>E-mail <Feather name="mail" size={16} color="#FFF"/></ActionText>
          </Action>
        </Actions>
      </ContactBox>
    </Container>
  );
};

export default Detail;

const Container = styled(View)`
    flex: 1;
    padding: ${Constants.statusBarHeight + 20}px 24px 0 24px;
`;

const Header = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const Title = styled(Text)`
  font-size: 22px;
  margin-top: 48px;
  color: #13131a;
  font-weight: bold;
`;

const IncidentCard = styled(View)`
  padding: 24px;
  border-radius: 8px;
  background-color: #FFF;
  margin-bottom: 16px;
  margin-top: 20px;
`;

const CardLabel = styled(Text)`
  font-size: 14px;
  color: #41414d;
  font-weight: bold;
`;

const FirstCardLabel = styled(CardLabel)`
  margin-top: 0;
`;

const CardValue = styled(Text)`
  margin-top: 8px;
  font-size: 15px;
  margin-bottom: 24px;
  color: #737380;
`;

const ContactBox = styled(View)`
  padding: 24px;
  border-radius: 8px;
  background-color: #FFF;
  margin-bottom: 16px;
`;

const ContactBoxTitle = styled(Text)`
  font-weight: bold;
  font-size: 20px;
  line-height: 30px;
  color: #12121a;
`;

const ContactBoxDescription = styled(Text)`
  margin-top: 16px;
  font-size: 15px;
  color: #737380;
`;

const Actions = styled(View)`
  margin-top: 16px;
  flex-direction: row;
  justify-content: space-between;
`;

const Action = styled(TouchableOpacity)`
  background-color: #E02041;
  border-radius: 8px;
  height: 50px;
  width: 48%;
  justify-content: center;
  align-items: center;
`;

const ActionText = styled(Text)`
  color: #FFF;
  font-size: 15px;
  font-weight: bold;
`;