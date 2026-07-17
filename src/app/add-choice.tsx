import { router, Stack } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function AddChoiceScreen() {
  return <View style={styles.screen}><Stack.Screen options={{ title: 'Add to your story' }} /><Text selectable style={styles.title}>What would you like to add?</Text><Pressable onPress={() => router.push('/add-memory')} style={styles.card}><Text style={styles.icon}>▣</Text><View><Text style={styles.cardTitle}>Memory</Text><Text style={styles.copy}>Photos, voice, or a written moment</Text></View></Pressable><Pressable onPress={() => router.push('/daily-check-in')} style={styles.card}><Text style={styles.icon}>♡</Text><View><Text style={styles.cardTitle}>Daily check-in</Text><Text style={styles.copy}>A small update about your day</Text></View></Pressable></View>;
}
const styles = StyleSheet.create({ screen:{flex:1,backgroundColor:'#FBF7F1',padding:20,gap:14},title:{color:'#493B33',fontSize:27,fontWeight:'700',marginBottom:8},card:{flexDirection:'row',gap:15,padding:18,borderRadius:22,backgroundColor:'#FFFFFF',alignItems:'center'},icon:{color:'#C9826A',fontSize:30},cardTitle:{color:'#493B33',fontSize:18,fontWeight:'700'},copy:{color:'#806F65',fontSize:13,marginTop:3} });
