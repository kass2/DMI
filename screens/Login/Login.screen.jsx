import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { db, auth, updateProfile} from "../../firebase";
import { getDatabase, ref, set ,onValue, push} from "firebase/database";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// auth is an instance of firebase.auth() and it is imported from the firebase.js file
import logo from "../../media/images/fod.png";
import i18n from "../../localization/i18n"
const LoginPage = () => {
  // Our app will contain 2 states, the email and password with an empty string as initial value
  const [email, setEmail] = useState("");
  const [credentials, setUID] = useState("");
  const [pwd, setPwd] = useState("");
  const [state, setStat] = useState(null)
  // navigation is an instance of our current NavigationContainer and we access to it trough the useNavigation() custom hook
  const navigation = useNavigation();

  useEffect(() => {
    if(state){
      /* console.log("Login",state.user) */
      navigation.navigate('Home',{itemId: state.user.uid, photoURL: state.user.photoURL, email: state.user.email, navi: navigation, phone: state.user.phoneNumber});
    }
  }, [state]); 

  
  

  useEffect(()=>{
    if(credentials){
      writeUserData();
    }
  },[credentials])
  
  const handleSignup = () => {
    auth
      .createUserWithEmailAndPassword(email, pwd)
      .then((userCredentials) => {
        // then is a fullfilled promise
     //   console.log(userCredentials.user.uid);
      //  setUID(userCredentials.user.uid);
        const user = userCredentials.user;
        Alert.alert(i18n.t("Alert-cuenta-creada"))
      })
      .catch((error) => {
        // catch is a rejected promise
        alert(error.message);
      });
  };
  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, pwd)
      .then((userCredentials) => {
        // then is a fullfilled promise
        const user = userCredentials.user;
        /* console.log(userCredentials) */
        setStat(userCredentials);
      })
      .catch((error) => {
        // catch is a rejected promise
        alert(error.message);
      });
  };

  function writeUserData() {
    var user = auth.currentUser;
    user.updateProfile({  
      //displayName: "Jane Q. User",  
      photoURL: "../../assets/img/me.jpg"}).then(function()
       { 
         /* console.log("Update") */
      }
    )}

  return (
    // KeyboardAvoidingView is a type of view that will push the content up when a keyboard shows
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      
       <Image source={logo}  style={styles.logo} />
      <View style={styles.inputContainer}>
        {/* We have 2 text inputs that will set the state our our constants (email, pdw) */}
        <TextInput
          placeholder={i18n.t("placeholder-Email")}
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder={i18n.t("placeholder-Password")}
          value={pwd}
          onChangeText={(text) => setPwd(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      {/* We have 2 buttons that will execute the functions above) */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}> {i18n.t("option")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignup}
          style={[styles.button, styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}>{i18n.t("register")}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  
  },
  inputContainer: {
    width: "80%",

  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  button: {
    backgroundColor: "#157B33",
    width: "130%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    margin:15
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#556b2f",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#556b2f",
    fontWeight: "700",
    fontSize: 16,
  },
  logo: {
    marginBottom:20,
    resizeMode: "contain",
              height: 180,
              width: 280
  },
});
