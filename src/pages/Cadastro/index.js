import React, { useState,useEffect} from "react";
import { Text, View, Image, TextInput, StatusBar,Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from './style'; 
import { MaterialIcons } from '@expo/vector-icons';

// ... seus imports ...
import { Alert } from "react-native"; // Importe o Alert

export default function Cadastro() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const realizarLogin = async () => {
  // ... lógica de comparar email e senha ...
  
  // Se estiver tudo certo:
  await AsyncStorage.setItem("@logado", "true"); 
  navigation.replace('Home'); // .replace não deixa ele voltar pro login no botão 'voltar'
};

  // Função unificada para cadastrar
  const realizarCadastro = async () => {
    if (nome === '' || cpf === '' || email === '' || senha === '') {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    try {
      const user = {
        nome: nome,
        cpf: cpf,
        email: email,
        senha: senha
      };

      // Salva o objeto completo
      await AsyncStorage.setItem("@User", JSON.stringify(user));
      
      console.log("Usuário salvo com sucesso!");
      Alert.alert("Sucesso", "Cadastro realizado!");

      // Após salvar, navega para o Login
      navigation.navigate('Login');
      
    } catch (error) {
      console.log("Erro ao salvar", error);
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
          keyboardType="numeric" // Teclado numérico para CPF
          value={cpf}
          onChangeText={setCpf}
        />
        
        <TextInput 
          style={styles.input} 
          placeholder="Digite seu E-mail"
          keyboardType="email-address" // Teclado de email
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
                  <Text style={styles.txtNormal}>Ja tenho Conta
                    
                  </Text>
                </Pressable>
              </View>

      
    </View>
  );
}