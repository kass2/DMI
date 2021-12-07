import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect ,setState } from "react";
import {Animated, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ImageBackground, Keyframe, ToastAndroid, FlatList, TextInput, Alert, Image,KeyboardAvoidingView,} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { getDatabase, ref, set ,onValue, push} from "firebase/database";
import { auth, db } from "../../firebase";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/core"; 
import { Header, Fotter, Desc, Prize, Name} from '../../StyleComponents/stylesSheet';


export default function Info(props) {
  const [value, onChangeTexto] = React.useState('Escribe aqui...');
  const [state, setStat] = React.useState(false)
  const [pic, setPic] = React.useState(null)
  const navigation = useNavigation();
  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState(null);
  const [cantidad, setCantidad] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  /* const navigation = props.navigation; */

  useEffect(() => {
    console.log("page2", props)
  },[])
  

  function limitador(str){
    const fin = str.substring(0, 23);
    
      return fin
  
  }

 async function Gallery (props) {
    let result = await ImagePicker.launchImageLibraryAsync()
    //let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      uploadImage(result.uri, "test-image")
        .then(() => {
         
        })
        .catch((error) => {
          Alert.alert(error);
        });
    }
  }

  async function Camera (params) {
    let result = await ImagePicker.launchCameraAsync();
    //let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      uploadImage(result.uri)
        .then(() => {
         
        })
        .catch((error) => {
          Alert.alert(error);
        });
    }
  }

  async function uploadImage(uri) {
    const response = await fetch(uri);
    const blob = await response.blob();
    let rand = generateRandomString(6);
    var ref = storage.ref().child("images/" + rand);
    ref.put(blob).then(data => {
      data.ref.getDownloadURL().then(url => {
          /* console.log(url) */
          Alert.alert("Imagen subida");
         writeUserData(url)
      });
    })
  }

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const logout = async ()=>{
    await firebase.auth().signOut();
  }
 
return (
  <View style={stylesh.MainContainer}>
         
    {/* <View  style={stylesh.MainContainer}>
            <ImageBackground source={require('../../media/images/fondo2.jpg')} style={{position: "absolute", zIndex: 1, width: "100%", height: "100%", opacity: 0.3}}></ImageBackground>
            <Card style={{width: "100%", height: "100%"}}>
              <Header>
                   <ImageBackground source={require('../../assets/img/orange.png')} style={{width:"100%", height: "100%", borderRadius: "40px"}} resizeMode="contain"></ImageBackground>
               </Header>
              <Fotter>
                <Name>
                  <Text style={{fontSize: 22}}>{limitador('Naranja')}</Text>
                </Name>
                <Text style={{fontSize: 22, textAlign: 'center'}}>{limitador('Marca: Campo')}</Text>
                <Text style={{fontSize: 22, textAlign: 'center'}}>{limitador('Descripción:')}</Text>
                <Desc>   
                  <Text style={{color:"black",fontSize: 18, opacity: 0.3}}>  Un buen par de zapatos puede ser costoso si lo compras a precio regular</Text>
                </Desc>
                <SafeAreaView>
                  <TextInput
                    style={stylesh.input}
                    onChangeText={onChangeText}
                    value={text}
                  />
                </SafeAreaView>
                
                <View style={stylesh.buttonContainer}>
                  <TouchableOpacity style={stylesh.button}>
                    <Text style={stylesh.buttonText}>Comprar ahora</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[stylesh.button, stylesh.buttonOutline]}>
                    <Text style={stylesh.buttonOutlineText}>Agregar al carrito</Text>
                  </TouchableOpacity>
                </View>   
                </Fotter>
                <Prize style={{height: "10%"}}>
                  <Text style={{fontSize: 27, color:"white"}} >$ 20.00 MXN</Text>
                </Prize>
            </Card>
      </View> */}

              <KeyboardAvoidingView style={stylesh.Keycontainer} behavior="padding">
              <ImageBackground source={require('../../media/images/fondo2.jpg')} style={{position: "absolute", flex: 1 ,width: "100%", height: "100%", opacity: 0.3}}></ImageBackground>   
                  
                  <View style={stylesh.inputContainer}>
                    {/* We have 2 text inputs that will set the state our our constants (email, pdw) */}
                    
                    <Card style={{width: "100%", height: "100%"}}>
                      <Header>
                          <ImageBackground source={require('../../assets/img/orange.png')} style={{width:"100%", height: "100%", borderRadius: "40px"}} resizeMode="contain"></ImageBackground>
                      </Header>
                      <Fotter>
                        <Name>
                          <Text style={{fontSize: 22}}>{limitador('Naranja')}</Text>
                        </Name>
                        <Text style={{fontSize: 22, textAlign: 'center'}}>{limitador('Marca: Campo')}</Text>
                        <Text style={{fontSize: 22, textAlign: 'center'}}>{limitador('Descripción:')}</Text>
                        <Desc>   
                          <Text style={{color:"black",fontSize: 18, opacity: 0.3}}>  Un buen par de zapatos puede ser costoso si lo compras a precio regular</Text>
                        </Desc>
                        <SafeAreaView>
                          <TextInput
                            style={stylesh.input}
                            onChangeText={onChangeNumber}
                            value={number}
                            placeholder="Cantidad"
                            keyboardType="numeric"
                          />
                        </SafeAreaView>
                        
                        <View style={stylesh.buttonContainer}>
                          <TouchableOpacity style={stylesh.button}>
                            <Text style={stylesh.buttonText}>Comprar ahora</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={[stylesh.button, stylesh.buttonOutline]}>
                            <Text style={stylesh.buttonOutlineText}>Agregar al carrito</Text>
                          </TouchableOpacity>
                        </View>   
                        </Fotter>
                        <Prize style={{height: "10%"}}>
                          <Text style={{fontSize: 27, color:"white"}} >$ 20.00 MXN</Text>
                        </Prize>
                    </Card>
                  </View>
                </KeyboardAvoidingView>


  </View>
             
           
         
  );

}

