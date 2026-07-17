import { router, Stack } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const moods = [
  { label: 'Great', emoji: '😊' },
  { label: 'Okay', emoji: '🙂' },
  { label: 'Not feeling well', emoji: '😔' },
];

export default function DailyCheckInScreen() {
  const [mood, setMood] = useState('Okay');
  const [note, setNote] = useState('');
  const [destination, setDestination] = useState<'relationship' | 'all'>('all');
  const [posted, setPosted] = useState(false);

  const submit = () => {
    setPosted(true);
    setTimeout(() => router.back(), 650);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Daily check-in' }} />
      <ScrollView style={styles.screen} contentContainerStyle={styles.content} contentInsetAdjustmentBehavior="automatic" keyboardShouldPersistTaps="handled">
        <Text selectable style={styles.prompt}>How are you today?</Text>
        <View style={styles.moodRow}>
          {moods.map((item) => {
            const selected = mood === item.label;
            return <Pressable key={item.label} onPress={() => setMood(item.label)} style={[styles.mood, selected && styles.moodSelected]}><Text style={styles.emoji}>{item.emoji}</Text><Text style={[styles.moodLabel, selected && styles.moodLabelSelected]}>{item.label}</Text></Pressable>;
          })}
        </View>
        <View style={styles.noteArea}>
          <Text selectable style={styles.noteLabel}>ANYTHING YOU WANT TO REMEMBER?</Text>
          <TextInput value={note} onChangeText={setNote} multiline placeholder="A thought, a small win, or something you need today..." placeholderTextColor="#A89184" textAlignVertical="top" style={styles.input} />
        </View>
        <View style={styles.actions}>
          <Pressable onPress={submit} style={({ pressed }) => [styles.secondaryAction, pressed && styles.pressed]}><Text style={styles.secondaryText}>Post in this relationship</Text></Pressable>
          <Pressable onPress={submit} style={({ pressed }) => [styles.primaryAction, pressed && styles.pressed]}><Text style={styles.primaryText}>Sync in chosen relationships</Text></Pressable>
        </View>
        {posted && <Text selectable style={styles.confirmation}>Your check-in has been saved.</Text>}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FBF7F1' }, content: { padding: 20, gap: 20, paddingBottom: 130 },
  prompt: { color: '#493B33', fontSize: 27, fontWeight: '700', letterSpacing: -0.5 }, moodRow: { flexDirection: 'row', gap: 8 },
  mood: { flex: 1, minHeight: 92, borderRadius: 18, alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: '#F0E5DC' }, moodSelected: { backgroundColor: '#C9826A' }, emoji: { fontSize: 27 }, moodLabel: { color: '#705A4F', fontSize: 12, fontWeight: '700', textAlign: 'center' }, moodLabelSelected: { color: '#FFFFFF' },
  noteArea: { minHeight: 165, padding: 16, borderRadius: 20, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#F0E8E0', gap: 8 }, noteLabel: { color: '#A17460', fontSize: 10, fontWeight: '800', letterSpacing: 0.9 }, input: { flex: 1, color: '#493B33', fontSize: 16, lineHeight: 22, padding: 0 },
  actions: { gap: 10, marginTop: 4 }, secondaryAction: { alignItems: 'center', padding: 15, borderRadius: 16, borderWidth: 1, borderColor: '#C9826A' }, secondaryText: { color: '#A26351', fontSize: 14, fontWeight: '800' }, primaryAction: { alignItems: 'center', padding: 16, borderRadius: 16, backgroundColor: '#C9826A' }, primaryText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' }, pressed: { opacity: 0.76 }, confirmation: { color: '#798B65', fontSize: 14, fontWeight: '700', textAlign: 'center' },
});
