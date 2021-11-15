import React, { useState} from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image} from "react-native";
import { SocialIcon } from "react-native-elements";
import { Input } from "react-native-elements";
import {
  signInWithEmailAndPassword,
  signInWithGoogleAsync,
  signInWithFacebook,
} from "../authentication/auth";
import { images, SIZES, COLORS, FONTS } from "../constants";
import { Divider } from "react-native-elements";


const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function signUser() {
    signInWithEmailAndPassword(email, password);
  }

  function renderHeader() {
    return (
      <View style={{ padding: SIZES.padding * 2 }}>
        {/* {/* <Text style={{ ...FONTS.h1 }}>NOKI NOKI</Text> */}
        <Text style={{ ...FONTS.h1 }}></Text>
        {/* JVO todo ajouter image  */}

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
    );
  }

  function renderLogin() {
    return (
      <View style={{ padding: SIZES.padding * 2 }}>
        {/* {/* <Text style={{ ...FONTS.h1 }}>NOKI NOKI</Text> */}
        {/* <Text style={{ ...FONTS.h1 }}></Text> */}
        {/* JVO todo ajouter image  */}
        <View
          style={{
            marginTop: 45,
            marginBottom: 30,
          }}
        >
          <Input
            placeholder="Adresse e-mail"
            value={email}
            onChangeText={(text) => setEmail(text)}
            color={COLORS.black}
          />
          <Input
            placeholder="Mot de passe"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
          <TouchableOpacity
            style={{
              width: SIZES.width * 0.9,
              padding: SIZES.padding,
              backgroundColor: COLORS.primary,
              alignItems: "center",
              borderRadius: SIZES.radius,
              marginTop: 60,
            }}
            onPress={signUser}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>
              Se connecter
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: SIZES.width * 0.9,
              padding: SIZES.padding,
              alignItems: "center",
              //marginTop: 170
            }}
            onPress={() => navigation.navigate("Register")}
          >
            <Text
              style={{
                color: COLORS.link,
                fontSize: SIZES.font - 15,
                //...FONTS.h2,
                textDecorationLine: "underline",
              }}
            >
              Vous avez oublié votre mon de passe ?
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Divider
            style={{ width: "20%", margin: 20 }}
            color={COLORS.black}
            insetType="left"
            width={1}
            orientation="horizontal"
          />
          <Text
            style={{
              fontFamily: FONTS.h1.fontFamily,
              fontSize: FONTS.body3.fontSize,
              width: "20%",
              marginLeft: 50,
              marginVertical: 10,
            }}
          >
            {" "}
            OU{" "}
          </Text>
          <Divider
            style={{ width: "20%", margin: 20 }}
            color={COLORS.black}
            insetType="middle"
            width={1}
            orientation="horizontal"
          />
        </View>
        <View
          style={{
            marginTop: 30,
            marginBottom: 50,
            flexDirection: "row",
            marginLeft: 40,
          }}
        >
          <SocialIcon
            button
            onPress={signInWithFacebook}
            type="facebook"
            style={{ width: "40%" }}
          />
          <SocialIcon
            button
            onPress={signInWithGoogleAsync}
            type="google"
            style={{ width: "40%" }}
          />
        </View>
        <TouchableOpacity
          style={{
            width: SIZES.width * 0.9,
            padding: SIZES.padding,
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("Register")}
        >
          <Text
            style={{
              color: COLORS.black,
              fontSize: SIZES.font - 15,
            }}
          >
            Vous n'avez pas de compte ?
          </Text>
          <Text
            style={{
              color: COLORS.link,
              fontSize: SIZES.font - 15,
              textDecorationLine: "underline",
            }}
          >
            Inscrivez-vous !
          </Text>
        </TouchableOpacity>
      </View>
      
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderLogin()}
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

export default Login;
