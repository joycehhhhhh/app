import { Image } from 'expo-image';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRelationship } from '@/context/relationship-context';

export default function MemoryEvent() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { activeRelationship } = useRelationship();
  const memory = activeRelationship.memories.find((item) => item.id === id) ?? activeRelationship.memories[activeRelationship.memories.length - 1];
  if (!memory) return <ScrollView style={s.screen} contentContainerStyle={s.content} contentInsetAdjustmentBehavior="automatic"><Stack.Screen options={{ title: 'Memory' }} /><Text selectable style={s.note}>This memory is no longer available.</Text></ScrollView>;
  return <ScrollView style={s.screen} contentContainerStyle={s.content} contentInsetAdjustmentBehavior="automatic"><Stack.Screen options={{ title: 'Memory', headerBackTitle: '' }} />{memory.photoUri ? <Image source={{ uri: memory.photoUri }} contentFit="cover" style={s.photo} /> : <View style={s.photo}><Text style={s.emoji}>{memory.coverEmoji || '✦'}</Text></View>}<Text selectable style={s.date}>{new Date(memory.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</Text><Text selectable style={s.title}>{memory.title}</Text><Text selectable style={s.note}>{memory.body}</Text></ScrollView>;
}
const s=StyleSheet.create({screen:{flex:1,backgroundColor:'#FBF7F1'},content:{padding:20,gap:14},photo:{height:250,borderRadius:24,backgroundColor:'#D7B99A',alignItems:'center',justifyContent:'center'},emoji:{fontSize:70},date:{color:'#A0715C',fontSize:11,fontWeight:'800',letterSpacing:.9},title:{color:'#493B33',fontSize:27,fontWeight:'700'},note:{color:'#806F65',fontSize:16,lineHeight:23}});
