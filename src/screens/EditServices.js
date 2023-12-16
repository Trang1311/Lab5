import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper'; // Import Button from react-native-paper
import firestore from '@react-native-firebase/firestore';

const EditServices = ({ route, navigation }) => {
  const { service } = route.params;

  // State variables to hold edited service data
  const [editedName, setEditedName] = useState(service.name);
  const [editedDescription, setEditedDescription] = useState(service.description);

  // Function to handle service update
  const handleUpdate = async () => {
    try {
      const serviceRef = firestore().collection('services').doc(service.id);

      // Update service data in Firestore
      await serviceRef.update({
        name: editedName,
        description: editedDescription,
        // Add other fields as needed
      });

      console.log('Service updated successfully in Firestore');

      // Show success message
      Alert.alert('Success', 'Service updated successfully', [
        {
          text: 'OK',
          onPress: () => {
            // After updating, navigate back to the ServiceDetail screen
            navigation.navigate('ServiceDetail', { service: { ...service, name: editedName, description: editedDescription } });
          },
        },
      ]);
    } catch (error) {
      console.error('Error updating service in Firestore:', error);

      // Show error message
      Alert.alert('Error', 'Error updating service. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sửa Dịch Vụ</Text>
      <TextInput
        style={styles.input}
        placeholder="Service Name"
        value={editedName}
        onChangeText={(text) => setEditedName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Service Description"
        value={editedDescription}
        onChangeText={(text) => setEditedDescription(text)}
        multiline
      />
      {/* Add other input fields as needed */}
      <Button
        mode="contained"
        buttonColor="#ff66b2"
        onPress={handleUpdate}
        labelStyle={styles.buttonLabel} // Add labelStyle for font customization
      >
        Cập Nhật
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white', // White background color
  },
  header: {
    fontSize: 28,
    backgroundColor: '#ff66b2', // Pink header background color
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    color: 'white',
  },
  input: {
    height: 50,
    borderColor: '#ff66b2', // Pink border color
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: '#ff66b2', // Pink text color
    fontSize: 18,
  },
  buttonLabel: {
    fontSize: 18, // Adjust the font size as needed
  },
});

export default EditServices;
