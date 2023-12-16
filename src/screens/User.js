import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useMyContextController } from '../context';
import { useNavigation } from '@react-navigation/native';

const User = () => {
  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;

  const navigation = useNavigation();

  const handleLogout = () => {
    // Dispatch the logout action
    dispatch({ type: 'USER_LOGOUT' });

    // Navigate back to the login screen (replace 'Login' with your actual login screen name)
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Thông tin người dùng</Text>
      </View>
      {userLogin && (
        <>
          <Text style={styles.userInfo}>Name: {userLogin.name}</Text>
          <Text style={styles.userInfo}>Email: {userLogin.email}</Text>
          <Text style={styles.userInfo}>Phone: {userLogin.phone}</Text>
          <Text style={styles.userInfo}>Address: {userLogin.address}</Text>
          {/* Add more user details as needed */}
        </>
      )}
      <Button title="Đăng xuất" color="#ff66b2" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    padding: 16,
    backgroundColor: 'white', // Pink background color
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ff66b2', // Màu hồng cho header
    padding: 13,
    marginBottom: 25,
    borderRadius: 8,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#ff66b2', // White text color
  },
  userInfo: {
    fontSize: 20,
    marginBottom: 10,
    color: '#ff66b2', // White text color
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white', // White text color
  },
});

export default User;
