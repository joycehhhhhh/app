import { router, Stack } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRelationship } from '@/context/relationship-context';

export default function RelationshipTimeline() {
  const { activeRelationship } = useRelationship();
  const events = [...activeRelationship.memories].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  return <ScrollView style={s.screen} contentContainerStyle={s.content} contentInsetAdjustmentBehavior="automatic"><Stack.Screen options={{ title: `${activeRelationship.name} timeline`, headerBackTitle: '' }} /><Text selectable style={s.intro}>The milestones that shape your story.</Text><View style={s.timeline}>{events.length ? events.map((memory) => <Pressable key={memory.id} onPress={() => router.push({ pathname: '/memory-event', params: { id: memory.id } })} style={s.event}><Text selectable style={s.date}>{new Date(memory.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }).toUpperCase()}</Text><View style={s.dot} /><View style={s.copy}><Text selectable style={s.title}>{memory.title}</Text></View></Pressable>) : <Text selectable style={s.empty}>No milestones yet. Save a photo moment to begin this timeline.</Text>}</View></ScrollView>;
}
const s=StyleSheet.create({screen:{flex:1,backgroundColor:'#FBF7F1'},content:{padding:20,gap:16},intro:{color:'#806F65',fontSize:15,lineHeight:21},timeline:{gap:10},event:{flexDirection:'row',alignItems:'center',padding:14,borderRadius:20,backgroundColor:'#fff',borderWidth:1,borderColor:'#F0E8E0'},date:{width:61,color:'#9B806F',fontSize:11,fontWeight:'800',letterSpacing:.6},dot:{width:10,height:10,borderRadius:5,marginRight:13,backgroundColor:'#C9826A'},copy:{flex:1},title:{color:'#514036',fontSize:17,fontWeight:'800'},empty:{color:'#806F65',fontSize:16,lineHeight:22}});
