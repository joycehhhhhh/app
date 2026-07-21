import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput } from 'react-native';

export default function AddMemorialMembers() {
  const params = useLocalSearchParams<{ name?: string; startDate?: string; members?: string; memorialMembers?: string }>();
  const [names, setNames] = useState(() => {
    const savedNames = (params.memorialMembers ?? '').split(',').map((name) => name.trim()).filter(Boolean);
    return savedNames.length ? savedNames : [''];
  });

  const updateName = (index: number, value: string) => setNames((current) => current.map((name, currentIndex) => currentIndex === index ? value : name));
  const addPerson = () => setNames((current) => [...current, '']);

  const continueToRelationship = () => {
    const memorialMembers = names.map((name) => name.trim()).filter(Boolean);
    if (!memorialMembers.length) {
      Alert.alert('Add a name', 'Enter at least one person to continue.');
      return;
    }
    router.replace({ pathname: '/relationship-settings', params: { create: '1', name: params.name ?? '', startDate: params.startDate ?? '', members: params.members ?? '', memorialMembers: memorialMembers.join(', ') } });
  };

  return <><Stack.Screen options={{ title: 'Remember someone' }} /><ScrollView style={s.screen} contentContainerStyle={s.content} contentInsetAdjustmentBehavior="automatic" keyboardShouldPersistTaps="handled"><Text style={s.intro}>Add the people who have passed away. Their place in this relationship will be shown with care.</Text><Text style={s.label}>THEIR NAME</Text>{names.map((name, index) => <TextInput key={index} value={name} onChangeText={(value) => updateName(index, value)} placeholder="Enter how you would call them" placeholderTextColor="#A89184" autoFocus={index === 0} style={s.input} />)}<Pressable onPress={addPerson} style={s.add}><Text style={s.addText}>+ Add another person</Text></Pressable><Pressable onPress={continueToRelationship} style={s.save}><Text style={s.saveText}>Add to this relationship</Text></Pressable></ScrollView></>;
}

const s = StyleSheet.create({ screen: { flex: 1, backgroundColor: '#FBF7F1' }, content: { padding: 20, gap: 12, paddingBottom: 48 }, intro: { color: '#806F65', fontSize: 16, lineHeight: 23, marginBottom: 10 }, label: { color: '#A17460', fontSize: 10, fontWeight: '800', letterSpacing: 1 }, input: { minHeight: 54, paddingHorizontal: 16, borderRadius: 16, backgroundColor: '#fff', borderWidth: 1, borderColor: '#F0E8E0', color: '#493B33', fontSize: 17, fontWeight: '700' }, add: { padding: 16, borderRadius: 16, backgroundColor: '#F0E5DC' }, addText: { color: '#875F50', fontWeight: '800' }, save: { marginTop: 12, padding: 16, borderRadius: 16, backgroundColor: '#C9826A' }, saveText: { color: '#fff', fontWeight: '800', textAlign: 'center' } });
