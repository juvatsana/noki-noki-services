import React, { useState, useMemo, useEffect } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";

import { auth } from "./authentication/firebase";

import { Restaurant, OrderDelivery, Login, Register } from "./screens";
import Tabs from "./navigation/tabs";

//Context
import mainContext from "./context/context";

const Stack = createStackNavigator();
const App = () => {
  const [loaded] = useFonts({
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  const [userLogged, setUserLogged] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLogged(true);
        setUserProfile(user);
      } else {
        setIsLogged(false);
        setUserProfile(null);
      }
    });
    return unsubscribe;
  }, []);
  const mainC = useMemo(
    () => ({
      userProfile: userProfile,
      userLogged: userLogged,
      inHome: () => console.log("InHome"),
      signOutUser: () => auth.signOut(),
      handleLogin: (email, password) => {
        setIsLoading(true);
        auth
          .signInWithEmailAndPassword(email, password)
          .catch((error) => console.log(error));
        setIsLoading(false);
      },
    }),
    []
  );
  if (!loaded) {
    return null;
  }

  if (isLoading) {
    console.log("isLoading");
  }

  return (
    <mainContext.Provider value={mainC}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={"Home"}
        >
          {isLogged === false ? (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </>
          ) : (
            <>
              <Stack.Screen name="Home" component={Tabs} />
              <Stack.Screen name="Restaurant" component={Restaurant} />
              <Stack.Screen name="OrderDelivery" component={OrderDelivery} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </mainContext.Provider>
  );
};

export default App;
