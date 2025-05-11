import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const ProfileScreen = () => {
  const [user, setUser] = useState({
    isLoggedIn: false,
    firstName: 'Ichrak',
    lastName: 'Abdellaoui',
    photo:
      'https://scontent.ftun4-2.fna.fbcdn.net/v/t39.30808-6/347399729_980237099891148_734306555910569410_n.jpg?stp=dst-jpg_p843x403&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=uHlf_NLJ8eMAX9OhQIe&_nc_ht=scontent.ftun4-2.fna&oh=00_AfBSweTPu_dxFsGarZA-ckRxnPUBRFEvTe87rHqFbf2u1A&oe=6555DBA1', // Replace with the URL of the user's photo
  });
  const navigation = useNavigation();
  const handleLogin = () => {
    setUser({...user, isLoggedIn: true});
    navigation.navigate('Login');
  };

  const handleLogout = () => {
    setUser({...user, isLoggedIn: false});
  };
  return (
    <View style={styles.container}>
      {user.isLoggedIn ? (
        <>
          <Image source={{uri: user.photo}} style={styles.userPhoto} />
          <Text
            style={
              styles.userName
            }>{`${user.firstName} ${user.lastName}`}</Text>
        </>
      ) : (
        <Text style={styles.welcomeText}>
          Welcome to our app! Please log in.
        </Text>
      )}

      {user.isLoggedIn && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log('My Account')}>
            <Text style={styles.buttonText}>My Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log('Settings')}>
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {!user.isLoggedIn && (
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    marginHorizontal: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 5,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
