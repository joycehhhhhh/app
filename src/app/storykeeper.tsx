import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function StorykeeperScreen() {
  return (
    <>
      <Stack.Screen options={{ title: '' }} />
      <ScrollView style={styles.screen} contentContainerStyle={styles.content} contentInsetAdjustmentBehavior="automatic">
        <View style={styles.hero}><Text style={styles.sparkle}>✦</Text><Text selectable style={styles.title}>Our story</Text><Text selectable style={styles.copy}>An AI-assisted timeline of the chapters you have shared.</Text></View>
        <View style={styles.timeline}><Text selectable style={styles.major}>First met · September 2017</Text><Text selectable style={styles.minor}>A coffee that turned into an entire afternoon.</Text><Text selectable style={styles.major}>Moved in together · July 2025</Text><Text selectable style={styles.minor}>A new key, a new table, a new everyday life.</Text><Text selectable style={styles.minor}>Sunday pancake ritual · July 2026</Text></View>
        <View style={styles.preview}><Text selectable style={styles.label}>JULY 2026 · PREVIEW</Text><Text selectable style={styles.previewTitle}>A new place, made yours</Text><Text selectable style={styles.previewCopy}>You filled this month with small rituals: dinners at the new table, walks home in the evening, and room for each other in the middle of it all.</Text></View>
        <Text selectable style={styles.footnote}>AI-assisted reflections are coming soon. Your memories remain private and in your control.</Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FBF7F1' }, content: { padding: 20, gap: 22, paddingBottom: 40 }, hero: { alignItems: 'center', paddingVertical: 24, gap: 12 }, sparkle: { color: '#9A8B50', fontSize: 44 }, title: { color: '#494837', fontSize: 30, fontWeight: '700', textAlign: 'center', letterSpacing: -0.5 }, copy: { color: '#74715D', fontSize: 15, lineHeight: 22, textAlign: 'center', maxWidth: 310 }, timeline:{gap:14,borderLeftWidth:2,borderLeftColor:'#C9BE8D',paddingLeft:16},major:{color:'#4D4A39',fontSize:20,fontWeight:'800'},minor:{color:'#898575',fontSize:14,lineHeight:20}, preview: { padding: 20, borderRadius: 24, backgroundColor: '#E7E3D1', gap: 8 }, label: { color: '#887C48', fontSize: 10, fontWeight: '800', letterSpacing: 1 }, previewTitle: { color: '#4D4A39', fontSize: 22, fontWeight: '700', letterSpacing: -0.4 }, previewCopy: { color: '#6B6756', fontSize: 15, lineHeight: 22 }, footnote: { color: '#938A7B', fontSize: 13, lineHeight: 19, textAlign: 'center', paddingHorizontal: 12 },
});
