import React, { useState, useEffect } from "react";
import { Text, View, Image, TextInput, StatusBar, Pressable, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from './style';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../services/api';


export default function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');


const handleLogin = async () => {
  if (email === '' || senha === '') {
    Alert.alert("Atenção", "Preencha todos os campos.");
    return;
  }

  try {
    // 1. Chamar a API de verdade (AuthController@login no Laravel)
    const response = await api.post('/login', {
      email: email,
      senha: senha
    });

    // 2. Se o Laravel encontrar o usuário e a senha bater
    if (response.status === 200) {
      const user = response.data.user;

      // 3. Salva no navegador que o usuário está logado
      await AsyncStorage.setItem("@logado", "true");
      await AsyncStorage.setItem("@User", JSON.stringify(user));

      Alert.alert("Sucesso", `Bem-vindo, ${user.name}!`);
      
      // Vai para a Home
      navigation.replace('Home');
    }
  } catch (error) {
    // 4. Trata erros (Senha errada, e-mail não existe, etc)
    if (error.response) {
      Alert.alert("Erro", error.response.data.message || "Credenciais inválidas");
    } else {
      Alert.alert("Erro", "Não foi possível conectar ao servidor. Verifique se o Laravel está rodando.");
    }
    console.log("Erro no login:", error);
  }
};
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.boxImg}>
        <Image
          style={styles.img}
          source={require('../../../assets/logo-santander.png')}
        />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Olá, identifique-se:</Text>

        <View style={styles.inputContainer}>
          <MaterialIcons
            name="mail-outline"
            size={22}
            color="#999"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address" // Abre o teclado com @
            autoCapitalize="none"        // Evita E-mail com letra maiúscula, tst de validation
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="lock-outline" size={22} color="#999" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Digite sua Senha"
            placeholderTextColor="#999"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={true}
          />
        </View>

        <View>
          <Pressable onPress={() => navigation.navigate('Cadastro')}
            style={styles.btnCadastro}>
            <Text style={styles.txtNormal}>Não tem uma conta?
              <Text style={styles.txtCadastrar}> Cadastre-se</Text>
            </Text>
          </Pressable>
        </View>

        {/* Botão agora chama a função handleLogin */}
        <Pressable
          onPress={handleLogin}
          style={styles.btn}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </Pressable>
      </View>
    </View>
  );
}