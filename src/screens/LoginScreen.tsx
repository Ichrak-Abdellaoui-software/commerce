import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import 'firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  // Firebase initialization
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp();
    }
  }, []);
  useEffect(() => {
    GoogleSignin.configure({
      // Your Google Sign-In configuration options
    });
  }, []);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      console.log('Utilisateur connecté:', user);
      navigation.navigate('Home');
      alert('Succès');
    } catch (error) {
      console.error("Erreur d'authentification:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const {idToken, accessToken} = userInfo;
      const credential = firebase.auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );

      const userCredential = await firebase
        .auth()
        .signInWithCredential(credential);
      const user = userCredential.user;

      console.log('Utilisateur connecté via Google:', user);
      navigation.navigate('Home');
    } catch (error) {
      console.error("Erreur d'authentification Google:", error.message);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      if (result.isCancelled) {
        throw new Error("L'utilisateur a annulé la connexion.");
      }

      const data = await AccessToken.getCurrentAccessToken();
      if (!data.accessToken) {
        throw new Error("Aucun jeton d'accès Facebook obtenu.");
      }

      const credential = firebase.auth.FacebookAuthProvider.credential(
        data.accessToken,
      );
      const userCredential = await firebase
        .auth()
        .signInWithCredential(credential);
      const user = userCredential.user;

      console.log('Utilisateur connecté via Facebook:', user);
      navigation.navigate('Home');
    } catch (error) {
      console.error("Erreur d'authentification Facebook:", error.message);
    }
  };

  return (
    <ImageBackground
      source={require('../Images/login.jpg')}
      style={styles.container}>
      <View style={styles.overlay}>
        <Text style={styles.header}>Login</Text>
        <TextInput
          placeholder="Adresse e-mail"
          style={styles.input}
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <TextInput
          placeholder="Mot de passe"
          style={styles.input}
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
          value={password}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Se connecter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleLogin}>
          <Text style={styles.buttonText}>Se connecter avec Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.facebookButton}
          onPress={handleFacebookLogin}>
          <Text style={styles.buttonText}>Se connecter avec Facebook</Text>
        </TouchableOpacity>
        <Text style={styles.signupText}>
          Don't have an account?{' '}
          <Text
            style={styles.signupLink}
            onPress={() => navigation.navigate('SignUp')}>
            Sign up
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  loginButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
  googleButton: {
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  facebookButton: {
    backgroundColor: '#1877F2',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  signupText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'black',
  },
  signupLink: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
