import { router, usePathname } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function BottomNavigation() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  if (pathname !== '/') return null;

  return (
    <View pointerEvents="box-none" style={styles.wrap}>
      <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 8) }]}>
        <Pressable
          accessibilityRole="tab"
          accessibilityState={{ selected: false }}
          onPress={() => router.push('/relationship-timeline')}
          style={({ pressed }) => [styles.sideButton, pressed && styles.pressed]}>
          <Text style={styles.sideIcon}>🕘</Text>
        </Pressable>
        <Pressable
          accessibilityRole="tab"
          accessibilityState={{ selected: pathname === '/daily-check-in' }}
          onPress={() => router.push('/add-choice')}
          style={({ pressed }) => [styles.checkInButton, pressed && styles.pressed]}>
          <Text style={styles.checkInIcon}>+</Text>
        </Pressable>
        <Pressable
          accessibilityRole="tab"
          accessibilityState={{ selected: false }}
          onPress={() => router.push('/relationship-settings')}
          style={({ pressed }) => [styles.sideButton, pressed && styles.pressed]}>
          <Text style={styles.sideIcon}>⚙</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', left: 0, right: 0, bottom: 0, alignItems: 'center', pointerEvents: 'box-none', backgroundColor: '#FFFFFF' },
  bar: { width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 28, paddingTop: 5, borderTopLeftRadius: 24, borderTopRightRadius: 24, backgroundColor: '#FFFFFF', boxShadow: '0 -3px 16px rgba(82, 60, 46, 0.10)' },
  sideButton: { width: 62, height: 46, alignItems: 'center', justifyContent: 'center' },
  sideIcon: { color: '#876F63', fontSize: 31, lineHeight: 34 },
  checkInButton: { width: 68, height: 68, borderRadius: 34, marginTop: -28, alignItems: 'center', justifyContent: 'center', backgroundColor: '#C9826A', boxShadow: '0 6px 18px rgba(152, 92, 70, 0.32)' },
  checkInIcon: { color: '#FFFFFF', fontSize: 43, lineHeight: 45, fontWeight: '300' },
  pressed: { opacity: 0.8, transform: [{ scale: 0.96 }] },
});
