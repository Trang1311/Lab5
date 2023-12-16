
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { useMyContextController } from '../context';

const Customer = () => {
  const [services, setServices] = useState([]);
  const navigation = useNavigation();
  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;

  useEffect(() => {
    // Truy vấn danh sách dịch vụ từ Firestore
    const unsubscribe = firestore()
      .collection('services')
      .onSnapshot((querySnapshot) => {
        const servicesList = [];
        querySnapshot.forEach((documentSnapshot) => {
          servicesList.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        });
        setServices(servicesList);
      });

    // Hủy đăng ký lắng nghe khi component bị hủy
    return () => unsubscribe();
  }, []);
  const navigateToUser = () => {
    navigation.navigate('User');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Xin chào: {userLogin.name} !</Text>
      <Text style={styles.title1}>Danh sách dịch vụ</Text>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.serviceItem}
            onPress={() => navigation.navigate('ServiceDetail', { userLogin,service: item })}
          >
            <Text style={styles.serviceName}>{item.name}</Text>
            <Text style={styles.serviceDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.userButton} onPress={navigateToUser}>
        <Icon name="user" size={20} color="#ff66b2" /> {/* Thêm biểu tượng user */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ff66b2', // Màu hồng chủ đạo
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white', // Màu chữ trắng
  },
  title1: {
    fontSize: 25,
    
    marginBottom: 16,
    color: 'white', // Màu chữ trắng
  },
  serviceItem: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#fff', // Màu nền trắng cho từng dịch vụ
    borderRadius: 8,
  },
  serviceName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ff66b2', // Màu chữ hồng
  },
  serviceDescription: {
    color: '#666', // Màu chữ xám
  },

  userButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    width: 50,
    height: 50,
    backgroundColor: 'lightgrey', // Màu hồng cho nút user
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userButtonText: {
    color: '#ff66b2',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Customer;
