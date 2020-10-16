import React, { useEffect, useState, useCallback } from 'react'
import { Feather } from '@expo/vector-icons'
import { FlatList, View, Text, Image, RefreshControl, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import logoImg from '../../assets/logo.png'
import api from '../../services/api'
import Constants from 'expo-constants'
import styled from 'styled-components'

const Incidents = () => {
  const navigation = useNavigation()
  const [incidents, setIncidents] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const loadIncidents = useCallback((action) => {
    if (loading) return
    if (total > 0 && incidents.length === total) return

    const is_refresh = action === 'refresh'

    is_refresh ? setRefreshing(true) : setLoading(true)

    api.get('incidents', { params: { page: is_refresh ? 1 : page } })
      .then((response) => {
        setIncidents(() => is_refresh ? response.data : [...incidents, ...response.data])
        setTotal(response.headers['x-total-count'])
        setPage(is_refresh ? 2 : (page + 1))
      })
      .then(() => {
        setLoading(false)
        setRefreshing(false)
      })
  }, [incidents, total, page, loading])

  useEffect(() => loadIncidents(null), [])

  const onRefresh = () => loadIncidents('refresh')

  const navigateToDetail = useCallback((incident) => {
    navigation.navigate('Detail', { incident })
  }, [navigation])

  const ListHeaderComponent = useCallback(() => (
    <View>
      <Title>Bem-vindo</Title>
      <Description>Escolha um dos casos abaixo e salve o dia.</Description>
    </View>
  ), [])

  const ListEmptyComponent = useCallback(() => (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text>Nenhum caso encontrado :(</Text>
    </View>
  ), [])

  const refreshControl = useCallback(() => (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor="#E02041"
      colors={["#E02041"]}
      progressViewOffset={Constants.statusBarHeight + 50}
    />
  ), [onRefresh, refreshing])

  const renderItem = useCallback(({ item: incident }) => (
    <IncidentCard>
      <CardLabel>ONG:</CardLabel>
      <CardValue>{incident.name || ''}</CardValue>

      <CardLabel>CASO:</CardLabel>
      <CardValue>{incident.title || ''}</CardValue>

      <CardLabel>VALOR:</CardLabel>
      <CardValue>
        {Intl.NumberFormat('pt-BR',
          {
            style: 'currency', currency: 'BRL'
          }).format(incident.value || 0)}
      </CardValue>

      <DetailsButton onPress={() => navigateToDetail(incident)}>
        <DetailsButtonText>Ver mais detalhes</DetailsButtonText>
        <ArrowRightIcon size={18} name="arrow-right"/>
      </DetailsButton>
    </IncidentCard>
  ), [])

  const keyExtractor = useCallback(incident => String(incident.id), [])

  const onEndReached = useCallback(() => loadIncidents(null), [])

  return (
    <Container>
      <Header>
        <Image source={logoImg}/>
        <HeaderText>
          Total de <TextBold>{total || 0} casos</TextBold>.
        </HeaderText>
      </Header>

      <FlatList
        data={incidents}
        ListHeaderComponent={ListHeaderComponent}
        disableVirtualization={false}
        style={styles.incidentList}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={ListEmptyComponent}
        refreshControl={refreshControl}
        renderItem={renderItem}
      />
    </Container>
  )
}

export default Incidents

const Container = styled.View`
  flex: 1;
  padding: ${Constants.statusBarHeight + 20}px 24px 0 24px;
`

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const HeaderText = styled.Text`
  font-size: 15px;
  color: #737380;
`

const TextBold = styled.Text`
  font-weight: bold;
`

const Title = styled.Text`
  font-size: 22px;
  color: #13131a;
  font-weight: bold;
`

const Description = styled.Text`
  font-size: 16px;
  line-height: 24px;
  color: #737380;
  margin-bottom: 30px;
`

const styles = StyleSheet.create({
  incidentList: {
    marginTop: 32,
  },
})

const IncidentCard = styled.View`
  padding: 24px;
  border-radius: 8px;
  background-color: #FFF;
  margin-bottom: 16px;
`

const CardLabel = styled.Text`
  font-size: 14px;
  color: #41414d;
  font-weight: bold;
`

const CardValue = styled.Text`
  margin-top: 8px;
  font-size: 15px;
  margin-bottom: 24px;
  color: #737380;
`

const DetailsButton = styled.TouchableOpacity`
  flex-direction: row; 
  justify-content: space-between;  
  align-items: center; 
`

const DetailsButtonText = styled.Text`
  color: #E02041;
  font-size: 15px;
  font-weight: bold;
`

const ArrowRightIcon = styled(Feather)`
  color: #E02041;
`
