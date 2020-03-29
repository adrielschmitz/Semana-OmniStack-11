import React, { useEffect, useState, useCallback } from 'react';
import { Feather } from '@expo/vector-icons';
import { FlatList, View, Text, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logoImg from '../../assets/logo.png';
import api from '../../services/api';
import styles from './styles';
import Constants from 'expo-constants';

const Incidents = () => {
  const navigation = useNavigation();
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadIncidents = useCallback((action) => {
    if (loading) return;
    if (total > 0 && incidents.length === total) return;

    const is_refresh = action === 'refresh';

    is_refresh ? setRefreshing(true) : setLoading(true);

    api.get('incidents', { params: { page: is_refresh ? 1 : page } })
      .then((response) => {
        setIncidents(() => is_refresh ? response.data : [...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(is_refresh ? 2 : (page + 1));
      })
      .then(() => {
        setLoading(false);
        setRefreshing(false);
      });
  }, [incidents, total, page, loading]);

  useEffect(() => loadIncidents(null), []);

  const onRefresh = () => loadIncidents('refresh');

  const navigateToDetail = useCallback((incident) => {
    navigation.navigate('Detail', { incident });
  }, [navigation]);

  console.log(incidents.length);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}/>
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total || 0} casos</Text>.
        </Text>
      </View>

      <FlatList
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Bem-vindo</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>
          </View>
        }
        disableVirtualization={false}
        data={incidents}
        style={styles.incidentList}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={() => loadIncidents(null)}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text>Nenhum caso encontrado :(</Text>
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#E02041"
            colors={["#E02041"]}
            progressViewOffset={Constants.statusBarHeight + 50}
          />
        }
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