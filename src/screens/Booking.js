import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet, TextInput } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icon
import { useMyContextController } from '../context';
import { Alert } from 'react-native';


const Booking = ({ route }) => {
  const { service } = route.params;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;

  const handleBooking = async () => {
    // Lưu thông tin đặt lịch vào Firestore
    const bookingData = {
      serviceName: service.name,
      userName: userLogin.name,
      userEmail: userLogin.email,
      selectedDate: selectedDate.toDateString(),
      status: 'Pending',
    };
  
    // Add selectedTime only if it's defined
    if (selectedTime !== undefined) {
      bookingData.selectedTime = selectedTime;
    } else {
      // If selectedTime is undefined, you can set a default value or handle it as needed
      bookingData.selectedTime = 'Default Time';
    }
    try {
      await firestore().collection('bookings').add(bookingData);
      console.log('Booking details saved to Firestore:', bookingData);
  
      // Display success message
      Alert.alert('Booking Successful', 'Your booking has been successfully submitted.');
    } catch (error) {
      console.error('Error saving booking details:', error);
      // Display error message
      Alert.alert('Error', 'An error occurred while saving booking details. Please try again.');
    }
  };
  
  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const hideDatePickerModal = () => {
    setShowDatePicker(false);
  };

  const handleDateChange = (event, date) => {
    hideDatePickerModal();
    setSelectedDate(date || selectedDate);
  };

  const showTimePickerModal = () => {
    setShowTimePicker(true);
  };

  const hideTimePickerModal = () => {
    setShowTimePicker(false);
  };

  const handleTimeChange = (event, date) => {
    hideTimePickerModal();
  
    if (date) {
      const selectedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
      setSelectedTime(selectedTime);
    }
  };
  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white', // Dominant pink color
    },
    text: {
      color: '#ff66b2', // White text
      fontSize: 25,
      marginBottom: 8,
    },
    input: {
      backgroundColor: '#ffffff', // White background for TextInput
      marginBottom: 8,
      padding: 8,
      fontSize: 20,
      color: '#ff66b2', // Dominant pink color for text
    },
    button: {
      flexDirection: 'row', // Align items in a row
      alignItems: 'center', // Align items vertically centered
      backgroundColor: '#ff66b2', // Dominant pink color for background
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 180,
    },
    buttonText: {
      color: '#ffffff', // White text
      marginLeft: 8,
      fontSize:25,
    },
    icon: {
      color: '#ffffff',
      fontSize:20, // White color for icon
      
      justifyContent:"center",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Xác nhận thông tin:</Text>
      <Text style={styles.text}>Tên dịch vụ: {service.name}</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={userLogin.name}
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={userLogin.email}
        editable={false}
      />

      <Text style={styles.text}>Select a date for booking:</Text>
      <TouchableWithoutFeedback onPress={showDatePickerModal}>
        <View style={styles.button}>
          <Icon name="calendar" size={16} style={styles.icon} />
          <Text style={styles.buttonText}>{' '}</Text>
        </View>
      </TouchableWithoutFeedback>
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Text style={styles.text}>{`Selected Date: ${selectedDate.toDateString()}`}</Text>

      <Text style={styles.text}>Select a time for booking:</Text>
      <TouchableWithoutFeedback onPress={showTimePickerModal}>
        <View style={styles.button}>
          <Icon name="clock-o" size={16} style={styles.icon} />
          <Text style={styles.buttonText}>{' '}</Text>
        </View>
      </TouchableWithoutFeedback>
      {showTimePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={handleTimeChange}
        />
      )}
      <Text style={styles.text}>{`Selected Time: ${selectedTime}`}</Text>
      <Text style={styles.text}>Đơn giá: {service.description}</Text>
      <TouchableWithoutFeedback onPress={handleBooking}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Book Now</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Booking;
