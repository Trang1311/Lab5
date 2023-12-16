import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import { useNavigation } from '@react-navigation/native';
import { useMyContextController } from '../context';

const ServiceDetail = ({ route}) => {
  // Lấy thông tin về dịch vụ từ route.params
  const {service } = route.params;
  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;
  const navigation = useNavigation();
  const renderAdminMenu = () => (
    <Menu style={styles.menu}>
      <MenuTrigger text="&#8942;" customStyles={triggerStyles} />
      <MenuOptions>
        <MenuOption onSelect={() => navigation.navigate('EditServices', { service })} text="Sửa dịch vụ" customStyles={menuOptionStyles}/>
        <MenuOption onSelect={() => navigation.navigate('DeleteServices', { service })} text="Xóa dịch vụ" customStyles={menuOptionStyles}/>
        <MenuOption onSelect={() => navigation.navigate('Chat', { service })} text="Tư vấn Khách hàng" customStyles={menuOptionStyles}/>
      </MenuOptions>
    </Menu>
  );

  const renderCustomerMenu = () => (
    <Menu style={styles.menu}>
      <MenuTrigger text="&#8942;" customStyles={triggerStyles} />
      <MenuOptions>
        <MenuOption onSelect={() => navigation.navigate('Chat', { service })} text="Tư vấn" customStyles={menuOptionStyles}/>
        <MenuOption onSelect={() => navigation.navigate('Booking', { service })} text="Đặt lịch" customStyles={menuOptionStyles}/>
      </MenuOptions>
    </Menu>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Service Detail</Text>
        {userLogin.role === 'admin' ? renderAdminMenu() : renderCustomerMenu()}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Tên dịch vụ:</Text>
        <Text style={styles.value}>{service.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Giá:</Text>
        <Text style={styles.value}>{service.description}</Text>
      </View>
      {/* Thêm thông tin khác về dịch vụ nếu cần */}
    </View>
  );
};

const triggerStyles = {
  triggerText: {
    fontSize: 30,
    color: 'white', // Điều chỉnh màu sắc cần thiết
  },
};

const menuOptionStyles = {
  optionText: {
    fontSize: 18, // Adjust the font size as needed
    padding:8,
    backgroundColor:"#ff66b2",
    color: 'white', // Adjust the text color as needed
  },
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white', // Màu hồng chủ đạo
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ff66b2', // Màu hồng cho header
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white', // Màu chữ trắng
  },
  menu: {
    marginRight: -10, // Điều chỉnh nếu cần thiết
  },
  infoContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff66b2',
  },
  value: {
    fontSize: 18,
    color: '#ff66b2',
  },
});

export default ServiceDetail;
