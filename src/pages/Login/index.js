import React, { useState } from "react";
import { Text, View, Image, TextInput, StatusBar, Pressable, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from '@expo/vector-icons';
import styles from './style';

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    try {
      // 1. Buscar a lista de usuários no Storage
      const usuariosStorage = await AsyncStorage.getItem("@Usuarios_App");
      const listaLogins = usuariosStorage ? JSON.parse(usuariosStorage) : [];

      // 2. Tentar encontrar o usuário com email e senha iguais
      const usuarioEncontrado = listaLogins.find(
        user => user.email === email && user.senha === senha
      );

      if (usuarioEncontrado) {
        // 3. Salvar que este usuário específico está logado agora
        await AsyncStorage.setItem("@logado", "true");
        await AsyncStorage.setItem("@User", JSON.stringify(usuarioEncontrado));

        Alert.alert("Sucesso", `Bem-vindo, ${usuarioEncontrado.nome}!`);
        navigation.replace('Home'); 
      } else {
        Alert.alert("Erro", "E-mail ou senha incorretos.");
      }

    } catch (error) {
      Alert.alert("Erro", "Problema ao acessar o armazenamento local.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.boxImg}>
        <Image style={styles.img} source={require('../../../assets/logo-santander.png')} />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Login Local:</Text>
        <View style={styles.inputContainer}>
          <MaterialIcons name="mail-outline" size={22} color="#999" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="lock-outline" size={22} color="#999" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Digite sua Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
        </View>

        <Pressable onPress={() => navigation.navigate('Cadastro')} style={styles.btnCadastro}>
          <Text style={styles.txtNormal}>Não tem uma conta? <Text style={styles.txtCadastrar}>Cadastre-se</Text></Text>
        </Pressable>

        <Pressable onPress={handleLogin} style={styles.btn}>
          <Text style={styles.buttonText}>Entrar</Text>
        </Pressable>
      </View>
    </View>
  );
}