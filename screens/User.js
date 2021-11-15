import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { SocialIcon } from 'react-native-elements'
import {signOut} from '../authentication/auth';
import { images, SIZES, COLORS, FONTS } from "../constants";

const User = ({ navigation }) => {

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

  function renderUser() {
    return (
      <View style={{ padding: SIZES.padding * 2 }}>
        <View 
            style={{
              padding: SIZES.padding * 2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
          </View>
          <SocialIcon
          title='Deconnexion'
          button
          onPress={signOut}
          type='sign-out'
          style={{
            width: SIZES.width * 0.9,
            padding: SIZES.padding,
            backgroundColor: COLORS.primary,
            alignItems: "center",
            borderRadius: SIZES.radius,
          }}
        />

      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderUser()}
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
  }
});

const Separator = () => (
    <View style={styles.separator} />
  );

export default User;
