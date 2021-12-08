import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect ,setState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Keyframe, ToastAndroid, FlatList, TextInput, Alert, Image} from 'react-native';
import { TextoInfo } from '../styles/StyleComp';
import * as ImagePicker from 'expo-image-picker';
import { auth, db, storage } from "../../firebase";

export default function Page2(props) {
  const [value, onChangeTexto] = React.useState('Escribe aqui...');
  const [state, setStat] = React.useState(true)
  const [pic, setPic] = React.useState(null)

 async function onChooseImagePress (params) {
    let result = await ImagePicker.launchImageLibraryAsync()
    //let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      this.uploadImage(result.uri, "test-image")
        .then(() => {
         
        })
        .catch((error) => {
          Alert.alert(error);
        });
    }
  }

  async function uploadImage(uri, imageName) {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = storage.ref().child("images/" + imageName);
    ref.put(blob).then(data => {
      data.ref.getDownloadURL().then(url => {
          /* console.log(url) */
          Alert.alert("Imagen subida");
      });
    })
  }
  return (
    <View style={stylesh.MainContainer}>
         {state ? (
             <View  style={stylesh.MainContainer}>
            <ImageBackground   source={require('../assets/img/65avion.jpg')}  style={{position: "absolute", zIndex: 1, width: "100%", height: "100%"}}></ImageBackground>
             <View style={{flex: 1, justifyContent: "center", alignItems:"center", position: "absolute", zIndex: 100}}>
             <ImageBackground   source={require('../assets/img/me.jpg')}  style={{...stylesh.imageMe}}  imageStyle={{ borderRadius: 50}}></ImageBackground>
               <TextoInfo style={{marginTop: 50}}>Hecho por: Sergio</TextoInfo>
               <TextoInfo style={{fontSize: 18, marginTop: 70}}>Universidad Tecnológica de Aguascalientes</TextoInfo>
               <TextoInfo style={{fontSize: 27, marginTop: 20, fontWeight: "bold", color: "blue"}}>10 A</TextoInfo>
             </View>
             <TouchableOpacity onPress={changeShow} style={{backgroundColor: "red", borderRadius: 30, width: 230, height: 40, alignItems: "center", marginTop: 520, zIndex: 700, position: "relative"}}><Text style={{fontSize: 33}}>Eliminar fotos</Text></TouchableOpacity>

           </View>
         ):(
            <View style={{width: "90%", height: "40%", borderRadius: 29, padding: 0, borderColor: "#000", borderStyle: "solid", borderWidth: 2, backgroundColor: "#8c702d"}}>
                <View style={{top: "30%", margin: 0, alignItems: "center", padding: 7,alignContent:"center", textAlign: "center"}}>
                    <Text style={{color: "#000", fontSize: 30, alignItems: "center", textAlign: "center"}}>¿Estás seguro que deseas eliminar todas las imagenes?</Text>
                </View>
                <TouchableOpacity onPress={changeS} style={{bottom: 0, left: 0, backgroundColor: "#fff", width: "50%", position: "absolute", alignItems: "center", borderBottomLeftRadius: 30}}><Text style={{fontSize: 38}}>Sí</Text></TouchableOpacity>
                <TouchableOpacity onPress={changeN} style={{bottom: 0, right: 0, backgroundColor: "#fff", width: "50%", position: "absolute", alignItems: "center", borderBottomRightRadius: 30}}><Text style={{fontSize: 38}}>No</Text></TouchableOpacity>

            </View>         
  
         )}
   </View>
  );

}

const styles = StyleSheet.create({
  container: {
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      zIndex:100,
      width: "100%",
      height: "100%"
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
  buttonText: {
      fontSize: 50,
      color: "white",
  },
  buttonTextM: {
      fontSize: 20,
      color: "white",
  },
  boldText: {
      fontWeight: "bold",
  },
  buttonStyles: {
      
      padding: 5,
      backgroundColor: "#d39000",
      alignItems: "center",
      zIndex: 100,
  
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
      width: 150,
      height: 150,
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
      margin: 5,
      marginTop: (Platform.OS === 'ios') ? 20 : 0,
     
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

