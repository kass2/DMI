import { useNavigation } from "@react-navigation/core";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React,{useState} from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image,TextInput} from "react-native";
// auth is an instance of firebase.auth() and it is imported from the firebase.js file
import { auth } from "../../firebase";
import logo from "../../media/images/fod.png";
const AgregarProducto = () => {
  const navigation = useNavigation();
   const [busqueda, setBusqueda] = useState("");
    return(
        <View style={{}}>
            <View style={{paddingTop:35, flexDirection:"row"}}>
                  <View style={{flexDirection:"column" , flex:0.5,   alignItems: "center",    justifyContent: "center", backgroundColor:'#A4CC00'}}>
         
                  <MaterialCommunityIcons onPress={()=> navigation.goBack()} name="keyboard-backspace" color={'white'} size={28} />
                </View>
        <View style={{flexDirection:"column" , flex:1.4,   alignItems: "center",    justifyContent: "center", backgroundColor:'#A4CC00'}}>
         
            <Text style={{fontSize:40, color:'white'}}>
            {I18n.t('status')}</Text>
        </View>
        <View style={{flexDirection:"column", flex:1}}>
           <Image source={logo} style={{  height: 60,
            width: 150,resizeMode: 'contain'}}></Image>
        </View>
   
       
      </View>

      <View style={{ paddingHorizontal:10, justifyContent: "center",}}>

          <TextInput placeholder="Buscar producto " value={busqueda}
          onChangeText={(text) => setBusqueda(text)}
          style={ { backgroundColor: 'white', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 10,
          marginTop: 20,}}/>

      </View>

      <View style={{ paddingHorizontal:10, paddingVertical:150, justifyContent: "center",}}>
          <Text>Imagen</Text>
      </View>

      
        <View style={{ paddingHorizontal:10, justifyContent: "center",flexDirection:"row"}}>
            <View style={{flexDirection:"column" , flex:2,  justifyContent: "center", }}>
                <View style={{flexDirection:"row"}}>
                    <Text style={{fontSize:40, color:'#556b2f'}}>Cantidad:</Text>
                    <TextInput placeholder="0"  value={busqueda} keyboardType={"numeric"}
                    onChangeText={(text) => setBusqueda(text)} style={ { fontSize:30, paddingHorizontal:10 }}/>
                      <Text style={{fontSize:40, color:'#556b2f'}}>Kg.</Text>
         </View>
          
        </View>
        <View style={{flexDirection:"column", flex:1}}></View>
   
       

      </View>
         <View style={{ paddingHorizontal:10, justifyContent: "center",flexDirection:"row"}}>
            <View style={{flexDirection:"column" , flex:2,  justifyContent: "center", }}>
                <View style={{flexDirection:"row"}}>
                    <Text style={{fontSize:40, color:'#556b2f'}}>Precio:</Text>
                    <Text style={{fontSize:40, color:'#556b2f'}}>$</Text>
                    <TextInput placeholder="0"  value={busqueda} keyboardType={"numeric"}
                    onChangeText={(text) => setBusqueda(text)} style={ { fontSize:30, paddingHorizontal:10 }}/>
                      
         </View>
          
        </View>
        <View style={{flexDirection:"column", flex:1}}></View>
   
       

      </View>
         <View style={{ paddingHorizontal:10, justifyContent: "center",flexDirection:"row"}}>
            <View style={{flexDirection:"column" , flex:2,  justifyContent: "center", }}>
                <View style={{flexDirection:"row"}}>
                    <Text style={{fontSize:40, color:'#556b2f'}}>Oferta:</Text>
                    <Text style={{fontSize:40, color:'#556b2f'}}>%.</Text>
                    <TextInput placeholder="0"  value={busqueda} keyboardType={"numeric"}
                    onChangeText={(text) => setBusqueda(text)} style={ { fontSize:30, paddingHorizontal:10 }}/>
                      
         </View>
          
        </View>
        <View style={{flexDirection:"column", flex:1}}></View>
   
       

      </View>

      <View style={{ paddingHorizontal:70, justifyContent: "center",}}>
             <TouchableOpacity  style={{   backgroundColor: "#556b2f",
    width: "130%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    margin:15}}>
          <Text style={{   color: "white",
    fontWeight: "700",
    fontSize: 16,}}>Listo</Text>
        </TouchableOpacity>
      </View>
      
  
        </View>
    );

};
export default AgregarProducto;