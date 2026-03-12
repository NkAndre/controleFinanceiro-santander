import React, { useState, useEffect } from "react";
import { Text, View, Image, TextInput, StatusBar, Pressable, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from './style';
import { MaterialIcons } from '@expo/vector-icons';


export default function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');



  const handleLogin = async () => {
    // 1. Verifica se os campos não estão vazios
    if (email === '' || senha === '') {
      Alert.alert("Atenção", "Preencha todos os campos para entrar.");
      return;
    }

    try {
      // 2. Busca o objeto do usuário que foi salvo no Cadastro
      const userData = await AsyncStorage.getItem("@User");

      if (userData !== null) {
        const user = JSON.parse(userData); // Transforma a string de volta em objeto

        // 3. Compara os dados digitados com os dados salvos
        if (email === user.email && senha === user.senha) {

          // 4. Se estiver correto, salva que o usuário está LOGADO
          // Isso é o que o seu arquivo de rotas vai leeer da próxima vez
          await AsyncStorage.setItem("@logado", "true");

          // Vai para a Home
          navigation.replace('Home');
        } else {
          Alert.alert("Erro", "E-mail ou senha incorretos.");
        }
      } else {
        Alert.alert("Erro", "Nenhum usuário cadastrado neste dispositivo.");
      }
    } catch (error) {
      console.log("Erro ao fazer login", error);
      Alert.alert("Erro", "Ocorreu um problema ao tentar entrar.");
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