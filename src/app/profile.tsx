import { router, Stack } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const settings = [
  { title: 'Profile details', route: '/profile-details' },
  { title: 'Notifications', route: '/notifications' },
  { title: 'Privacy & sharing', route: '/privacy-sharing' },
];

export default function ProfileScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Profile & settings' }} />
      <ScrollView style={styles.screen} contentContainerStyle={styles.content} contentInsetAdjustmentBehavior="automatic">
        <View style={styles.profileCard}>
          <View style={styles.avatar}><Text style={styles.avatarText}>J</Text></View>
          <View><Text selectable style={styles.name}>Joyce</Text><Text selectable style={styles.email}>joyce@example.com</Text></View>
        </View>
        <Text selectable style={styles.heading}>SETTINGS</Text>
        <View style={styles.settingsCard}>
          {settings.map((setting, index) => (
            <Pressable key={setting.title} onPress={() => router.push(setting.route as never)} style={[styles.setting, index < settings.length - 1 && styles.separator]}>
              <Text selectable style={styles.settingText}>{setting.title}</Text><Text style={styles.chevron}>›</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FBF7F1' }, content: { padding: 20, gap: 24, paddingBottom: 130 },
  profileCard: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 18, borderRadius: 22, backgroundColor: '#F0DDD1' },
  avatar: { width: 58, height: 58, borderRadius: 29, backgroundColor: '#E8D2C4', alignItems: 'center', justifyContent: 'center' }, avatarText: { color: '#705548', fontSize: 22, fontWeight: '700' },
  name: { color: '#493B33', fontSize: 21, fontWeight: '700' }, email: { marginTop: 3, color: '#806F65', fontSize: 14 },
  heading: { color: '#A17460', fontSize: 11, fontWeight: '800', letterSpacing: 1 }, settingsCard: { borderRadius: 20, overflow: 'hidden', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#F0E8E0' },
  setting: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 17 }, separator: { borderBottomWidth: 1, borderBottomColor: '#F2ECE6' }, settingText: { color: '#55453B', fontSize: 16, fontWeight: '600' }, chevron: { color: '#9A7869', fontSize: 25 },
});
