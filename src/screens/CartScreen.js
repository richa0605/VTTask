
import React, { useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQty, clearCart } from '../store/cartSlice';
import Images from '../assets/index'

const SHIPPING_FEE = 10;

const CartScreen = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const subTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart],
  );
  const total = subTotal + (cart.length ? SHIPPING_FEE : 0);

  const changeQty = (key, newQty) =>
    dispatch(updateQty({ key, qty: Math.max(1, newQty) }));

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.thumb} />

      <View style={styles.cardBody}>
        <Text numberOfLines={1} style={styles.category}>
          {item.category}
        </Text>
        <Text numberOfLines={2} style={styles.title}>
          {item.title}
        </Text>
        {item.author ? (
          <Text numberOfLines={1} style={styles.author}>
            {item.author}
          </Text>
        ) : null}

        <View style={styles.qtyRow}>
          <Pressable
            style={styles.qtyBtn}
            onPress={() => changeQty(item.key, item.qty - 1)}>
            <Image source={Images.minus} style={styles.icon} />
          </Pressable>

          <Text style={styles.qtyText}>{item.qty}</Text>

          <Pressable
            style={styles.qtyBtn}
            onPress={() => changeQty(item.key, item.qty + 1)}>
            <Image source={Images.plus} style={styles.icon} />
          </Pressable>
        </View>
      </View>

      <Text style={styles.price}>
        ${(item.price * item.qty).toFixed(2)}
      </Text>

      <Pressable
        style={styles.closeBtn}
        onPress={() => dispatch(removeFromCart(item.key))}>
        <Image source={Images.close} style={styles.closeIcon} />
      </Pressable>
    </View>
  );

  const Footer = () =>
    cart.length ? (
      <>
        <View style={styles.summary}>
          <Text style={styles.summaryHeader}>Order Summary</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Subtotal</Text>
            <Text style={styles.value}>${subTotal.toFixed(2)}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Shipping</Text>
            <Text style={styles.value}>${SHIPPING_FEE.toFixed(2)}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={[styles.label, styles.totalLabel]}>Total</Text>
            <Text style={[styles.value, styles.totalValue]}>
              ${total.toFixed(2)}
            </Text>
          </View>
        </View>

        <Pressable style={styles.checkoutBtn}>
          <Text style={styles.checkoutTxt}>Proceed to Checkout</Text>
        </Pressable>

        <Pressable onPress={() => dispatch(clearCart())}>
          <Text style={styles.clearTxt}>Clear Cart</Text>
        </Pressable>
      </>
    ) : null;

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={cart}
        keyExtractor={i => i.key}
        renderItem={renderItem}
        contentContainerStyle={styles.content}
        ListEmptyComponent={
          <Text style={styles.empty}>Your cart is empty.</Text>
        }
        ListFooterComponent={Footer}
      />
    </SafeAreaView>
  );
};

export default CartScreen;

const radius = 10;
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16, paddingBottom: 32 },

  empty: { textAlign: 'center', marginTop: 50, color: '#999', fontSize: 16 },

  card: {
    flexDirection: 'row',
    backgroundColor: '#000',
    padding: 12,
    borderRadius: radius,
    marginBottom: 18,
  },
  thumb: { width: 60, height: 90, borderRadius: radius - 2 },
  cardBody: { flex: 1, marginLeft: 10 },
  category: { color: '#bbb', fontSize: 11 },
  title: { color: '#fff', fontSize: 14, fontWeight: '600' },
  author: { color: '#aaa', fontSize: 11, marginTop: 2 },

  qtyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  qtyBtn: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { width: 14, height: 14, resizeMode: 'contain' },
  qtyText: {
    width: 26,
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
  },

  price: { color: '#fff', fontWeight: '600', marginLeft: 8, marginTop: 12 },
  closeBtn: { position: 'absolute', top: 4, right: 4, padding: 4 },
  closeIcon: { width: 18, height: 18, resizeMode: 'contain' },

  summary: { marginTop: 12 },
  summaryHeader: { fontSize: 18, fontWeight: '600', marginBottom: 14 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: { fontSize: 14, color: '#444' },
  value: { fontSize: 14, color: '#444', fontWeight: '600' },
  divider: { height: 1, backgroundColor: '#bbb', opacity: 0.3, marginVertical: 4 },
  totalLabel: { fontSize: 16 },
  totalValue: { fontSize: 16 },

  checkoutBtn: {
    backgroundColor: '#000',
    borderRadius: 6,
    paddingVertical: 14,
    marginTop: 14,
  },
  checkoutTxt: { color: '#fff', fontSize: 16, fontWeight: '600', textAlign: 'center' },
  clearTxt: {
    textAlign: 'center',
    marginTop: 14,
    color: 'red',
    fontSize: 15,
    fontWeight: '500',
  },
});
