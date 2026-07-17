import { router, Stack } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const relationships = [
  { name: 'Joyce & Brian', detail: '3,027 days together', initial: 'B', color: '#E8D2C4', active: true },
  { name: 'The Huang family', detail: 'A shared family space', initial: 'H', color: '#D6DDC2', active: false },
  { name: 'Milo', detail: 'Our little adventure buddy', initial: 'M', color: '#D6D0E6', active: false },
];

export default function RelationshipsScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'My relationships', headerBackVisible: false, headerLeft: () => null, animation: 'slide_from_left', headerRight: () => <Pressable onPress={() => router.back()} style={styles.closeButton}><Text style={styles.close}>→</Text></Pressable> }} />
      <ScrollView style={styles.screen} contentContainerStyle={styles.content} contentInsetAdjustmentBehavior="automatic">
        <Text selectable style={styles.intro}>Every relationship has its own story.</Text>
        <View style={styles.list}>
          {relationships.map((relationship) => (
            <Pressable
              key={relationship.name}
              onPress={() => router.back()}
              style={({ pressed }) => [styles.row, relationship.active && styles.activeRow, pressed && styles.pressed]}>
              <View style={[styles.initial, { backgroundColor: relationship.color }]}>
                <Text style={styles.initialText}>{relationship.initial}</Text>
              </View>
              <View style={styles.copy}>
                <Text selectable style={styles.name}>{relationship.name}</Text>
                <Text selectable style={styles.detail}>{relationship.detail}</Text>
              </View>
              {relationship.active && <Text style={styles.active}>Current</Text>}
            </Pressable>
          ))}
        </View>
        <Pressable style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add a relationship</Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FBF7F1' },
  content: { minHeight: '100%', padding: 20, gap: 22, paddingBottom: 40, backgroundColor: '#FBF7F1' }, closeButton:{width:44,height:44,alignItems:'center',justifyContent:'center',transform:[{translateY:-2}]},close:{color:'#493B33',fontSize:25},
  intro: { color: '#806F65', fontSize: 16, lineHeight: 22 },
  list: { gap: 10 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 13, padding: 14, borderRadius: 20, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#F0E8E0' },
  activeRow: { borderColor: '#D7AD9D', backgroundColor: '#FFFDFC' },
  initial: { width: 47, height: 47, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  initialText: { color: '#5E4D45', fontSize: 17, fontWeight: '700' },
  copy: { flex: 1, gap: 3 },
  name: { color: '#493B33', fontSize: 17, fontWeight: '700' },
  detail: { color: '#88766B', fontSize: 13 },
  active: { color: '#A0715C', fontSize: 11, fontWeight: '800' },
  addButton: { alignItems: 'center', padding: 15, borderRadius: 16, backgroundColor: '#F0DDD1' },
  addButtonText: { color: '#875F50', fontSize: 14, fontWeight: '800' },
  pressed: { opacity: 0.75 },
});
