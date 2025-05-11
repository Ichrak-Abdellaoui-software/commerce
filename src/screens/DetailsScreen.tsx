import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {BASE_URL} from '../consts';
import {useCart} from '../components/CartProvider';

function DetailsScreen({route}) {
  const {productId} = route.params;
  const [product, setProduct] = useState(null);
  const {addToCart} = useCart();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/products/${productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des détails du produit:',
          error,
        );
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      alert(`Le produit "${product.title}" a été ajouté au panier.`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Détails du produit</Text>
      {product ? (
        <View>
          <Image source={{uri: product.image}} style={styles.image} />
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Text style={styles.price}>Prix: ${product.price}</Text>
          <Text style={styles.category}>Catégorie: {product.category}</Text>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}>
            <Text style={styles.addToCartButtonText}>Ajouter au panier</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f7f7', // Couleur de fond
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black', // Couleur du texte d'en-tête
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 10, // Coins arrondis pour l'image
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black', // Couleur du titre
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: 'gray',
    fontWeight: 'bold', // Couleur de la description
  },
  price: {
    fontSize: 16,
    marginBottom: 10,
    color: 'green', // Couleur du prix
  },
  category: {
    fontSize: 16,
    marginBottom: 20,
    color: 'blue', // Couleur de la catégorie
  },
  addToCartButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: 'white', // Couleur du texte du bouton
    fontWeight: 'bold',
  },
});

export default DetailsScreen;
