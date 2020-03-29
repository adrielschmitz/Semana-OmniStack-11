import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { StatusBar } from 'react-native';
import React from 'react';
import Routes from './src/routes';

export default function App() {
  return (
    <>
      <StatusBar animated={true} barStyle='dark-content'/>
      <Routes/>
    </>
  );
}
