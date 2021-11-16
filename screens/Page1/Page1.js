import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect ,setState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Keyframe, ToastAndroid, FlatList, TextInput, Alert, Image} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { getDatabase, ref, set ,onValue, push} from "firebase/database";
import { auth, db } from "../../firebase";


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
    status: true
   
  });
  console.log("dsad")
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
   <View>
     <Text style={{color: "#000", fontSize: 20}}>Agregar nueva tarea:</Text>
     <TextInput onChangeText={text => setText(text)}
        defaultValue={text} style={{width: "80%", height: "20%", backgroundColor: "#fff", marginTop: "5%"}}>
     </TextInput>
     <TouchableOpacity style={{position: "absolute", backgroundColor: "green", width: "20%", height: "11%", marginTop: "12%", right: 10, zIndex:90}} onPress={writeUserData}></TouchableOpacity>

 <FlatList
     
     data={props.items}
     
     renderItem={({item}) => 

      
     
         <View style={item.status ? {flex:1, flexDirection: 'row', backgroundColor: "#FFBF00", margin: 10, borderRadius: 4}: {flex:1, flexDirection: 'row', backgroundColor: "green", margin: 10, borderRadius: 4}}>
 
           <Text style={stylesh.textView2}>Tarea:</Text>
           <Text onPress={SetItem.bind(this, item)} style={stylesh.textView} >{item.task}</Text>
           <TouchableOpacity style={stylesh.completed} onPress={doneTask.bind(this, item.task)}></TouchableOpacity>
           <TouchableOpacity style={stylesh.borrar} onPress={deleteData.bind(this, item.task)}></TouchableOpacity>
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
});

