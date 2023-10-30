import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Link } from 'expo-router';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
     {/* Background Image */}
      <Image
        source={require('../images/capa.jpg')}
        style={styles.backgroundImage}
      />

      {/* Centralizado Burger Icon */}
      <TouchableOpacity style={styles.burgerIcon}>
      <FontAwesome5 name="hamburger" size={120} color="white" />
      </TouchableOpacity>

      {/* Nome da empresa */}
      <Text style={styles.burgerJointName}>Byte Burguer</Text>

      {/* Button para navegar para a próxima tela */}
      <TouchableOpacity
        style={styles.nextButton}
        
      >
        <Link href="/p1">
        <Text style={styles.buttonText}>Byte me</Text>
        </Link>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  burgerIcon: {
    position: 'absolute',
    color: 'white',
    top: '10%', 
  },
  burgerJointName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    top: '25%', // Adjust as needed
  },
  nextButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    position: 'absolute',
    bottom: '10%', 
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
