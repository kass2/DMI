import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect ,setState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Keyframe, ToastAndroid, FlatList, TextInput, Alert, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/core";
import { auth, db, storage } from "../../firebase";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from '../Login/index';
import Info from '../Info/index';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RecaptchaVerifier } from "firebase/auth";
import { getDatabase, ref, set ,onValue, push} from "firebase/database";


export default function Page2(props) {
  const [value, onChangeTexto] = React.useState('Escribe aqui...');
  const [state, setStat] = React.useState(false)
  const [toggleT, setToggleTel] = React.useState(false)
  const [toggleD, setToggleDom] = React.useState(false)
  const [cell, setCell] = React.useState("")
  const [dataU, setArrayHolder] = React.useState([]);
  const [address, setAddress] = React.useState("")
  const [Domicilio, setDom] = React.useState("Sin domicilio")
  const [Telefono, setTel] = React.useState("Sin numero")
  const [pic, setPic] = React.useState(null)
  const navigation = useNavigation();
  
  var arr = []
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
          Alert.alert("Imagen subida");
         writeUserData(url)
      });
    })
  }

  function getDataUser(){


    console.log("data")

    const db = getDatabase();
    const starCountRef = ref(db,"Usuarios/" + props.uid + "/");
    onValue(starCountRef, (snapshot) => {
      let arr = []
      const data = snapshot.val();

      if(data) {
            snapshot.forEach(function(item) {
              var itemVal = item.val();
            
              arr.push(itemVal);
              
          });
          arr.sort();
          console.log(arr)
          if(arr[0].address){
            setDom(arr[0].address)

            if(arr.length == 2){
              setTel(arr[1].telefono)
            }
         
          }else{
            setTel(arr[0].telefono)
          }

          

          

      }
      
      
  

    });
     
   
  }

  useEffect(() => {
    setArrayHolder([])
   //writeUserData()
   getDataUser()
    //handleSignOut()
  }, []);

  

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        props.navi.replace('Login');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const Info = () => {
    props.navi.replace('Info');
  };

  const logout = async ()=>{
    await firebase.auth().signOut();
  }
  
  const  generateRandomString = (num) => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result1= ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < num; i++ ) {
        result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result1;
}

  function alarta(){
    if(state){
      setStat(false);
    }else{
      setStat(true);
    }
    
  }

  function writeUserData(url) {
    var user = auth.currentUser;
    user.updateProfile({  
      //displayName: "Jane Q. User",  
      photoURL: url}).then(function()
       { 
         props.photo(url)
         console.log("Update")
      }
    )}

    function writeUserCell() {
      set(ref(db, "Usuarios/"+ props.uid +  '/' + 'telefono'), {

        telefono: cell
       
      });
     
    }

    function writeUserAddress() {
      set(ref(db, "Usuarios/"+ props.uid +  '/' + 'Domicilio'), {

        address: address
       
      });
    
    }

    function toggleTel(){
        if(toggleT){
          setToggleTel(false)
        }else{
          setToggleTel(true)
        }
    }

    function toggleDom(){
      if(toggleD){
        setToggleDom(false)
      }else{
        setToggleDom(true)
      }
    }
    
  return (
    <View style={stylesh.MainContainer}>
         
             <View  style={stylesh.MainContainer}>
            <ImageBackground source={require('../../media/images/fondo2.jpg')} style={{position: "absolute", zIndex: 1, width: "100%", height: "100%", opacity: 0.3}}></ImageBackground>
             <View style={{flex: 1, justifyContent: "center", alignItems:"center", position: "absolute", zIndex: 100}}>
             <ImageBackground source={ !props.items ? require('../../assets/img/me.jpg' ): {uri: props.items}}  style={{position: "absolute", zIndex: 1, width: "100%", height: "100%"}}  style={{...stylesh.imageMe}}  imageStyle={{ borderRadius: 50}}></ImageBackground>
               <Text style={{marginTop: 20, fontSize: 20, color:"#030303", fontWeight: "bold"}}>
               <Ionicons name="mail" size={20}></Ionicons>
                 {props.email}</Text>
               <Text style={{fontSize: 15, marginTop: 10, color:"#030303",fontWeight: "bold",textAlign:"center",marginRight: 30}}>
               <Ionicons name="call" size={20}></Ionicons>
               {Telefono}
               <TouchableOpacity onPress={toggleTel}><Ionicons name="create" size={20}></Ionicons></TouchableOpacity>
               </Text>
               {toggleT?(
                 <View style={{width: "100%"}}>
                 <TextInput onChangeText={(text) => setCell(text)} value={cell} style={{width: "80%", backgroundColor: "#000", height: 30, position: "absolute", left: 0, color: "white"}} mobile={true} pattern="[0-9]*" keyboardType={'phone-pad'}></TextInput>
                 <Ionicons name="checkmark-outline" size={30}  style={{position: "absolute", right: 0}} onPress={writeUserCell}></Ionicons>
            </View>
               ):(<View></View>)}
               
               <Text style={{fontSize: 23, marginTop: 40, fontWeight: "bold", color: "#030303", marginRight: 30}}>
               <Ionicons name="home" size={20}></Ionicons>
               {Domicilio}
               <TouchableOpacity onPress={toggleDom}><Ionicons name="create" size={20}></Ionicons></TouchableOpacity>
               </Text>
               {toggleD?(
                 <View style={{width: "100%"}} >
                 <TextInput onChangeText={(text) => setAddress(text)} value={address} style={{width: "80%", backgroundColor: "#000", height: 30, position: "relative", left: 0,  color: "white"}}></TextInput>
                 <Ionicons name="checkmark-outline" size={30}  style={{position: "absolute", right: 0}} onPress={writeUserAddress}></Ionicons>
            </View>   
               ):(<View></View>)}
               
             </View>
             <TouchableOpacity onPress={alarta} style={{backgroundColor: "#157B33", borderRadius: 30, width: 230, height: 40, alignItems: "center", marginTop: 650, zIndex: 400, position: "relative"}}><Text style={{fontSize: 30, color:"#FEFEFE"}}>Subir foto</Text></TouchableOpacity>
             <TouchableOpacity onPress={handleSignOut} style={{backgroundColor: "#157B33", borderRadius: 30, width: 230, height: 25, alignItems: "center", marginTop: 10, zIndex: 700, position: "relative"}}><Text style={{fontSize: 18, color:"#FEFEFE"}}>Cerrar Sesion</Text></TouchableOpacity>
             <TouchableOpacity onPress={Info} style={{backgroundColor: "#157B33", borderRadius: 30, width: 230, height: 25, alignItems: "center", marginTop: 10, zIndex: 700, position: "relative"}}><Text style={{fontSize: 18, color:"#FEFEFE"}}>Info</Text></TouchableOpacity>
           </View>
           {state?(
              <View style={{position:'absolute',zIndex:100, width:"40%", height:"10%", backgroundColor: "#FFBF00", opacity: 0.9, borderRadius:20, textAlign:"center"}}>
              <TouchableOpacity onPress={Gallery} style={{position:'absolute', alignItems: "center",left: 30, top:12}}><Ionicons name='ios-images-outline' color='white' size={30}></Ionicons></TouchableOpacity>
              <TouchableOpacity onPress={Camera} style={{position:'absolute', right: 30, top:12}}><Ionicons name='ios-camera-outline' color='white' size={30}></Ionicons></TouchableOpacity>
              </View>
           ):(<View></View>)}
           
         
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

