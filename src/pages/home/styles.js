    import { StyleSheet } from "react-native";

    export default StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: '#F5F5F5',
        },
        img: {
            width: 60,
            height: 60,
            margin: 10,
            right:-26,
        },
        iconePerfil: {
            
        width: 55,
            height: 55,
            borderRadius: 300, 
            marginBottom: 10,
            padding:-20,
            backgroundColor:'#fff'
        },

        iconeDeletar: {
            height: 25,
            width: 25,
            tintColor: '#CC0000', // Deixa o ícone vermelho viia código
        },
        header: {
            width: '100%',
        
    
            backgroundColor: '#EC0000',
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            alignItems: 'center',     
            justifyContent: 'center',   
            paddingTop: 40,            
            paddingBottom: 25,         
            elevation: 5,
        },
        Tsaldo: {
            color: 'white',
            fontSize: 16,
            marginBottom: -5
        },
        txtNome: {
            fontSize: 18,
            color: '#fff',
            padding: 10,

        },
        Vsaldo: {
            fontSize: 38,
            color: 'white',
            fontWeight: 'bold'
        },

        menuAcoes: {
            width: '100%',
            marginVertical: 15,
            height: 100,
        },
        scrollAcoes: {
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 20,
        },
        botaoAcao: {
            alignItems: 'center',
            flexGrow: 1,
            mmarginHorizontal: 10,
            width: 75,
        },
        circuloIcone: {
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: '#FFF', // Fundo branco para o ícone se destacar
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 4, // Sombra no Android
            shadowColor: '#000', // Sombra no iOS
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            marginBottom: 8,
        },
        iconeAcao: {
            width: 30,
            height: 30,
            resizeMode: 'contain',
        },

        tituloSecao: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#333',         
            marginLeft: 20,         
            marginTop: 20,        
            marginBottom: 5,       
            alignSelf: 'flex-start' 
        },
        txtAcao: {
            fontSize: 12,
            color: '#333',
            fontWeight: '500',
        },

        tituloExtrato: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#333',
            alignSelf: 'flex-start',
            marginLeft: 25,
            marginTop: 10,
            marginBottom: 10,
        },
        box: {
            padding: 15,
            width: '95%',
            backgroundColor: '#FFF',
            borderRadius: 12,
            marginVertical: 6,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            elevation: 3,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
        },
        txt: {
            color: '#333',
            fontWeight: 'bold',
            fontSize: 16,
        },
        boxImg: {
            position: 'absolute',
            bottom: 30,
            right: 20,
            zIndex: 10,
        },

        /* --- MODAL ESTIiiiLO SANTANDER --- */
        modalOverlay: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'flex-end',
        },
        modalContent: {
            width: '100%',
            backgroundColor: '#FFF',
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            padding: 25,
            maxHeight: '85%',
            alignItems: 'center',
            elevation: 20,
        },
        modalHandle: {
            width: 40,
            height: 5,
            backgroundColor: '#E0E0E0',
            borderRadius: 3,
            marginBottom: 20,
        },
        modalTitle: {
            fontSize: 22,
            fontWeight: 'bold',
            marginBottom: 25,
            color: '#333',
        },
        input: {
            width: '100%',
            height: 55,
            borderBottomWidth: 1.5,
            borderBottomColor: '#F0F0F0',
            marginBottom: 15,
            paddingHorizontal: 5,
            fontSize: 18,
            color: '#333',
        },
        btnSalvar: {
            width: '100%',
            padding: 16,
            borderRadius: 30,
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 10,
        },
        btnFechar: {
            width: '100%',
            padding: 12,
            alignItems: 'center',
            marginTop: 5,
        },
        ganhosGastos: {
            paddingHorizontal: 10,
            paddingBottom: 120,
            alignItems: 'center'
        },
        label: {
            alignSelf: 'flex-start',
            color: '#666',
            fontSize: 14,
            marginBottom: 10,
            fontWeight: 'bold',
            marginTop: 10,
        },
        radioContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
            width: '100%',
            marginBottom: 20,
        },
        radioButton: {
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: '#DDD',
            backgroundColor: '#FFF',
        },
        radioSelected: {
            backgroundColor: '#EC0000',
            borderColor: '#EC0000',
        },
        radioText: {
            color: '#666',
            fontSize: 13,
            fontWeight: 'bold'
        },
        radioTextSelected: {
            color: '#FFF',
            fontWeight: 'bold',
        },
        // ... seus estilos anteriores

    containerIconeCategoria: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtData: {
        fontSize: 12,
        color: '#999',
    },
    txtValor: {
        fontSize: 15,
        fontWeight: 'bold',
        marginVertical: 2,
    },
    boxDetalhes: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    txtCategoria: {
        fontSize: 12,
        color: '#666',
        backgroundColor: '#E8E8E8',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    txtDescricao: {
        fontSize: 12,
        color: '#888',
        fontStyle: 'italic',
        flex: 1,
    },
    btnDeletar: {
        padding: 5,
        marginLeft: 5,
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    emptyText: {
        color: '#999',
        fontSize: 16,
        marginTop: 10,
    },
    ganhosGastos: {
        paddingHorizontal: 15, // Aumentado para dar respiro lateral
        paddingBottom: 120,
        width: '100%',
    },

    // ... seus outros estilos

containerFoto: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
},

wrapperFoto: {
    position: 'relative', 
},

iconePerfil: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#fff',
},

badgeCamera: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 4,
    // Sombras para dar destaque
    elevation: 5, 
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
},

    });