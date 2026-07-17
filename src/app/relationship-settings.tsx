import { Stack } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { useRelationship } from '@/context/relationship-context';

const reminderOptions = [1, 3, 5];

export default function RelationshipSettingsScreen() {
  const { relationshipName, setRelationshipName, startDate, setStartDate, reminderYears, setReminderYears } = useRelationship();

  const toggleReminder = (year: number) => {
    setReminderYears((current) => current.includes(year) ? current.filter((item) => item !== year) : [...current, year].sort((a, b) => a - b));
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Relationship settings' }} />
      <ScrollView style={styles.screen} contentContainerStyle={styles.content} contentInsetAdjustmentBehavior="automatic">
        <Text selectable style={styles.intro}>Shape this space around the relationship you share.</Text>
        <View style={styles.card}>
          <Text selectable style={styles.label}>RELATIONSHIP NAME</Text>
          <TextInput value={relationshipName} onChangeText={setRelationshipName} style={styles.input} />
          <View style={styles.divider} />
          <Text selectable style={styles.label}>START DATE · YYYY-MM-DD</Text>
          <TextInput value={startDate} onChangeText={setStartDate} placeholder="MM/DD/YYYY" placeholderTextColor="#A89184" style={styles.input} />
        </View>
        <View style={styles.heading}><Text selectable style={styles.label}>FLASHBACK REMINDERS</Text><Text selectable style={styles.title}>Which years should we revisit?</Text></View>
        <Text selectable style={styles.helper}>Choose the anniversaries that feel meaningful. You can change this anytime.</Text>
        <View style={styles.reminderGrid}>
          {reminderOptions.map((year) => {
            const selected = reminderYears.includes(year);
            return <Pressable key={year} onPress={() => toggleReminder(year)} style={[styles.reminder, selected && styles.reminderSelected]}><Text style={[styles.reminderNumber, selected && styles.reminderNumberSelected]}>{year}</Text><Text style={[styles.reminderLabel, selected && styles.reminderLabelSelected]}>{year === 1 ? 'year ago' : 'years ago'}</Text></Pressable>;
          })}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FBF7F1' }, content: { padding: 20, paddingBottom: 130, gap: 18 },
  intro: { color: '#806F65', fontSize: 16, lineHeight: 22 }, card: { padding: 17, gap: 7, borderRadius: 21, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#F0E8E0' },
  label: { color: '#A17460', fontSize: 10, fontWeight: '800', letterSpacing: 0.95 }, input: { color: '#493B33', fontSize: 17, fontWeight: '700', paddingVertical: 2 }, calendarControl:{flexDirection:'row',justifyContent:'space-between',paddingVertical:5},calendarText:{color:'#493B33',fontSize:17,fontWeight:'700'},calendarHint:{color:'#A17460',fontSize:11,fontWeight:'700'},divider: { height: 1, backgroundColor: '#F0E8E0', marginVertical: 8 },
  heading: { gap: 4, marginTop: 4 }, title: { color: '#493B33', fontSize: 24, fontWeight: '700', letterSpacing: -0.5 }, helper: { color: '#88766B', fontSize: 14, lineHeight: 20 },
  reminderGrid: { flexDirection: 'row', gap: 8 }, reminder: { flex:1, paddingVertical: 17, alignItems: 'center', borderRadius: 14, backgroundColor: '#F0E5DC' }, reminderSelected: { backgroundColor: '#C9826A' }, reminderNumber: { color: '#715B50', fontSize: 22, fontWeight: '800', fontVariant: ['tabular-nums'] }, reminderNumberSelected: { color: '#FFFFFF' }, reminderLabel: { color: '#806F65', fontSize: 12, fontWeight: '700' }, reminderLabelSelected: { color: '#FFFFFF' },
});
