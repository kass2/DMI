import { useNavigation } from "@react-navigation/core";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState, useEffect ,setState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Keyframe, ToastAndroid, FlatList, TextInput, Alert, Image} from 'react-native';
// auth is an instance of firebase.auth() and it is imported from the firebase.js file
import { auth, db } from "../../firebase";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { getDatabase, ref, set ,onValue, push, remove} from "firebase/database";
import logo from "../../media/images/fod.png";
import Page1 from '../Page1/Page1'
import Page2 from '../Page2/Page2'


const Tab = createBottomTabNavigator();

const HomePage = ({ route }) => {
  // navigation is an instance of our current NavigationContainer and we access to it trough the useNavigation() custom hook
  const navigation = useNavigation();
  const [Lalista, setArrayHolder] = React.useState([]);
  const { itemId, otherParam } = route.params;

  // We will make a simple call to auth.signOut() which is also a promise based function and if it fullfills
  // we redirect the user to Login
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  console.log("UID",itemId)

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
  }, []);
  
  function getData(){
    const db = getDatabase();
    const starCountRef = ref(db, itemId + "/");
    onValue(starCountRef, (snapshot) => {
      let arr = []
      const data = snapshot.val();
      snapshot.forEach(function(item) {
        var itemVal = item.val();
        console.log("dsadsadad",item)
        arr.push(itemVal);
    });

    
      setArrayHolder(arr)
      //console.log(data)
     // console.log([{id:2},{id: 3}])
      //setArrayHolder(data)
      //updateStarCount(postElement, data);
    });
  }
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Camara') {
              iconName = focused
                ? 'camera-outline'
                : 'camera-outline';
            } else if (route.name === 'Lista') {
              iconName = focused ? 'ios-list' : 'ios-list';
            }else if (route.name === 'Perfil') {
              iconName = focused ? 'information-circle' : 'information-circle';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Lista" options={{ tabBarBadge: Lalista.length }}>{(props) => <Page1{...props} items={Lalista} uid={itemId}/>}</Tab.Screen>
        <Tab.Screen name="Perfil" component={Page2} />
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
