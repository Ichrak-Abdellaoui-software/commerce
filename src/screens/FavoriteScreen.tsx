import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const FavoriteScreen = ({route}) => {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Chargement des favoris depuis le stockage
    loadFavoritesFromStorage();
  }, []);

  // Fonction pour charger les favoris depuis le stockage
  const loadFavoritesFromStorage = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites !== null) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites from storage:', error);
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={{padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc'}}
      onPress={() => navigation.navigate('Details', {productId: item.id})}>
      {item.image ? (
        <Image
          source={{uri: item.image}}
          style={{width: 50, height: 50, marginRight: 10}}
        />
      ) : (
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: '#ccc',
            justifyContent: 'center',
            alignItems: 'center',
          }}></View>
      )}
      <View>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.title}</Text>
        <Text style={{fontSize: 14, color: '#555'}}>{`Price: $${parseFloat(
          item.price,
        ).toFixed(2)}`}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 16}}>
        Favorites
      </Text>
      {favorites.length === 0 ? (
        <Text>No favorites yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={item => item.toString()}
        />
      )}
    </View>
  );
};

export default FavoriteScreen;
