import { useNavigation } from "@react-navigation/core";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState, useEffect ,setState } from "react";
import { SafeAreaView ,StyleSheet, Text, View, TouchableOpacity, ImageBackground, Keyframe, ToastAndroid, FlatList, TextInput, Alert, Image} from 'react-native';
// auth is an instance of firebase.auth() and it is imported from the firebase.js file
import { auth, db } from "../../firebase";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getDatabase, ref, set ,onValue, push, remove} from "firebase/database";
import logo from "../../media/images/fod.png";
import Page1 from '../Page1/Page1'
import Page2 from '../Page2/Page2'
import Favoritos from "../Favoritos/Favoritos";
import Historial from "../Historial/Historial";

const Tab = createBottomTabNavigator();

const HomePage = ({ route }) => {
  // navigation is an instance of our current NavigationContainer and we access to it trough the useNavigation() custom hook
  const navigation = useNavigation();
  const [Lalista, setArrayHolder] = React.useState([]);
  const [photoURL, setPhoto ] = React.useState(route.params.photoURL)
  const { itemId, otherParams } = route.params;
  const { email, otheNav } = route.params;

  const { navi, otherEmail } = route.params;
  // We will make a simple call to auth.signOut() which is also a promise based function and if it fullfills
  // we redirect the user to Login
  const handleSignOut = () => {
    navi.navigate("Login")
  };


  function writeUserData(userId, name, email, imageUrl) {
    push(ref(db, 'Sergio/'), {
      
      username: "rr",
      data: "asda"
     
    });
    console.log()
  }

  

  //writeUserData()
  useEffect(() => {
    setArrayHolder([])
   //writeUserData()
    getData()
    console.log(itemId)
    //handleSignOut()
  }, []);
  
  function getData(){
    console.log("data")

    const db = getDatabase();
    const starCountRef = ref(db,"Productos/");
    onValue(starCountRef, (snapshot) => {
      let arr = []
      const data = snapshot.val();
      snapshot.forEach(function(item) {
        var itemVal = item.val();
        console.log("dsadsadad",item)
        arr.push(itemVal);
    });

      setArrayHolder(arr)
    });
  }

  function LeftSwipeActions(){
      console.log("asdads")
  }

  function rightSwipeActions(){
      console.log("asdadd")
  }
  return (
    <NavigationContainer independent={true}>
      
      <Tab.Navigator

        screenOptions={({ route }) => ({

          tabBarStyle:[
              {
                backgroundColor: "#556b2f",
              }
          ],
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Camara') {
              iconName = focused
                ? 'camera-outline'
                : 'camera-outline';
            } else if (route.name === 'Navegar') {
              iconName = focused ? 'ios-apps-sharp' : 'ios-apps-sharp';
            }else if (route.name === 'Perfil') {
              iconName = focused ? 'ios-person' : 'ios-person';
            }else if (route.name === 'favoritos') {
              iconName = focused ? 'ios-heart' : 'ios-heart';
            }else if (route.name === 'historial') {
              iconName = focused ? 'ios-albums' : 'ios-albums';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
          
        })}
      >
        <Tab.Screen name="Navegar" >{(props) => <Page1{...props} items={Lalista} photo={photoURL} uid={itemId} searchItem={setArrayHolder} getdata={getData} nave={navi}/>}</Tab.Screen>
        <Tab.Screen name="Perfil">{(props) => <Page2{...props} items={photoURL} photo={setPhoto} email={email}/>}</Tab.Screen>
        <Tab.Screen name="favoritos">{(props) => <Favoritos{...props} items={Lalista} photo={photoURL} uid={itemId} searchItem={setArrayHolder} getdata={getData} nave={navi}/>}</Tab.Screen>
        <Tab.Screen name="historial">{(props) => <Historial{...props} items={Lalista} photo={photoURL} uid={itemId} searchItem={setArrayHolder} getdata={getData} nave={navi}/>}</Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
   
  },
  button: {
    backgroundColor: "#556b2f",
    width: "90%",
    padding: 15,
    borderRadius: 10,
    alignItems: "flex-start",
    marginTop: 30,
    
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
