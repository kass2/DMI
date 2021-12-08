import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect ,setState } from "react";
import {Animated, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ImageBackground, Keyframe, ToastAndroid, FlatList, TextInput, Alert, Image} from 'react-native';
import { Avatar, Button, Title, Paragraph } from 'react-native-paper';
import { getDatabase, ref, set ,onValue, push} from "firebase/database";
import { auth, db } from "../../firebase";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/core";
import i18n from "../../localization/i18n"
import {Card, Header, Fotter, Desc, Prize, Name} from '../../StyleComponents/stylesSheet'
import NavBar from '../navBar/NavBar'

 
export default function historial(props) {
  const [value, onChangeTexto] = React.useState('Escribe aqui...');
  const [states, setStat] = React.useState(false)
  const [pic, setPic] = React.useState(null)
  const [text, setText] = useState('');
  const renderItem = ({ item }) => (
    <Item title={item.name} />
  );

    
  function toggleBar(){
    if(states){
      setStat(false)
    }else{
      setStat(true)
    }
  }

  function limitador(str){
    const fin = str.substring(0, 23);
    
      return fin
  
  }

  return (
    
  <SafeAreaView style={stylesh.container}>

  <NavBar bar={toggleBar} show={states} search={props.searchItem} lista={props.items} getdata={props.getdata} photo={props.photo} nav={props.nave}></NavBar>
  
  <FlatList style={states? ({width: "100%", height: "100%", top: 90,  position: "absolute", zIndex: 9}):({width: "100%", height: "100%"})}
     
  data={props.items}
  
  renderItem={({item}) => 

      <View style={{width: "100%", height: "100%", flex: 1, alignItems: "center"}}>
         <ImageBackground source={require('../../media/images/fondo2.jpg')} style={{position: "absolute", zIndex: 1, width: "100%", height: "100%", opacity: 0.3}}></ImageBackground>
               <Card >
               <Header>
               <TouchableOpacity><Ionicons name="trash" size={33} style={{marginLeft:"87%", marginTop:"5%", color:"#de7206"}}></Ionicons></TouchableOpacity>
                   <ImageBackground source={{uri: item.Imagen}} style={{width:"90%", height: "90%", borderRadius: "40px"}} resizeMode="contain"></ImageBackground>
               </Header>
               <Fotter>
                   <Name>
                     <Text style={{fontSize: 22}}>{limitador(item.Nombre)}</Text>
                   </Name>
                   <Desc>   
                     <Text style={{fontSize: 18, opacity: 0.3}}>  Cantidad </Text>
                   </Desc>   
               </Fotter>
                   <Prize>
                     <Text style={{fontSize: 27, color:"white"}} >$ {item.Precio}.00 MXN</Text>
                   </Prize>
         </Card>
      </View>
  
    }

  keyExtractor={(item, index) => index.toString()}
  
  />

  </SafeAreaView>
  
  );

}

const stylesh = StyleSheet.create({
  container: {
      zIndex:100,
      width: "100%",
      height: "100%",
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
      width: "100%",
      height: "100%",
      borderRadius: 50,
      position: "absolute",
      zIndex: 2
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
 
      justifyContent: 'center',
      flex:1,
      margin: 5,
      marginTop: 20,
     
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
      color: '#000',
      fontSize: 22
   
  },
  textView2: {
   
    width:'20%', 
    textAlignVertical:'center',
    padding:10,
    color: '#000',
    fontSize: 22
  },
borrar:{
  width: 60,
  height: "100%",
  position: "absolute",
  right: "20%",
  backgroundColor: "#5e2129"
},
completed:{
  width: 60,
  height: "100%",
  position: "absolute",
  right: "5%",
  backgroundColor: "green"
},
  imageViewFin: {
   
    width: '97%',
    height: '80%' ,
    margin: 7,
    borderRadius : 7
 
},
box: {
  width: 300,
  height: "100%",
  backgroundColor: "#556b2f",
  transform: [
    { translateX: 0},
  ],
  position: "absolute",
  left: 0,
  zIndex: 1
},
box2: {
  width: 100,
  height: 100,
  backgroundColor: "blue",
},
});

