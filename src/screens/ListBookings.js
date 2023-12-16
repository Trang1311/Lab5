// ListBookings.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const ListBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const snapshot = await firestore().collection('bookings').get();
        const bookingsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setBookings(bookingsData);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.serviceName}>{`Service Name: ${item.serviceName}`}</Text>
      <Text style={styles.userName}>{`User Name: ${item.userName}`}</Text>
      <Text style={styles.selectedDate}>{`Selected Date: ${item.selectedDate}`}</Text>
      <Text style={styles.selectedTime}>{`Selected Time: ${item.selectedTime}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>List of Bookings</Text>
      <FlatList
        data={bookings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ff66b2', // Màu hồng
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#ffffff', // Màu trắng
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#fff', // Màu trắng
    paddingVertical: 8,
    marginBottom: 8,
  },
  serviceName: {
    color: '#ffffff', // Màu trắng
    fontSize: 16,
  },
  userName: {
    color: '#ffffff', // Màu trắng
    fontSize: 16,
  },
  selectedDate: {
    color: '#ffffff', // Màu trắng
    fontSize: 16,
  },
  selectedTime: {
    color: '#ffffff', // Màu trắng
    fontSize: 16,
  },
});

export default ListBookings;
