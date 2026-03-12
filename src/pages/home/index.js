import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Pressable, Text, View, Image, Modal, TextInput, FlatList, ScrollView, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; // Importando o seletor
import styles from './styles';

import { calcularSaldo, removerTransacao } from './script';

export default function Home() {
    const navigation = useNavigation();

    // --- ESTADOS ---
    const [modalVisible, setModalVisible] = useState(false);
    const [tipoOperacao, setTipoOperacao] = useState('');
    const [verSaldo, setVerSaldo] = useState(true);
    const [nomeUsuario, setNomeUsuario] = useState('Usuário');
    const [fotoPerfil, setFotoPerfil] = useState(null); 

    const [titulo, setTitulo] = useState('');
    const [valor, setValor] = useState('');
    const [descricao, setDescricao] = useState('');
    const [categoria, setCategoria] = useState('');
    const [data, setData] = useState('');
    const [listaTransacoes, setListaTransacoes] = useState([]);

    // --- CARREGAR DADOS AO INICIAR ---
    useEffect(() => {
        async function carregarDados() {
            try {
                // Nome do Usuário
                const userData = await AsyncStorage.getItem("@User");
                if (userData) {
                    const user = JSON.parse(userData);
                    setNomeUsuario(user.nome);
                }
                // Transações
                const salvas = await AsyncStorage.getItem("@transacoes");
                if (salvas) setListaTransacoes(JSON.parse(salvas));

                // Carregar Foto de Perfil Salva
                const fotoSalva = await AsyncStorage.getItem("@foto_perfil");
                if (fotoSalva) setFotoPerfil(fotoSalva);
            } catch (e) {
                console.log("Erro ao carregar dados:", e);
            }
        }
        carregarDados();
    }, []);

    // --- FUNÇÃO PARA SELECIONAR IMAGEM ---
    const selecionarImagem = async () => {
        // Solicita permissão da galeria
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert("Permissão necessária", "Precisamos de acesso à galeria para mudar a foto.");
            return;
        }

        // Abre a galeria do computador/celular
        let resultado = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!resultado.canceled) {
            const uri = resultado.assets[0].uri;
            setFotoPerfil(uri);
            // Salva o caminho da imagem permanentemente
            await AsyncStorage.setItem("@foto_perfil", uri);
        }
    };

    const persistir = async (novaLista) => {
        await AsyncStorage.setItem("@transacoes", JSON.stringify(novaLista));
    };

    const abrirModal = (tipo) => {
        setTipoOperacao(tipo);
        setModalVisible(true);
    };

    const salvarTransacao = () => {
        if (!titulo || !valor) return;

        const novaTransacao = {
            id: String(Date.now()),
            titulo, valor, tipo: tipoOperacao, descricao, categoria, data
        };

        const novaLista = [...listaTransacoes, novaTransacao];
        setListaTransacoes(novaLista);
        persistir(novaLista);

        setTitulo(''); setValor(''); setDescricao(''); setCategoria(''); setData('');
        setModalVisible(false);
    };

    const handleRemover = (id) => {
        const listaAtualizada = removerTransacao(listaTransacoes, id);
        setListaTransacoes(listaAtualizada);
        persistir(listaAtualizada);
    };

    const handleSair = async () => {
        await AsyncStorage.removeItem("@logado");
        navigation.replace('Login');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 20 }}>
                    <Pressable onPress={handleSair}>
                        <MaterialIcons name="logout" size={28} color="white" />
                    </Pressable>
                </View>

                {/* IMAGEM DE PERFIL CLsICÁVEL */}
                <Pressable onPress={selecionarImagem} style={styles.containerFoto}>
                    <View style={styles.wrapperFoto}>
                        <Image
                            style={styles.iconePerfil}
                            source={fotoPerfil ? { uri: fotoPerfil } : require('../../../assets/iconePerfil.png')}
                        />
                        <View style={styles.badgeCamera}>
                            <MaterialIcons name="photo-camera" size={18} color="#CC0000" />
                        </View>
                    </View>
                </Pressable>

                <Text style={styles.txtNome}>Olá, {nomeUsuario}</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.Tsaldo}>Saldo</Text>
                    <Pressable onPress={() => setVerSaldo(!verSaldo)} style={{ marginLeft: 10 }}>
                        <MaterialIcons
                            name={verSaldo ? "visibility" : "visibility-off"}
                            size={22}
                            color="white"
                        />
                    </Pressable>
                </View>

                <Text style={styles.Vsaldo}>
                    {verSaldo ? calcularSaldo(listaTransacoes) : "****"}
                </Text>
            </View>

            <Text style={styles.tituloSecao}>Ações rápidas:</Text>
            <View style={styles.menuAcoes}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollAcoes}>
                    <Pressable style={styles.botaoAcao}>
                        <View style={styles.circuloIcone}>
                            <Image source={require('../../../assets/pagar.png')} style={styles.iconeAcao} />
                        </View>
                        <Text style={styles.txtAcao}>Pagar</Text>
                    </Pressable>
                    <Pressable style={styles.botaoAcao}>

                        <View style={styles.circuloIcone}>
                            <Image source={require('../../../assets/transferir.png')} style={styles.iconeAcao} />
                        </View>

                        <Text style={styles.txtAcao}>Transferir</Text>
                    </Pressable>

                    <Pressable style={styles.botaoAcao}>
                        <View style={styles.circuloIcone}>
                            <Image source={require('../../../assets/recargar.png')} style={styles.iconeAcao} />
                        </View>
                        <Text style={styles.txtAcao}>Recarga</Text>
                    </Pressable>

                </ScrollView>
            </View>

            <Text style={styles.tituloExtrato}>Historico recente</Text>

            {/*FLATLIST COMECA AQ */}
            <FlatList
                data={listaTransacoes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.box}>
                        <View style={styles.containerIconeCategoria}>
                            <MaterialIcons
                                name={
                                    item.categoria?.trim() === 'Alimentação' ? 'restaurant' :
                                        item.categoria?.trim() === 'Lazer' ? 'local-play' :
                                            item.categoria?.trim() === 'Saúde' ? 'medical-services' :
                                                item.categoria?.trim() === 'Transporte' ? 'directions-car' : 'attach-money'
                                }
                                size={24} color="#666"
                            />
                        </View>
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.txt}>{item.titulo}</Text>
                                <Text style={styles.txtData}>{item.data}</Text>
                            </View>
                            <Text style={[styles.txtValor, { color: item.tipo === 'entrada' ? '#2E7D32' : '#D32F2F' }]}>
                                {item.tipo === 'entrada' ? '+' : '-'} R$ {Number(item.valor).toFixed(2).replace('.', ',')}
                            </Text>
                            <View style={styles.boxDetalhes}>
                                <Text style={styles.txtCategoria}>{item.categoria}</Text>
                                {item.descricao ? <Text style={styles.txtDescricao} numberOfLines={1}> • {item.descricao}</Text> : null}
                            </View>
                        </View>
                        <Pressable onPress={() => handleRemover(item.id)} style={styles.btnDeletar}>
                            <MaterialIcons name="delete-outline" size={22} color="#CCC" />
                        </Pressable>
                    </View>
                )}
                contentContainerStyle={styles.ganhosGastos}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <MaterialIcons name="history" size={50} color="#DDD" />
                        <Text style={styles.emptyText}>Nenhuma transação recente.</Text>
                    </View>
                )}
            />

            <View style={styles.boxImg}>
                <Pressable onPress={() => abrirModal('entrada')}>
                    <Image style={styles.img} source={require('../../../assets/add.png')} />
                </Pressable>
                <Pressable onPress={() => abrirModal('saida')}>
                    <Image style={styles.img} source={require('../../../assets/minus.png')} />
                </Pressable>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHandle} />
                        <Text style={styles.modalTitle}>
                            Nova {tipoOperacao === 'entrada' ? 'Entrada' : 'Saída'}
                        </Text>
                        <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
                            <TextInput style={styles.input} placeholder="Nome da transação" value={titulo} onChangeText={setTitulo} />
                            <TextInput style={styles.input} placeholder="Valor R$" keyboardType="numeric" value={valor} onChangeText={setValor} />
                            <TextInput style={styles.input} placeholder="Data (Ex: 14/02)" value={data} onChangeText={setData} />

                            <Text style={styles.label}>Categoria</Text>
                            <View style={styles.radioContainer}>
                                {['Lazer', 'Saúde', 'Transporte', 'Alimentação'].map((item) => (
                                    <Pressable
                                        key={item}
                                        style={[styles.radioButton, categoria === item && styles.radioSelected]}
                                        onPress={() => setCategoria(item)}
                                    >
                                        <Text style={[styles.radioText, categoria === item && styles.radioTextSelected]}>{item}</Text>
                                    </Pressable>
                                ))}
                            </View>

                            <TextInput style={[styles.input, { height: 80 }]} multiline placeholder="Descrição opcional" value={descricao} onChangeText={setDescricao} />

                            <Pressable
                                style={[styles.btnSalvar, { backgroundColor: tipoOperacao === 'entrada' ? '#CC0000' : '#ff0000' }]}
                                onPress={salvarTransacao}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>CONFIRMAR</Text>
                            </Pressable>
                            <Pressable onPress={() => setModalVisible(false)} style={styles.btnFechar}>
                                <Text style={{ color: '#CC0000', fontWeight: 'bold' }}>Voltar</Text>
                            </Pressable>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
            <StatusBar style="auto" />
        </View>
    );
}