import React, {createContext, useContext, useState} from 'react';

// Créez un contexte pour le panier
const CartContext = createContext();

// Hook personnalisé pour utiliser le contexte du panier dans les composants
export function useCart() {
  return useContext(CartContext);
}

// Composant fournisseur de panier
export function CartProvider({children}) {
  const [cart, setCart] = useState([]);

  // Fonction pour ajouter un produit au panier
  const addToCart = product => {
    // Vérifiez si le produit est déjà dans le panier
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
      // Si le produit existe déjà, mettez à jour sa quantité
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // Sinon, ajoutez le produit au panier avec une quantité de 1
      setCart([...cart, {...product, quantity: 1}]);
    }
  };

  // Fonction pour supprimer un produit du panier en fonction de son ID
  const removeFromCart = productId => {
    const updatedCart = cart.filter(product => product.id !== productId);
    setCart(updatedCart);
  };

  // Fonction pour augmenter la quantité d'un produit en fonction de son ID
  const increaseQuantity = productId => {
    const updatedCart = cart.map(product => {
      if (product.id === productId) {
        return {...product, quantity: product.quantity + 1};
      }
      return product;
    });
    setCart(updatedCart);
  };

  // Fonction pour diminuer la quantité d'un produit en fonction de son ID
  const decreaseQuantity = productId => {
    const updatedCart = cart.map(product => {
      if (product.id === productId && product.quantity > 1) {
        return {...product, quantity: product.quantity - 1};
      }
      return product;
    });
    setCart(updatedCart);
  };

  // Fonction pour vider complètement le panier
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}>
      {children}
    </CartContext.Provider>
  );
}
