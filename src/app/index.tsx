import { router, Stack } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { useRelationship } from '@/context/relationship-context';

const DAY_IN_MS = 24 * 60 * 60 * 1000;

export default function HomeScreen() {
  const { relationshipName, setRelationshipName, startDate, setStartDate, reminderYears } = useRelationship();
  const [isEditing, setIsEditing] = useState(false);

  const daysTogether = useMemo(() => {
    const parsedDate = new Date(`${startDate}T00:00:00`);
    if (Number.isNaN(parsedDate.getTime())) return null;
    return Math.max(0, Math.floor((Date.now() - parsedDate.getTime()) / DAY_IN_MS));
  }, [startDate]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Choose a relationship"
            onPress={() => router.push('/relationships')}
            style={({ pressed }) => [styles.relationshipPicker, pressed && styles.pressed]}>
            <Text style={styles.menuIcon}>☰</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open profile and settings"
            onPress={() => router.push('/profile')}
            style={({ pressed }) => [styles.avatar, pressed && styles.pressed]}>
            <Text style={styles.avatarText}>J</Text>
          </Pressable>
        </View>

        <View style={styles.identitySection}>
          {isEditing ? (
            <View style={styles.editorCard}>
              <Text style={styles.editorLabel}>RELATIONSHIP NAME</Text>
              <TextInput
                value={relationshipName}
                onChangeText={setRelationshipName}
                placeholder="Joyce & Brian"
                placeholderTextColor="#A18C80"
                style={styles.nameInput}
              />
              <Text style={styles.editorLabel}>START DATE · YYYY-MM-DD</Text>
              <TextInput
                value={startDate}
                onChangeText={setStartDate}
                placeholder="2018-04-01"
                placeholderTextColor="#A18C80"
                autoCapitalize="none"
                style={styles.dateInput}
              />
              <Pressable onPress={() => setIsEditing(false)} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Done</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.identityRow}>
              <View style={styles.identityCopy}>
                <Text selectable style={styles.relationshipName}>
                  {relationshipName || 'Our relationship'}
                </Text>
                <Text selectable style={styles.daysTogether}>
                  {daysTogether === null
                    ? 'Add a relationship start date'
                    : `${daysTogether.toLocaleString()} days together`}
                </Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.mainPart}>
        <View style={styles.sectionHeading}><Text selectable style={styles.eyebrow}>MOST RECENT CHECK-IN</Text><Text selectable style={styles.sectionTitle}>A little pulse, together</Text></View>
        <View style={styles.aiHighlight}><Text selectable style={styles.eyebrow}>TODAY’S HIGHLIGHT</Text><Text selectable style={styles.aiText}>Brian seems to have had a tough day because of his manager.</Text></View>
        <View style={styles.latestPeople}><Pressable onPress={() => router.push('/check-in-detail?person=Joyce')} style={styles.conditionChip}><Text style={styles.conditionEmoji}>😊</Text><Text selectable style={styles.conditionName}>Joyce</Text></Pressable><Pressable onPress={() => router.push('/check-in-detail?person=Brian')} style={styles.conditionChip}><Text style={styles.conditionEmoji}>😔</Text><Text selectable style={styles.conditionName}>Brian</Text></Pressable></View>
        </View>

        <View style={styles.mainPart}><Pressable onPress={() => router.push('/future-events')} style={styles.countdownCard}><Text style={styles.countdownNumber}>42</Text><View><Text selectable style={styles.countdownTitle}>days until your Yosemite trip</Text><Text selectable style={styles.countdownNote}>Tap to see the event details</Text></View></Pressable></View>

        <View style={styles.sectionHeading}>
          <Text selectable style={styles.eyebrow}>
            YOUR LATEST CHAPTER
          </Text>
          <Text selectable style={styles.sectionTitle}>
            Our last memory
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open our last memory"
          onPress={() => {}}
          style={({ pressed }) => [styles.memoryCard, pressed && styles.pressed]}>
          <View style={styles.memoryPhoto}>
            <Text style={styles.memoryPhotoEmoji}>🍝</Text>
            <Text style={styles.photoLabel}>JULY 16</Text>
          </View>
          <View style={styles.memoryCopy}>
            <Text selectable style={styles.memoryDate}>
              YESTERDAY · SAN FRANCISCO
            </Text>
            <Text selectable style={styles.memoryTitle}>
              Dinner at the new table
            </Text>
            <Text selectable style={styles.memoryNote}>
              First dinner together after making this place our own.
            </Text>
          </View>
        </Pressable>

        <View style={styles.sectionHeading}>
          <Text selectable style={styles.eyebrow}>A LITTLE REMINDER</Text>
          <Text selectable style={styles.sectionTitle}>From this day</Text>
        </View>

        <View style={styles.flashbackList}>
          {reminderYears.map((year) => (
            <Pressable key={year} onPress={() => router.push(`/memory-event?year=${year}`)} style={styles.flashbackCard}>
              <Text selectable style={styles.flashbackYear}>{year} {year === 1 ? 'YEAR' : 'YEARS'} AGO</Text>
              <Text selectable style={styles.flashbackTitle}>{year === 1 ? 'Our first dinner here' : year === 2 ? 'The weekend we got lost' : 'That tiny kitchen dance party'}</Text>
              <Text selectable style={styles.flashbackNote}>{year === 1 ? 'The apartment was still full of boxes, but it already felt like home.' : 'A small moment worth keeping close.'}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FBF7F1' },
  content: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 128, gap: 24 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  relationshipPicker: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' },
  menuIcon: { color: '#876F63', fontSize: 22 },
  avatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#E8D2C4', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#705548', fontSize: 17, fontWeight: '700' },
  identitySection: { minHeight: 82, justifyContent: 'center' },
  identityRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  identityCopy: { flex: 1, gap: 5 },
  relationshipName: { color: '#47382F', fontSize: 32, fontWeight: '700', letterSpacing: -1 },
  daysTogether: { color: '#9A7869', fontSize: 15, fontWeight: '600', fontVariant: ['tabular-nums'] },
  editButton: { paddingHorizontal: 13, paddingVertical: 8, borderRadius: 14, backgroundColor: '#F1E5DC' },
  editButtonText: { color: '#8C6657', fontSize: 13, fontWeight: '800' },
  editorCard: { padding: 16, gap: 8, borderRadius: 20, backgroundColor: '#F1E5DC' },
  editorLabel: { color: '#9B7665', fontSize: 10, fontWeight: '800', letterSpacing: 0.9, marginTop: 2 },
  nameInput: { color: '#49382F', fontSize: 20, fontWeight: '700', paddingVertical: 3 },
  dateInput: { color: '#49382F', fontSize: 16, fontWeight: '600', paddingVertical: 3 },
  saveButton: { alignSelf: 'flex-start', backgroundColor: '#C9826A', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 9, marginTop: 4 },
  saveButtonText: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },
  mainPart:{padding:16,gap:13,borderRadius:24,backgroundColor:'#FFFFFF',borderWidth:1,borderColor:'#F0E8E0'}, sectionHeading: { gap: 4 },
  eyebrow: { color: '#A17460', fontSize: 11, fontWeight: '800', letterSpacing: 1.05 },
  sectionTitle: { color: '#493B33', fontSize: 25, fontWeight: '700', letterSpacing: -0.5 },
  memoryCard: { overflow: 'hidden', borderRadius: 24, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#F0E8E0' },
  memoryPhoto: { height: 184, backgroundColor: '#D7B99A', alignItems: 'center', justifyContent: 'center' },
  memoryPhotoEmoji: { fontSize: 68 },
  photoLabel: { position: 'absolute', right: 14, bottom: 13, color: '#FFFFFF', fontSize: 10, fontWeight: '800', letterSpacing: 1, backgroundColor: 'rgba(69,55,47,0.28)', borderRadius: 9, overflow: 'hidden', paddingHorizontal: 8, paddingVertical: 5 },
  memoryCopy: { padding: 17, gap: 5 },
  memoryDate: { color: '#A0715C', fontSize: 10, fontWeight: '800', letterSpacing: 0.9 },
  memoryTitle: { color: '#47382F', fontSize: 21, fontWeight: '700', letterSpacing: -0.3 },
  memoryNote: { color: '#806F65', fontSize: 14, lineHeight: 20 },
  checkInList: { gap: 10 },
  memberCheckIn: { flexDirection: 'row', alignItems: 'center', gap: 11, padding: 13, borderRadius: 19, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#F0E8E0' },
  memberAvatar: { width: 39, height: 39, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  memberInitial: { color: '#665349', fontSize: 14, fontWeight: '800' },
  memberCopy: { flex: 1, gap: 2 },
  memberName: { color: '#503F35', fontSize: 15, fontWeight: '800' },
  memberStatus: { color: '#837269', fontSize: 12 },
  memberTime: { color: '#A18A7D', fontSize: 10, fontWeight: '700' },
  flashbackList: { gap: 10 },
  flashbackCard: { padding: 19, gap: 6, borderRadius: 24, backgroundColor: '#E7E3D1' },
  flashbackYear: { color: '#887C48', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  flashbackTitle: { color: '#4D4A39', fontSize: 21, fontWeight: '700', letterSpacing: -0.3 },
  flashbackNote: { color: '#6B6756', fontSize: 14, lineHeight: 20 },
  flashbackLink: { color: '#82733F', fontSize: 12, fontWeight: '800', marginTop: 2 },
  countdownCard:{flexDirection:'row',alignItems:'center',gap:12,padding:15,borderRadius:20,backgroundColor:'#F1E5DC'},countdownNumber:{color:'#A26351',fontSize:28,fontWeight:'800',fontVariant:['tabular-nums']},countdownTitle:{color:'#554238',fontSize:15,fontWeight:'800'},countdownNote:{color:'#8D7468',fontSize:12,marginTop:3},countdownArrow:{marginLeft:'auto',color:'#A0715C',fontSize:22},
  averageCard: { flexDirection: 'row', gap: 13, alignItems: 'center', padding: 16, borderRadius: 21, backgroundColor: '#F0DDD1' }, averageEmoji: { fontSize: 35 }, averageCopy:{flex:1,minWidth:0}, averageTitle: { color: '#503C32', fontSize: 16, fontWeight: '800' }, averageNote: { color: '#846C60', fontSize: 12, marginTop: 3 }, latestPeople: { flexDirection: 'row', gap: 9, padding:10, borderRadius:16, backgroundColor:'#F8F4EF' }, conditionChip:{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',gap:6,paddingVertical:8,borderRadius:12,backgroundColor:'#FFFFFF'},conditionEmoji:{fontSize:20},conditionName:{color:'#715B50',fontSize:13,fontWeight:'800'}, aiHighlight: { padding: 16, gap: 6, borderRadius: 19, backgroundColor: '#E7E3D1' }, aiText: { color: '#5D594A', fontSize: 15, lineHeight: 21 },
  pressed: { opacity: 0.8, transform: [{ scale: 0.985 }] },
});
