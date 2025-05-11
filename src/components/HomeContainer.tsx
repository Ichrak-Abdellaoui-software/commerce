// Importer les bibliothèques nécessaires
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
  TextInput,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import COLORS from '../consts/colors';
import axios from 'axios';
import {BASE_URL} from '../../consts';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProducts} from '../redux';

const AVATAR_URL =
  'https://scontent.ftun4-2.fna.fbcdn.net/v/t39.30808-6/293969543_766174241297436_4796182854663502570_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=PHl4YCwLwtwAX__Wbs1&_nc_oc=AQnvIBGjo9SQluODw7ELjpEgq8KgIsljyZDUHwNW8-Qn8ylGGsKmWhxeJ_qGOZ2t1n4&_nc_ht=scontent.ftun4-2.fna&oh=00_AfBsWHFg-iLmaUwz5xdCSMmrYFmT4U2owpWDV57h9IRiSQ&oe=6556C777';

const HomeContainer = ({}) => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const [loading, setLoading] = useState(false);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [favorites, setFavorites] = useState([]);
  const dispatch = useDispatch();

  const {products} = useSelector(state => state.product);

  const categories = [
    'All',
    'electronics',
    'jewelry',
    "men's clothing",
    "women's clothing",
  ];

  useEffect(() => {
    dispatch(fetchProducts());
    loadFavoritesFromStorage();
  }, []);

  const toggleFavorite = async product => {
    const productId = product.id;

    const updatedFavorites = [...favorites];
    const isFavorite = updatedFavorites.some(item => item.id === productId);

    if (isFavorite) {
      const index = updatedFavorites.findIndex(item => item.id === productId);
      updatedFavorites.splice(index, 1);
    } else {
      updatedFavorites.push(product);
    }

    setFavorites(updatedFavorites);
    saveFavoritesToStorage(updatedFavorites);
  };

  const CategoryList = () => {
    return (
      <View style={styles.categoryContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setCategoryIndex(index)}>
            <Text
              style={[
                styles.categoryText,
                categoryIndex === index && {backgroundColor: colors.primary},
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Details', {productId: item.id})}
      style={{
        margin: 10,
        borderWidth: 3,
        borderColor: '#ccc',
        padding: 10,
      }}>
      {item.image ? (
        <Image source={{uri: item.image}} style={{width: 150, height: 150}} />
      ) : (
        <View
          style={{
            width: 150,
            height: 150,
            backgroundColor: '#ccc',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#555'}}>Image not available</Text>
        </View>
      )}
      <View>
        <View style={{flexDirection: 'row', gap: 8, padding: 4}}>
          <Text style={{flex: 1, fontSize: 16}}>{item.title}</Text>
        </View>
        <Text style={{fontSize: 14, color: '#555'}}>{`Price: $${parseFloat(
          item.price,
        ).toFixed(2)}`}</Text>
      </View>
      <TouchableOpacity
        onPress={() => toggleFavorite(item)}
        style={{
          backgroundColor: favorites.some(fav => fav.id === item.id)
            ? 'red'
            : 'transparent',
          borderRadius: 10,
          width: 32,
          height: 32,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icons
          name={
            favorites.some(fav => fav.id === item.id)
              ? 'favorite'
              : 'favorite-border'
          }
          size={20}
          color={
            favorites.some(fav => fav.id === item.id) ? 'white' : colors.text
          }
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

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

  const saveFavoritesToStorage = async favorites => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to storage:', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.rose}}>
      <ScrollView>
        <SafeAreaView style={{paddingVertical: 24, gap: 24}}>
          <View
            style={{
              paddingHorizontal: 24,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}>
            <Image
              source={{
                uri: AVATAR_URL,
              }}
              style={{width: 45, aspectRatio: 1, borderRadius: 42}}
              resizeMode="cover"
            />
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: 'bold',
                  marginBottom: 8,
                  color: COLORS.gold,
                  letterSpacing: 2,
                }}
                numberOfLines={1}>
                𝓦𝓮𝓵𝓬𝓸𝓶𝓮 𝓽𝓸 𝓹𝓻𝓮𝓛𝓸𝓿𝓮𝓭
              </Text>
              <Text
                style={{color: COLORS.dark, opacity: 0.75}}
                numberOfLines={1}>
                𝕯𝖎𝖘𝖈𝖔𝖛𝖊𝖗 𝖋𝖆𝖘𝖍𝖎𝖔𝖓 𝖙𝖍𝖆𝖙 𝖘𝖚𝖎𝖙𝖘 𝖞𝖔𝖚𝖗 𝖘𝖙𝖞𝖑𝖊
              </Text>
            </View>
            <TouchableOpacity
              style={{
                width: 52,
                aspectRatio: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 52,
                borderWidth: 1,
                borderColor: colors.border,
              }}>
              <Icons name="notifications" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row', paddingHorizontal: 24, gap: 12}}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              onChangeText={onChangeSearchText => {
                setSearchText(onChangeSearchText);
              }}
              value={searchText}
            />
          </View>

          <View style={{paddingHorizontal: 20}}>
            <CategoryList />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 80,
              }}></View>
          </View>
        </SafeAreaView>
      </ScrollView>
      {loading ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <ActivityIndicator size={50} color={'#000000'} />
        </View>
      ) : (
        <FlatList
          data={products.filter(product =>
            product.title.toLowerCase().includes(searchText.toLowerCase()),
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export {HomeContainer};

const styles = StyleSheet.create({
  categoryContainer: {
    gap: 5,
    flexDirection: 'row',
  },
  categoryText: {
    backgroundColor: 'rgba(0,0,0,0.07)',
    padding: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    fontWeight: 'bold',
  },
  searchInput: {
    flex: 1,
    height: 52,
    borderRadius: 52,
    borderWidth: 1,
    backgroundColor: COLORS.light,
    paddingLeft: 24,
    fontSize: 16,
  },
  image: {height: 200, width: 200},
  errorStyle: {color: 'red', fontSize: 18},
});
