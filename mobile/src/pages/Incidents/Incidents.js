import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { FlatList, View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logoImg from '../../assets/logo.png';
import api from '../../services/api';
import styles from './styles';

const Incidents = () => {
  const navigation = useNavigation();
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadIncidents = () => {
    if (loading) return;

    if (total > 0 && incidents.length === total) return;

    setLoading(true);

    api.get('incidents', { params: { page } })
      .then((response) => {
        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
      })
      .then(() => setLoading(false));
  };

  useEffect(() => loadIncidents(), []);

  const navigateToDetail = (incident) => {
    navigation.navigate('Detail', { incident });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}/>
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total || 0} casos</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Bem-vindo</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

      <FlatList
        data={incidents}
        style={styles.incidentList}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name || ''}</Text>

            <Text style={styles.incidentProperty}>Caso:</Text>
            <Text style={styles.incidentValue}>{incident.title || ''}</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat('pt-BR',
                {
                  style: 'currency', currency: 'BRL'
                }).format(incident.value || 0)}
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigateToDetail(incident)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#E02041"/>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default Incidents;