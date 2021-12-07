import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect ,setState } from "react";
import { Animated, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ImageBackground, Keyframe, ToastAndroid, FlatList, TextInput, Alert, Image} from 'react-native';
import { Avatar, Button, Title, Paragraph } from 'react-native-paper';
import { auth, db } from "../../firebase";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Linked,NameUser, ProfileImage, Profile,Search, CartIcon, Nav, Lupa} from '../../StyleComponents/stylesSheet'
import { slide as Menu } from 'react-burger-menu'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Page2 from '../Page2/Page2'
import { createKeyboardAwareNavigator } from 'react-navigation';
import { getDatabase, ref, set ,onValue, push, remove} from "firebase/database";
import { useNavigation } from "@react-navigation/core";
const NavBar = (props) => {

  const navigation = useNavigation();


  var txt = ""
  const state = {
    animation: new Animated.Value(-300),
  };
   const [open, setOpen] = useState(false)

  const stateOff = {
    animation: new Animated.Value(0),
  };

  console.log("nav", props)

  function componentDidMount() {

    if(props.show === true){
      Animated.timing(state.animation, {
        toValue: 0,
        useNativeDriver: true,
        duration: 500,
      }).start();
    }else{
      Animated.timing(stateOff.animation, {
        toValue: -300,
        useNativeDriver: true,
        duration: 500,
      }).start();
    }
    
  }

  

  

  componentDidMount()



  const boxStyle = {
    transform: [
      { translateX: state.animation},

    ],
  };

  const BottonBurger = () =>{

    return(
      <TouchableOpacity style={props.show?({position:"absolute", bottom: 3, left: 3}):({position:"absolute", bottom: 0})} onPress={props.bar}><Ionicons name={props.show?('ios-close-sharp'):('reorder-three-sharp')} color='#F0BB62' size={props.show? (40):(45)}></Ionicons></TouchableOpacity>
    )

  }

  const Cart = () => {
    return(
      <CartIcon><Ionicons name="cart-sharp" color='white' size={30}></Ionicons></CartIcon>
    )
  }



 

  const SearchBar = (props) => {
    const [text, onChangeText] = React.useState("");

    console.log("Search", props)
    function search(txtl){

      // console.log(    props.getdata      )
       let arr = []
   
        if(!txtl){
         console.log("Vacio")
         getData()
   
       }else{
         getData()
         for(let i=0; i< props.listaN.length; i++){
           
           if(props.listaN[i].Nombre.includes(txtl)){
               arr.push(props.listaN[i])
               props.searchN(arr)
           }
         
         }
       } 
       
       
     }

     const handleKeypress = e => {   
       console.log(e)
         if (e.keyCode === 13)
          {    console.log("Enter") 
                      } 
       };

     function getData(){
      console.log("data")
  
      const db = getDatabase();
      const starCountRef = ref(db,"Productos/");
      onValue(starCountRef, (snapshot) => {
        let arr = []
        const data = snapshot.val();
        snapshot.forEach(function(item) {
          var itemVal = item.val();
          arr.push(itemVal);
      });
  
        props.searchN(arr)
      });
    }

    return(

      <View style={{width: "60%", position: "absolute", bottom: 10, left: "25%"}}>
            <Search onChangeText={(text) => {
              search(text)
              }} value={text}>
            </Search>
            <Lupa><Ionicons name="search-sharp" color='white' size={20}></Ionicons></Lupa>

      </View>
      

    )
  }

  function redirect(){
    props.nav.navigate('Info')
  }


  const Info = ({navigation}) => {

    return (
      <View style={{backgroundColor: "#000", width: "100%", height: "100%"}}>
                           
     </View>
    );


  }

    const Drawer = createDrawerNavigator();
  return (

    <View>
      
      {props.show? (
      <SafeAreaView style={stylesh.backC}>
      <Nav>
            <BottonBurger></BottonBurger>
            <SearchBar searchN={props.search} listaN={props.lista}></SearchBar>

            <Cart></Cart>
      </Nav>
      <Animated.View style={[stylesh.box, boxStyle]}>
          <Profile>
              <ProfileImage>
                  <ImageBackground source={ !props.photo ? require('../../assets/img/me.jpg' ): {uri: props.photo}} style={{width: "100%", height: "100%"}}></ImageBackground>
                  
              </ProfileImage>
              <NameUser>
                <Text style={{bottom: 0, position: "absolute", fontSize: 22, color: "white"}}>NameUser</Text>
              </NameUser>
              
          </Profile>
          <Linked onPress={redirect}>
              <Text style={{color: "white", fontSize: 24}}>Favoritos</Text>
          </Linked>
          <Linked>
              <Text style={{color: "white", fontSize: 24}}>Historial</Text>
          </Linked>
      </Animated.View>
    </SafeAreaView>
    ):(
        <Nav>
            <BottonBurger></BottonBurger>
            <SearchBar searchN={props.search} listaN={props.lista}></SearchBar>

            <Cart></Cart>
        </Nav>
    )}
    </View>
       
  );

}

const stylesh = StyleSheet.create({
  box: {
    width: 300,
    height: 800,
    backgroundColor: "#556b2f",
    left: 0,
  },
  backC:{
    backgroundColor: "transparent",
    zIndex:100,
    width: "100%",
    height: "100%",
    

  },
  
})

export default NavBar;


