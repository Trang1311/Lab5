import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const DeleteServices = ({ route, navigation }) => {
  const { service } = route.params;

  const handleDelete = async () => {
    try {
      const serviceRef = firestore().collection('services').doc(service.id);
      await serviceRef.delete();

      console.log('Service deleted successfully from Firestore');

      // Show success message
      Alert.alert('Success', 'Service deleted successfully', [
        {
          text: 'OK',
          onPress: () => {
            // After deleting, navigate back to the Admin screen
            navigation.navigate('Admin');
          },
        },
      ]);
    } catch (error) {
      console.error('Error deleting service from Firestore:', error);

      // Show error message
      Alert.alert('Error', 'Error deleting service. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} >Xóa Dịch Vụ</Text>
      <Text style={styles.title1}>Bạn có chắc là bạn muốn xóa dịch vụ này?!</Text>
      <View style={styles.buttonContainer}>
        <Button title="Cancel" onPress={() => navigation.goBack()} 
        color="#ff66b2"/>
        <View style={styles.buttonSpacer} />
        <Button title="     OK     " onPress={handleDelete} 
        color="#ff66b2"/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderWidth: 8, 
    borderRadius: 10, // Add border radius for rounded corners
    borderColor: '#ff66b2', // Border color
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#ff66b2',
    
  },
  title1: {
    fontSize: 18,
    
    marginBottom: 10,
    color: '#ff66b2',
    
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 16,
    overflow: 'hidden',
  },
  buttonSpacer: {
    width: 20, // Adjust the width as needed
  },
});

export default DeleteServices;
