import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import {useCart} from '../components/CartProvider';
import {useNavigation} from '@react-navigation/native';

// Composant pour le formulaire de paiement
const CheckoutForm = ({onSubmit}) => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = () => {
    // Valider ou traiter les données du formulaire
    // ...

    // Appeler la fonction onSubmit avec les données du formulaire
    onSubmit({
      address,
      city,
      state,
      postalCode,
      phone,
    });
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formHeader}>Checkout</Text>
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        value={state}
        onChangeText={setState}
      />
      <TextInput
        style={styles.input}
        placeholder="Postal Code"
        value={postalCode}
        onChangeText={setPostalCode}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Pay</Text>
      </TouchableOpacity>
    </View>
  );
};

const CartScreen = () => {
  const [isCheckoutVisible, setCheckoutVisible] = useState(false);
  const navigation = useNavigation();
  const {cart, clearCart, removeFromCart, increaseQuantity, decreaseQuantity} =
    useCart();

  const calculateTotal = () => {
    return cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    );
  };

  const handleViewCart = () => {
    setCheckoutVisible(true);
  };

  const handleCheckoutSubmit = formData => {
    // Effectuer les actions nécessaires avec les données du formulaire (formData)
    // ...

    // Fermer la vue du formulaire
    setCheckoutVisible(false);

    // Naviguer vers la page de confirmation de commande
    navigation.navigate('OrderConfirmation');
  };

  const renderItem = ({item}) => (
    <View style={styles.cartItem}>
      <Image source={{uri: item.image}} style={styles.productImage} />
      <View>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>Prix: ${item.price}</Text>
        <Text style={styles.productQuantity}>Quantité: {item.quantity}</Text>
      </View>
      <TouchableOpacity
        style={styles.increaseButton}
        onPress={() => increaseQuantity(item.id)}>
        <Text style={styles.increaseButtonText}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.decreaseButton}
        onPress={() => decreaseQuantity(item.id)}>
        <Text style={styles.decreaseButtonText}>-</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFromCart(item.id)}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Panier</Text>
      {cart.length > 0 ? (
        <>
          <FlatList
            data={cart}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
          />
          <Text style={styles.total}>Total: ${calculateTotal()}</Text>
          <TouchableOpacity style={styles.buyButton} onPress={handleViewCart}>
            <Text style={styles.buyButtonText}>Order Now</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.emptyCart}>Votre panier est vide.</Text>
      )}

      {isCheckoutVisible && <CheckoutForm onSubmit={handleCheckoutSubmit} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'blue', // Couleur du texte d'en-tête
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  productImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: 'green', // Couleur du texte de prix
  },
  productQuantity: {
    fontSize: 14,
  },
  increaseButton: {
    backgroundColor: 'green',
    padding: 5,
    borderRadius: 5,
  },
  increaseButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'right',
  },
  decreaseButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    marginLeft: 5,
  },
  decreaseButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  removeButton: {
    backgroundColor: 'orange',
    padding: 5,
    borderRadius: 5,
    marginLeft: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'red', // Couleur du texte du total
  },
  buyButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  emptyCart: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
    color: 'gray', // Couleur du texte du panier vide
  },
  // Styles pour le formulaire de paiement
  formContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    elevation: 5,
    marginTop: 20,
  },
  formHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CartScreen;
