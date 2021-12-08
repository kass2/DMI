import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect ,setState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Keyframe, ToastAndroid, FlatList, TextInput, Alert, Image} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { getDatabase, ref, set ,onValue, push} from "firebase/database";
import { auth, db } from "../../firebase";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/core"; 
import i18n from "../../localization/i18n"
export default function favoritos(props) {
  const [value, onChangeTexto] = React.useState('Escribe aqui...');
  const [state, setStat] = React.useState(false)
  const [pic, setPic] = React.useState(null)
  const navigation = useNavigation();
  /* const navigation = props.navigation; */

  useEffect(() => {
    console.log("page2", props)
  },[])
  
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
          Alert.alert(i18n.t("Alert-Picture-Uploaded"));
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
         
    <View  style={stylesh.MainContainer}>
            <ImageBackground source={require('../../media/images/fondo2.jpg')} style={{position: "absolute", zIndex: 1, width: "100%", height: "100%", opacity: 0.3}}></ImageBackground>
        
                 <Text style={{fontWeight:"bold", fontSize:30}}>{i18n.t("Title-Favourite-Interface")}</Text>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <ImageBackground source={ !props.items ? require('../../assets/img/me.jpg' ): {uri: props.items}}  style={{position: "absolute", zIndex: 1, width: "100%", height: "100%"}}  style={{...stylesh.imageMe}} ></ImageBackground>
                <Text style={{fontSize: 15, marginTop: 10, color:"#030303",fontWeight: "bold",textAlign:"center"}}>
               <Ionicons name="call" size={20}></Ionicons>
               <Text> {i18n.t("Name-Product")}</Text>
               <Text> {i18n.t("Price-Product")}</Text>
               <TouchableOpacity><Ionicons name="trash" size={20}></Ionicons></TouchableOpacity>
               </Text>

              </View>
      </View>
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

