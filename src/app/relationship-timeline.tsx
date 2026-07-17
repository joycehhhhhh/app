import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const moments = [
  { left: '2017', title: 'First met', description: 'One coffee, then a whole afternoon.' },
  { left: 'MAY', title: 'First concert together', description: 'You sang every chorus on the way home.' },
  { left: '2018', title: 'First trip', description: 'A rainy weekend that became a favorite story.' },
  { left: 'JUL', title: 'Moved in together', description: 'A new key, a new table, a new everyday life.' },
  { left: '2025', title: 'Made this place home', description: 'Dinner at the new table felt like a beginning.' },
  { left: '2026', title: 'Yosemite, next', description: 'A little adventure waiting ahead.' },
];

export default function RelationshipTimeline() {
  return <ScrollView style={styles.screen} contentContainerStyle={styles.content} contentInsetAdjustmentBehavior="automatic"><Stack.Screen options={{ title: 'Our timeline', headerBackTitle: '' }} /><View style={styles.timeline}>{moments.map((moment) => <View key={`${moment.left}-${moment.title}`} style={styles.row}><Text selectable style={styles.left}>{moment.left}</Text><View style={styles.dot} /><View style={styles.copy}><Text selectable style={styles.title}>{moment.title}</Text><Text selectable style={styles.description}>{moment.description}</Text></View></View>)}</View></ScrollView>;
}

const styles = StyleSheet.create({ screen:{flex:1,backgroundColor:'#FBF7F1'},content:{padding:20},timeline:{gap:23},row:{flexDirection:'row',alignItems:'flex-start'},left:{width:47,color:'#9B806F',fontSize:12,fontWeight:'800',letterSpacing:.6,paddingTop:4},dot:{width:10,height:10,borderRadius:5,marginTop:6,marginRight:13,backgroundColor:'#C9826A'},copy:{flex:1,gap:4},title:{color:'#514036',fontSize:18,fontWeight:'800'},description:{color:'#837269',fontSize:14,lineHeight:20} });