const stylesh = StyleSheet.create({
  container: {
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      zIndex:100,
      width: "100%",
      height: "100%"
  },
  Keycontainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: "80%",
  },
  notValid: {
      color: "red",
      zIndex: 100
  },
  valid: {
      color: "green",
  },
  normalText: {
      fontSize: 36,
      color: "black",
      zIndex: 100
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  buttonContainer: {
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
    justifyContent: 'center',
    margin: 2,
  },
  button: {
    backgroundColor: "#157B33",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    margin:15
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#556b2f",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#556b2f",
    fontWeight: "700",
    fontSize: 16,
  },
  aut:{
      backgroundColor: "#d39000",
      position:"absolute",
      alignItems: "center",
      top: 60,
      left: 30,
      color: "white",
      padding: 10,
      borderRadius: 10,
      zIndex: 100
  },
  plus: {
      position: "absolute",
      left: 0,
      height: 150,
      width: 100,
      borderBottomRightRadius: 20,
      borderTopRightRadius: 20,
      zIndex: 100
      
  },
  less: {
      position: "absolute",
      right: 0,
      height: 150,
      width: 100,
      borderBottomLeftRadius: 20,
      borderTopLeftRadius: 20,
      zIndex: 100
  },
  modo: {
      position: "absolute",
      bottom: 90,
      backgroundColor: "#8a9597",
      padding: 10,
      borderRadius: 30,
      zIndex: 100
  },
  tA: {
      fontSize: 25,
      color: "white"
  },
  count:{
      fontSize: 111,
      color: "white",
      fontWeight: "bold",
      zIndex: 100
      
  },
  plust: {
      top: 40
  },
  lesst: {
      top: 40
  },
  image: {
      justifyContent: "center",
      position: "absolute",
      zIndex: 1,
      width: "100%",
      height: "100%",

    },
    imageMe:{
      width: 250,
      height: 250,
      borderRadius: 100,
      

    },
    imageCon:{
      position: "absolute",
      zIndex: 300,
      width: "20%",
      height: "10%",
      right: "7%",
      top: 50,
      margin: 0,
      padding: 0,
      backgroundColor: "#000",
      borderRadius: 50
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    MainContainer :{
      alignItems: "center",
      alignContent: "center",
      textAlign: "center",
      justifyContent: 'center',
      flex:1,
      margin: 2,
    }, 
    imageView: {
    
        width: '50%',
        height: 100 ,
        margin: 7,
        borderRadius : 7
    
    },
    
    textView: {
    
        width:'50%', 
        textAlignVertical:'center',
        padding:10,
        color: '#000'
    
    },
    imageViewFin: {
    
      width: '97%',
      height: '80%' ,
      margin: 7,
      borderRadius : 7
  
  },
});


