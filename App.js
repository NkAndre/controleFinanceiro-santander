import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from './src/pages/Login';
import Home from './src/pages/home';
import Cadastro from './src/pages/Cadastro';
import Splash from './src/pages/Splash';

const Stack = createNativeStackNavigator();

export default function App() {
  const [carregando, setCarregando] = useState(true);
  const [estaLogado, setEstaLogado] = useState(false);

  useEffect(() => {
    const verificarStatus = async () => {
      try {
        const logado = await AsyncStorage.getItem("@logado");
        setEstaLogado(logado === "true");
        
        setTimeout(() => {
          setCarregando(false);
        }, 2000);

      } catch (error) {
        setCarregando(false);
      }
    };

    verificarStatus();
  }, []);

  
  if (carregando) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName={estaLogado ? 'Home' : 'Login'} 
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Cadastro' component={Cadastro} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}