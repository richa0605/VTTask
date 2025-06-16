
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import Images from '../assets/index';

const BookDetailScreen = ({ route }) => {
  const { book } = route.params;

  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const coverUrl = book.cover_id
    ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`
    : undefined;

  const author = book.authors?.map(a => a.name).join(', ') ?? 'Unknown';
  const category = book.subject?.[0] ?? 'Novel';
  const price = Number(((book.subject?.length ?? 0) * 2 + 5).toFixed(0));
  const key = book.key ?? book.id ?? book.title; 
  const inCart = cart.some(item => item.key === key);

  const handleAddToCart = () => {
    if (inCart) return;  // safety guard
    dispatch(
      addToCart({
        key,
        title: book.title,
        author,
        category,
        image: coverUrl,
        price,
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: coverUrl }}
        style={styles.image}
        defaultSource={Images.placeholder}
      />

      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>{author}</Text>
      <Text style={styles.price}>${price}</Text>

      <Pressable
        style={[
          styles.button,
          inCart && styles.buttonDisabled, 
        ]}
        onPress={handleAddToCart}
        disabled={inCart}                  
      >
        <Text style={styles.buttonText}>
          {inCart ? 'Added to Cart' : 'Add to Cart'}
        </Text>
      </Pressable>
    </View>
  );
};

export default BookDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    backgroundColor: '#eee',
    marginBottom: 12,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  author: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },

  price: {
    fontSize: 18,
    color: '#007BFF',
    marginBottom: 16,
  },

  button: {
    backgroundColor: '#000',
    borderRadius: 6,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
    backgroundColor: '#666',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
