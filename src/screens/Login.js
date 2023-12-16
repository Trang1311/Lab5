import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome"; // Import Icon from react-native-vector-icons
import { useMyContextController, login } from "../context";

export default Login = ({ navigation }) => {
  const [email, setEmail] = useState("trang@gmail.com");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);
  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;

  useEffect(() => {
    if (userLogin != null) {
      if (userLogin.role === "admin") {
        navigation.navigate("Admin");
      } else {
        navigation.navigate("Customer");
      }
    }
  }, [userLogin, navigation]);

  const onSubmit = () => {
    login(dispatch, email, password);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignContent: "center", backgroundColor: "#ff66b2" }}>
      <Text style={{ fontSize: 40, fontWeight: "bold", alignSelf: "center", color: "white", marginBottom: 30 }}>
        Login
      </Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ margin: 10 }}
        mode="outlined"
        theme={{ colors: { primary: "white", background: "white" } }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        style={{ margin: 10 }}
        right={
          <TextInput.Icon
            name={() => <Icon name={showPassword ? "eye" : "eye-slash"} size={20} color="red" />} // Use FontAwesome icon
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        mode="outlined"
        theme={{ colors: { primary: "white", background: "white" } }}
      />

      <Button
        mode="contained-tonal"
        onPress={onSubmit}
        style={{ margin: 10, padding: 8 }}
        labelStyle={{ fontSize: 20, color: "#ff66b2" }}
        theme={{ colors: { primary: "#ff66b2" } }}
      >
        Đăng Nhập
      </Button>
    </View>
  );
};
