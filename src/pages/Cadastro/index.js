import React, { useState } from "react";
import { Text, View, Image, TextInput, StatusBar, Pressable, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from './style'; 
import { MaterialIcons } from '@expo/vector-icons';
import api from '../services/api'; // Certifique-se que o caminho está correto

export default function Cadastro() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Função para cadastrar no MySQL via API Laravel
  const realizarCadastro = async () => {
    // 1. Validação básica de campos vazios
    if (nome === '' || cpf === '' || email === '' || senha === '') {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    try {
      // 2. Chamada para a API Laravel
      const response = await api.post('/cadastro', {
        nome: nome,
        cpf: cpf,
        email: email,
        senha: senha
      });

      // 3. Se o Laravel retornar status 201 (Created)
      if (response.status === 201) {
        console.log("Usuário cadastrado no MySQL:", response.data.user);
        
        // Opcional: Salva uma cópia local se desejar
        await AsyncStorage.setItem("@User", JSON.stringify(response.data.user));
        
        Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
        
        // Limpa os campos
        setNome(''); setCpf(''); setEmail(''); setSenha('');

        // Navega para a tela de Login
        navigation.navigate('Login');
      }

    } catch (error) {
      // 4. Tratamento de erros vindo do Laravel (CORS, Validação, etc)
      if (error.response) {
        // Erros de validação do Laravel (Ex: E-mail já existe)
        const erroMensagem = error.response.data.errors 
          ? Object.values(error.response.data.errors)[0][0] 
          : "Erro ao cadastrar";
          
        Alert.alert("Ops!", erroMensagem);
        console.log("Erro do servidor:", error.response.data);
      } else {
        // Erro de rede ou servidor desligado
        Alert.alert("Erro", "Não foi possível conectar ao servidor. Verifique se o Laravel está rodando.");
        console.log("Erro de conexão:", error.message);
      }
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
        <Text style={styles.label}>Bem vindo, Cadastre-se:</Text>
      
        <TextInput 
          style={styles.input} 
          placeholder="Digite seu nome"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput 
          style={styles.input} 
          placeholder="Digite seu cpf"
          keyboardType="numeric"
          value={cpf}
          onChangeText={setCpf}
        />
        
        <TextInput 
          style={styles.input} 
          placeholder="Digite seu E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput 
          style={styles.input} 
          placeholder="Digite sua Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={true}
        />

        <Pressable 
          onPress={realizarCadastro} 
          style={styles.btn} 
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
        </Pressable>
      </View>

      <View>
        <Pressable onPress={() => navigation.navigate('Login')}
          style={styles.btnCadastro}>
          <Text style={styles.txtNormal}>Já tenho Conta</Text>
        </Pressable>
      </View>
    </View>
  );
}