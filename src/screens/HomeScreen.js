
import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet,
  ScrollView, FlatList,
  Image, TouchableOpacity,
  Dimensions, ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const WIDTH = Dimensions.get('screen').width;

const HomeScreen = ({ navigation }) => {
  const [deals, setDeals] = useState([]);
  const [topBooks, setTopBooks] = useState([]);
  const [latest, setLatest] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [tab, setTab] = useState('week');
  const [loading, setLoading] = useState(true);

  const fetchSection = async (subject, setter) => {
    const res = await fetch(`https://openlibrary.org/subjects/${subject}.json?limit=10`);
    const json = await res.json();
    setter(json.works || []);
  };

  useEffect(() => {
    Promise.all([
      fetchSection('mystery', setDeals),
      fetchSection('romance', setTopBooks),
      fetchSection('fantasy', setLatest),
      fetchSection('science_fiction', setUpcoming),
    ]).finally(() => setLoading(false));
  }, []);

  const renderDeal = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('BookDetail', { book: item })}>
    <View style={styles.dealCard}>
      <Image source={{ uri: item.cover_id
        ? `https://covers.openlibrary.org/b/id/${item.cover_id}-L.jpg`
        : undefined
      }} style={styles.dealImage} />
      <View style={styles.overlay}>
        <Text numberOfLines={2} style={styles.dealTitle}>{item.title}</Text>
        <Text style={styles.price}>${((item.subject ? item.subject.length * 3 + 10 : 10).toFixed(0))}</Text>
        <Text style={styles.discount}>12% off</Text>
      </View>
    </View>
    </TouchableOpacity>
  );

  const renderBook = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('BookDetail', { book: item })}>
    <View style={styles.card}>
      <Image source={{ uri: item.cover_id
        ? `https://covers.openlibrary.org/b/id/${item.cover_id}-M.jpg`
        : undefined
      }} style={styles.cardImage} />
      <Text style={styles.category}>{item.subject ? item.subject[0] : ''}</Text>
      <Text numberOfLines={1} style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.author}>{item.authors?.[0]?.name}</Text>
      <Text style={styles.price}>${((item.subject ? item.subject.length * 2 + 5 : 5).toFixed(0))}</Text>
    </View>
</TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator style={{ flex:1, justifyContent:'center' }} size="large" />;
  }

  return (
<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Happy Reading!</Text>

      <Text style={styles.sectionTitle}>Best Deals</Text>
      <FlatList
        horizontal data={deals}
        renderItem={renderDeal} keyExtractor={i => i.key}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 8 }}
      />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Top Books</Text>
        <Text style={styles.seeMore}>see more</Text>
      </View>
      <View style={styles.tabRow}>
        {['week','month','year'].map(item => (
          <TouchableOpacity
            key={item}
            style={[styles.tabButton, tab===item && styles.tabActive]}
            onPress={() => setTab(item)}
          >
            <Text>{`This ${item.charAt(0).toUpperCase()+item.slice(1)}`}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        horizontal data={topBooks.slice(0,4)}
        renderItem={renderBook} keyExtractor={i=>i.key}
        showsHorizontalScrollIndicator={false}
      />

      <Section title="Latest Books" data={latest.slice(0,4)} renderBook={renderBook} />
      <Section title="Upcoming Books" data={upcoming.slice(0,4)} renderBook={renderBook} />
    </ScrollView>
</SafeAreaView>
  );
};

const Section = ({ title, data, renderBook }) => (
  <View>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.seeMore}>see more</Text>
    </View>
    <FlatList
      horizontal data={data}
      renderItem={renderBook} keyExtractor={i=>i.key}
      showsHorizontalScrollIndicator={false}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#fff', paddingHorizontal:16 },
  header: { fontSize:18, fontWeight:'600', marginVertical:12 },
  sectionTitle: { fontSize:16, fontWeight:'bold' },
  seeMore: { color:'#007BFF' },
  sectionHeader: { flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:10 },
  tabRow: { flexDirection:'row', gap:8, marginBottom:10 },
  tabButton: { paddingVertical:6, paddingHorizontal:12, borderRadius:8, backgroundColor:'#fff', borderWidth:1, borderColor:'#ccc' },
  tabActive: { backgroundColor:'#eee' },

  dealCard: { width: WIDTH*0.7, height:160, marginRight:12, borderRadius:12, overflow:'hidden' },
  dealImage: { width:'100%', height:'100%' },
  overlay: { position:'absolute', bottom:0, left:0, right:0, padding:8, backgroundColor:'rgba(0,0,0,0.6)' },
  dealTitle: { color:'#fff', fontSize:14, fontWeight:'bold' },
  price: { color:'#fff', fontSize:12 },
  discount: { color:'#fff', fontSize:10 },

  card: { width:120, marginRight:12 },
  cardImage: { width:'100%', height:180, borderRadius:8 },
  category: { fontSize:10, color:'#666', marginTop:4 },
  cardTitle: { fontSize:12, fontWeight:'600' },
  author: { fontSize:10, color:'#444' },
});

export default HomeScreen;
