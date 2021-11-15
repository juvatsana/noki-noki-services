import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { SocialIcon } from "react-native-elements";
import { Input } from "react-native-elements";
import {
  register
} from "../authentication/auth";
import { icons, images, SIZES, COLORS } from "../constants";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  /**
   * Function to Register the Ueer
   *
   */
  function registerUser() {
      register(email,password);
  }


  /**
   * Render the header 
   *
   * @return {*} 
   */
  function renderHeader() {
    return (
      <View
        style={{
          backgroundColor: "#F8D521",
          flexDirection: "row",
          height: 100,
        }}
      >
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: "center",
            // backgroundColor: "blue",
          }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={icons.back}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>

        <View
          style={{
            paddingTop: 100,
            // paddingLeft: -500,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={images.header_1}
            resizeMode="cover"
            style={{
              //   backgroundColor: "red",
              width: "80%",
              height: 100,
              borderRadius: SIZES.radius,
              resizeMode: "contain",
            }}
          />
          <View
            style={{
              height: 80,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: SIZES.padding * 3,
              borderRadius: SIZES.radius,
              //   backgroundColor: COLORS.lightGray3,
            }}
          >
            <Image
              source={images.header_1}
              resizeMode="cover"
              style={{
                width: "100%",
                height: 100,
                borderRadius: SIZES.radius,
              }}
            />
          </View>
        </View>
      </View>
    );
  }

  function renderRegister() {
    return (
      <View style={{ padding: SIZES.padding * 2 }}>
        <View
          style={{
            padding: SIZES.padding * 2,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 60
          }}
        >
          <Input
            placeholder="Adresse e-mail"
            value={email}
            onChangeText={text => setEmail(text)}
            // leftIcon={<Icon name="user" size={24} color="black" />}
          />
          <Input
            placeholder="Mot de passe"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
            // leftIcon={<Icon name="lock" size={24} color="black" 
            //  />}
          />
        </View>
        <SocialIcon
          title="Register"
          button
          onPress={registerUser}
          type="sign-in"
          style={{
            width: SIZES.width * 0.9,
            padding: SIZES.padding,
            backgroundColor: COLORS.primary,
            alignItems: "center",
            borderRadius: SIZES.radius,
            marginTop:50
          }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderRegister()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8D521",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: COLORS.black,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

const Separator = () => <View style={styles.separator} />;

export default Register;
