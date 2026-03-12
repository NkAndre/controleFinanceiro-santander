import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    boxImg: {
        flex: 0.4, //
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#EC0000',
    },
    img: {
        width: 180,
        height: 90,
        resizeMode: 'contain',
    },
    form: {
        flex: 0.6, 
        paddingHorizontal: 30,
        paddingTop: 50, 
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -30,
        backgroundColor: '#FFFFFF',
        
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    label: {
        fontSize: 20, 
        color: '#333',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    input: {
        borderBottomWidth: 1.5,
        height:45,
        padding:10,
        fontWeight:'bold',
        borderBottomColor: '#EC0000',
        fontSize: 18,
        paddingVertical: 10,
        marginBottom: 25,
        color: '#a91010',
    },
    txtCadastrar:{
        fontSize:15,
        padding:10,
        color:'blue'
    },
    txtNormal:{
        fontSize:15,
        padding:10,
    },
    btn: {
        backgroundColor: '#EC0000',
        width: '100%',
        height: 50,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        elevation: 9,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    txtNormal:{
        fontSize:18,
        padding:10,
        textAlign:'center',
        color: '#EC0000',
    },
});