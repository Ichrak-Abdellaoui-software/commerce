import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchText.trim() === '') {
      setSearchResults([]); // Réinitialiser les résultats si le texte de recherche est vide
      return;
    }

    // Exécutez votre requête API avec le texte de recherche
    setLoading(true);
    fetch(`https://fakestoreapi.com/products?title=${searchText}`)
      .then(response => response.json())
      .then(data => {
        setSearchResults(data);
      })
      .catch(error => console.error('Erreur de recherche :', error))
      .finally(() => setLoading(false));
  }, [searchText]);

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.resultItem}>
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Rechercher un produit..."
        onChangeText={text => setSearchText(text)}
        value={searchText}
      />
      {loading ? (
        <Text>Recherche en cours...</Text>
      ) : (
        <FlatList
          data={searchResults}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  resultItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

export default SearchScreen;
