import React, { useState } from "react";
import { Text, View, Image, TextInput, StatusBar, Pressable, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from './style';

export default function Cadastro() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const realizarCadastro = async () => {
    if (!nome || !cpf || !email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    try {
      // 1. Pegar a lista de usuários já cadastrados (ou criar uma vazia)
      const usuariosExistentes = await AsyncStorage.getItem("@Usuarios_App");
      const listaLogins = usuariosExistentes ? JSON.parse(usuariosExistentes) : [];

      // 2. Verificar se o e-mail já existe
      const usuarioJaExiste = listaLogins.find(user => user.email === email);
      if (usuarioJaExiste) {
        Alert.alert("Erro", "Este e-mail já está cadastrado.");
        return;
      }

      // 3. Adicionar novo usuário à lista
      const novoUsuario = { nome, cpf, email, senha };
      listaLogins.push(novoUsuario);

      // 4. Salvar a lista atualizada
      await AsyncStorage.setItem("@Usuarios_App", JSON.stringify(listaLogins));

      Alert.alert("Sucesso", "Cadastro realizado localmente!");
      navigation.navigate('Login');

    } catch (error) {
      Alert.alert("Erro", "Falha ao salvar dados no dispositivo.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.boxImg}>
        <Image style={styles.img} source={require('../../../assets/logo-santander.png')} />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Cadastro Local (AsyncStorage):</Text>
        <TextInput style={styles.input} placeholder="Nome completo" value={nome} onChangeText={setNome} />
        <TextInput style={styles.input} placeholder="CPF" keyboardType="numeric" value={cpf} onChangeText={setCpf} />
        <TextInput style={styles.input} placeholder="E-mail" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Senha" secureTextEntry value={senha} onChangeText={setSenha} />

        <Pressable onPress={realizarCadastro} style={styles.btn}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </Pressable>
        
        <Pressable onPress={() => navigation.navigate('Login')} style={styles.btnCadastro}>
          <Text style={styles.txtNormal}>Já tenho Conta</Text>
        </Pressable>
      </View>
    </View>
  );
}