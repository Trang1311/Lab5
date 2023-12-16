import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const Admin = () => {
  const [services, setServices] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
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

    return () => unsubscribe();
  }, []);

  const navigateToAddNewService = () => {
    navigation.navigate('AddNewService');
  };
  const navigateToUser = () => {
    navigation.navigate('User');
  };
  const navigateToList = () => {
    navigation.navigate('List');
  };

  const isUnread = (serviceId) => {
    // Assume there is a field 'unreadMessages' in each service
    const service = services.find((s) => s.id === serviceId);
    return service && service.unreadMessages > 0;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách dịch vụ</Text>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.serviceItem}
            onPress={() => navigation.navigate('ServiceDetail', { service: item })}
          >
            <Text style={styles.serviceName}>
              {item.name}
              {isUnread(item.id) && <View style={styles.unreadDot} />}
            </Text>
            <Text style={styles.serviceDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={navigateToAddNewService}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.BookingButton} onPress={navigateToList}>
        <Icon name="list" size={20} color="#ff66b2" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.userButton} onPress={navigateToUser}>
        <Icon name="user" size={20} color="#ff66b2" />
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
  unreadDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
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
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 50,
    height: 50,
    backgroundColor: 'white', // Màu hồng cho nút thêm mới
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BookingButton: {
    position: 'absolute',
    bottom: -9, // Adjust the position as needed
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }], // Center the button
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ff66b2',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    width: 50,
    height: 50,
    backgroundColor: 'white', // Màu hồng cho nút user
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

export default Admin;
