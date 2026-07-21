import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRelationship } from '@/context/relationship-context';

export default function CheckInDetail() {
  const { person = 'Joyce' } = useLocalSearchParams<{ person: string }>();
  const { activeRelationship } = useRelationship();
  const aliases: Record<string, string> = { 'Mommy (Joyce)': 'Joyce', 'Daddy (Brian)': 'Brian', 'Dad (James)': 'James', 'Mom (Sarah)': 'Sarah' };
  const lookup = aliases[person] ?? person;
  const checkIn = [...activeRelationship.checkIns].filter((entry) => entry.person === lookup).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
  const isMemorial = (activeRelationship.memorialMembers ?? []).includes(person) || checkIn?.mood === 'RIP';
  const shownName = person === 'Joyce' ? 'Joyce (you)' : person;
  return <><Stack.Screen options={{ title: `${shownName}'s check-in` }} /><ScrollView style={s.screen} contentContainerStyle={s.content} contentInsetAdjustmentBehavior="automatic"><View style={[s.card, isMemorial && s.memorialCard]}><Text style={s.emoji}>{isMemorial ? '🕊' : checkIn?.emoji ?? '🙂'}</Text><Text style={[s.name, isMemorial && s.memorialText]}>{shownName}</Text><Text style={[s.mood, isMemorial && s.memorialText]}>{isMemorial ? 'RIP' : checkIn?.mood ?? 'No check-in yet'}</Text><View style={s.line} /><Text style={[s.note, isMemorial && s.memorialText]}>{isMemorial ? 'Remembered with love.' : checkIn?.note ?? 'No update has been shared yet.'}</Text>{checkIn?.createdAt ? <Text style={s.date}>{new Date(checkIn.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}</Text> : null}</View></ScrollView></>;
}

const s = StyleSheet.create({ screen:{flex:1,backgroundColor:'#FBF7F1'},content:{padding:20,paddingBottom:48},card:{padding:24,gap:10,borderRadius:25,backgroundColor:'#fff',borderWidth:1,borderColor:'#F0E8E0'},memorialCard:{backgroundColor:'#F5F5F6',borderColor:'#E4E4E7'},emoji:{fontSize:48,textAlign:'center'},name:{color:'#493B33',fontSize:25,fontWeight:'800',textAlign:'center'},mood:{color:'#A26351',fontSize:14,fontWeight:'800',textAlign:'center'},line:{height:1,backgroundColor:'#EDE5DF',marginVertical:8},note:{color:'#715F55',fontSize:16,lineHeight:24,textAlign:'center'},date:{color:'#A17460',fontSize:12,fontWeight:'700',textAlign:'center',marginTop:4},memorialText:{color:'#8E8E93'} });
