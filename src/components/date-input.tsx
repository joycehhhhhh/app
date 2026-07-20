import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

type DateInputProps = { value: string; onChange: (value: string) => void };
const toLocalDate = (value: string) => { const [year, month, day] = value.split('-').map(Number); return new Date(year || new Date().getFullYear(), (month || 1) - 1, day || 1); };
const toDateString = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

export function DateInput({ value, onChange }: DateInputProps) {
  const [isOpen, setIsOpen] = useState(false); const [draft, setDraft] = useState(toLocalDate(value)); const selectedDate = toLocalDate(value);
  const open = () => { setDraft(selectedDate); setIsOpen(true); };
  const select = (_: unknown, date?: Date) => { if (Platform.OS === 'android') setIsOpen(false); if (date) { setDraft(date); if (Platform.OS === 'android') onChange(toDateString(date)); } };
  return <View><Pressable accessibilityRole="button" accessibilityLabel="Choose relationship start date" onPress={open} style={s.control}><Text selectable style={s.date}>{selectedDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</Text><Text style={s.icon}>Change</Text></Pressable>{Platform.OS === 'ios' ? <Modal visible={isOpen} transparent animationType="slide"><View style={s.backdrop}><View style={s.sheet}><View style={s.sheetHeader}><Pressable onPress={() => setIsOpen(false)}><Text style={s.cancel}>Cancel</Text></Pressable><Text style={s.sheetTitle}>Start date</Text><Pressable onPress={() => { onChange(toDateString(draft)); setIsOpen(false); }}><Text style={s.done}>Done</Text></Pressable></View><DateTimePicker value={draft} mode="date" display="spinner" themeVariant="light" maximumDate={new Date()} onChange={select} /></View></View></Modal> : isOpen && <DateTimePicker value={draft} mode="date" display="default" maximumDate={new Date()} onChange={select} />}</View>;
}
const s=StyleSheet.create({control:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingVertical:7},date:{color:'#493B33',fontSize:17,fontWeight:'700'},icon:{color:'#A17460',fontSize:13,fontWeight:'800'},backdrop:{flex:1,justifyContent:'flex-end',backgroundColor:'rgba(0,0,0,.28)'},sheet:{paddingBottom:26,borderTopLeftRadius:25,borderTopRightRadius:25,backgroundColor:'#FBF7F1'},sheetHeader:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:20},sheetTitle:{color:'#493B33',fontSize:17,fontWeight:'800'},cancel:{color:'#88766B',fontSize:16},done:{color:'#A26351',fontSize:16,fontWeight:'800'}});
