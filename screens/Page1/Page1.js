import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect ,setState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Keyframe, ToastAndroid, FlatList, TextInput, Alert, Image} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { getDatabase, ref, set ,onValue, push} from "firebase/database";
import { auth, db } from "../../firebase";
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function Page2(props) {
  const [value, onChangeTexto] = React.useState('Escribe aqui...');
  const [state, setStat] = React.useState(true)
  const [pic, setPic] = React.useState(null)
  const [text, setText] = useState('');
  const renderItem = ({ item }) => (
    <Item title={item.name} />
  );
  
  console.log("Pagina2 ",props)
const FlatListItemSeparator = () => {
return (
  <View
    style={{
      height: .5,
      width: "100%",
      backgroundColor: "#000",
    }}
  />
);
}

function writeUserData() {
  
  set(ref(db, props.uid +  '/' + text), {
    
    task: text,
    status: true,
  });
  console.log("dsad");
  
}

function deleteData(tarea) {
  let knownLocationRef = db.ref( props.uid +'/' + tarea);
  knownLocationRef.remove();
}

function doneTask(tarea) {
  let knownLocationRef = db.ref(props.uid +'/' + tarea);
  knownLocationRef.update({ status: false});
}


const  SetItem = (item) => {
setPic(item)
setStat(false)


}




  return (
   <View style={{flex:1, height:"100%"}}>
     <Text style={{color: "#000", fontSize: 20}}>     Agregar nueva tarea:</Text>
     <TextInput onChangeText={text => setText(text)}
        defaultValue={text} style={{width: "70%", height: 30,borderRadius:20,marginLeft:15,backgroundColor: "#fff", marginTop: "5%"}}>
     </TextInput>

     <TouchableOpacity style={stylesh.buttonAdd} onPress={writeUserData}> <Ionicons name="md-save-outline" size={20} style={stylesh.buttonText3}></Ionicons>
     </TouchableOpacity> 

     <FlatList    
     data={props.items}
     
     renderItem={({item}) => 

      
     
         <View style={item.status ?  {flex:1, flexDirection: 'row', backgroundColor: "#FFBF00", margin: 20, borderRadius: 4}: {flex:1, flexDirection: 'row', backgroundColor: "#1D8A59", margin: 10, borderRadius: 4}}>
 
           <Text style={stylesh.textView2}>Tarea:</Text>
           <Text onPress={SetItem.bind(this, item)} style={stylesh.textView} >{item.task}</Text>
           <TouchableOpacity style={stylesh.completed} onPress={doneTask.bind(this, item.task)}>
             <Ionicons name="md-medal-outline" size={20} style={stylesh.buttonText2}></Ionicons>
             </TouchableOpacity>
           <TouchableOpacity style={stylesh.borrar} onPress={deleteData.bind(this, item.task)}>
             <Ionicons name="trash-outline" size={20} style={stylesh.buttonText2}></Ionicons>
             </TouchableOpacity>
         </View>
     
       }

     keyExtractor={(item, index) => index.toString()}
     
     />
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
  buttonAdd: {
    borderRadius: 50,
    backgroundColor: "#1D8A59",

    position: "absolute", width: "20%", marginTop: 48, right: 10, zIndex:90
  },
  buttonText3: {
    position: "relative",
    fontSize: 20,
    color: "white",
    textAlign:"center"
  },
  buttonText2: {
    position: "relative",
    fontSize: 20,
    color: "white",
    paddingTop:12
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
      marginTop:20,
     
  }, 
  imageView: {
   
      width: '50%',
      height: 100 ,
      margin: 7,
      borderRadius : 7
   
  },
   
  textView: {
   
      width:'28%', 
      textAlignVertical:'center',
      padding:10,
      color: '#000',
      fontSize: 22,
  },
  textView2: {
   
    width:'25%', 
    textAlignVertical:'center',
    padding:10,
    color: '#000',
    fontSize: 22
  },
borrar:{
  width:"auto",
  position: "absolute",
  right: "15%",
},
completed:{
  width:"auto",
  position: "absolute",
  right: "2%",
},
  imageViewFin: {
   
    width: '97%',
    height: '80%' ,
    margin: 7,
    borderRadius : 7
 
},
});

