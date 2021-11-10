import { useNavigation } from "@react-navigation/core";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image} from "react-native";
// auth is an instance of firebase.auth() and it is imported from the firebase.js file
import { auth } from "../../firebase";
import logo from "../../media/images/fod.png";
const HomePage = () => {
  // navigation is an instance of our current NavigationContainer and we access to it trough the useNavigation() custom hook
  const navigation = useNavigation();

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
  return (
    <View style={styles.container}>

      <View style={{paddingTop:35, flexDirection:"row"}}>
        <View style={{flexDirection:"column" , flex:2,   alignItems: "center",    justifyContent: "center", backgroundColor:'#A4CC00'}}>
 <Text style={{fontSize:40, color:'white'}}>Bienvenido</Text>
        </View>
        <View style={{flexDirection:"column", flex:1}}>
           <Image source={logo} style={{  height: 60,
            width: 150,resizeMode: 'contain'}}></Image>
        </View>
   
       
      </View>
          <View style={{flexDirection:"row"}}>
               <View style={{flexDirection:"column" , flex:2,   alignItems: "center",    justifyContent: "center", }}>
     <Text style={{fontSize:20,}}>Email:{auth.currentUser?.email}</Text>
        </View>
        <View style={{flexDirection:"column", flex:1}}>
      
        </View>
          </View>


   <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('AgregarProducto')}>
        <Text style={styles.buttonText}><MaterialCommunityIcons  name="plus-circle" color={'white'} size={18} />Agregar producto</Text>
      </TouchableOpacity>
       <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}><MaterialCommunityIcons  name="cash-usd" color={'white'} size={20} />Producto en venta</Text>
      </TouchableOpacity>
       <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}><MaterialCommunityIcons  name="chart-histogram" color={'white'} size={20} />Mis ventas</Text>
      </TouchableOpacity>
       <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}><MaterialCommunityIcons  name="logout" color={'white'} size={20} />Cerrar Sesion</Text>
      </TouchableOpacity>

   
    </View>
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
