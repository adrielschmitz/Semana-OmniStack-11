import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const AppStack = createStackNavigator();

import Incidents from './pages/Incidents/Incidents';
import Detail from './pages/Detail/Detail';

const Routes = () => {
  return (
    <NavigationContainer >
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="Incidents" component={Incidents}/>
        <AppStack.Screen name="Detail" component={Detail}/>
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;