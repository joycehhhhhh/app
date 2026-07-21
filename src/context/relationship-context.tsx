import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = '@mymory/relationship-spaces/v10';
const JOYCE_BRIAN_TEST_PHOTO_REMOVAL_KEY = '@mymory/joyce-brian-test-photo-removed/v1';
const BRIAN_CHECKIN_UPDATE_KEY = '@mymory/brian-checkin-very-good/v1';
const CHECKIN_MOOD_NORMALIZATION_KEY = '@mymory/checkin-moods-normalized/v1';
const GRANDPARENTS_RIP_UPDATE_KEY = '@mymory/grandparents-rip-checkins/v1';

export type Memory = { id: string; title: string; body: string; createdAt: string; photoUri?: string; coverEmoji?: string };
export type CheckIn = { id: string; person: string; mood: string; emoji: string; note: string; createdAt: string };
export type FutureEvent = { id: string; title: string; note: string; date: string };
export type Relationship = { id: string; name: string; startDate: string; members: string; memorialMembers?: string[]; reminderYears: number[]; memories: Memory[]; checkIns: CheckIn[]; futureEvents: FutureEvent[] };
type PersistedState = { relationships: Relationship[]; activeRelationshipId: string };

const memory = (id: string, title: string, body: string, createdAt: string, coverEmoji: string): Memory => ({ id, title, body, createdAt, coverEmoji });
const checkIn = (id: string, person: string, mood: string, emoji: string, note: string, createdAt: string): CheckIn => ({ id, person, mood, emoji, note, createdAt });

const initialRelationships: Relationship[] = [
  { id: 'mila', name: 'Baby Mila', members: 'Mommy, Daddy & Baby Mila', startDate: '2026-02-10', reminderYears: [1, 3, 5], futureEvents: [{ id: 'mila-arrival', title: 'Meet Baby Mila', note: 'A quiet welcome home with the people who already love her.', date: '2026-11-10' }], checkIns: [checkIn('mila-miss', 'Mommy', 'Hopeful', '🤍', 'Hi Mila, we heard your heartbeat today. We already miss meeting you.', '2026-07-18T16:00:00.000Z')], memories: [memory('mila-positive', 'Two pink lines', 'The morning we learned our family was growing. We sat together in the kitchen, stunned and smiling.', '2026-02-10T17:00:00.000Z', '✨'), memory('mila-first-scan', 'First ultrasound', 'A tiny flicker on the screen, and suddenly you felt so real. Your first little portrait.', '2026-03-24T18:00:00.000Z', '🩻'), memory('mila-heartbeat', 'Your heartbeat log', '160 beats per minute. Daddy held Mommy’s hand while we listened to your very busy heart.', '2026-04-21T18:00:00.000Z', '💓'), memory('mila-name', 'We chose your name', 'Mila. Gentle, bright, and already full of love. We said it out loud all the way home.', '2026-06-06T18:00:00.000Z', '🌷'), memory('mila-nursery', 'A corner waiting for you', 'We folded your first tiny clothes and imagined the stories we will tell you here.', '2026-07-12T18:00:00.000Z', '🧸')] },
  { id: 'joyce-brian', name: 'Joyce & Brian', members: 'Joyce & Brian', startDate: '2013-09-03', reminderYears: [1, 3, 5], futureEvents: [{ id: 'baby-moon', title: 'A quiet babymoon weekend', note: 'One slow weekend together before Mila arrives.', date: '2026-08-27' }], checkIns: [checkIn('brian-work', 'Brian', 'Not feeling well', '😔', 'My manager made today harder than it needed to be. I am ready for a quiet evening.', '2026-07-17T20:00:00.000Z'), checkIn('joyce-grateful', 'Joyce', 'Great', '😊', 'Feeling grateful for our little routines and this growing family.', '2026-07-16T20:00:00.000Z')], memories: [memory('jb-met', 'The first day we met', 'A college orientation conversation that lasted through lunch. Neither of us wanted to leave.', '2013-09-03T18:00:00.000Z', '🎓'), memory('jb-library', 'Library study dates', 'We pretended to study, then shared snacks and made each other laugh too loudly.', '2014-02-14T18:00:00.000Z', '📚'), memory('jb-graduation', 'Graduation day', 'Two caps in the air and a promise to keep choosing each other through every next chapter.', '2017-05-21T18:00:00.000Z', '🎓'), memory('jb-wedding', 'We said yes', 'Family, happy tears, and a dance floor that stayed full until the very last song.', '2021-10-09T18:00:00.000Z', '💍'), memory('jb-mila', 'Waiting for Mila together', 'Our hands on Mommy’s belly after the ultrasound. We cannot wait to introduce you to our girl.', '2026-07-12T18:00:00.000Z', '🤍')] },
  { id: 'huang-family', name: 'My family', members: 'Mom, Dad, Joyce & Brian', startDate: '1995-02-02', reminderYears: [1, 3, 5], futureEvents: [], checkIns: [checkIn('family-love', 'Joyce', 'Great', '😊', 'Feeling lucky to have a family that keeps cheering for every new chapter.', '2026-07-15T20:00:00.000Z')], memories: [memory('family-born', 'Welcome home, Joyce', 'February 2, 1995. Mom and Dad brought me home and our family became three.', '1995-02-02T18:00:00.000Z', '👶'), memory('family-kindergarten', 'First day of kindergarten', 'My backpack looked enormous. Mom took a photo while Dad promised to wait right outside.', '2000-09-01T18:00:00.000Z', '🎒'), memory('family-elementary', 'Elementary school concert', 'I found Mom and Dad in the crowd and sang my whole song directly to them.', '2005-05-20T18:00:00.000Z', '🎵'), memory('family-trip', 'Summer family trip', 'A long road trip, too many snacks, and the same favorite songs on repeat.', '2010-07-18T18:00:00.000Z', '🚗'), memory('family-married', 'Brian joined the family', 'At our wedding table, Mom and Dad welcomed Brian with a hug that made everyone cry.', '2021-10-09T18:00:00.000Z', '🏡')] },
  { id: 'grandparents', name: 'Grandma & Grandpa', members: 'Grandma, Grandpa & Joyce', startDate: '1995-02-02', reminderYears: [1, 3, 5], futureEvents: [{ id: 'tomb-visit', title: 'Autumn remembrance visit', note: 'Bring their favorite flowers and tell them about Mila.', date: '2026-10-01' }], checkIns: [checkIn('grandparents-miss', 'Joyce', 'Missing you', '🕊️', 'Hi Grandma and Grandpa, I miss you today. I will tell Mila about your summer dumplings.', '2026-07-18T09:00:00.000Z')], memories: [memory('gp-baby', 'My first summer with you', 'I was tiny, and you carried me through the garden while everyone laughed at my serious little face.', '1996-07-14T18:00:00.000Z', '🌼'), memory('gp-newyear', 'Lunar New Year together', 'Red envelopes, warm soup, and Grandpa telling the same funny story that we all knew by heart.', '2003-02-01T18:00:00.000Z', '🧧'), memory('gp-summer', 'Every summer visit', 'The train ride, Grandma’s cooking, and evenings on the porch became the shape of childhood.', '2008-07-20T18:00:00.000Z', '🌙'), memory('gp-goodbye-grandma', 'Remembering Grandma', 'In high school, I learned that love does not leave. We carried her stories home with us.', '2011-11-05T18:00:00.000Z', '🤍'), memory('gp-goodbye-grandpa', 'Remembering Grandpa', 'During graduate school, we said goodbye. I still hear his gentle voice whenever I need courage.', '2018-03-12T18:00:00.000Z', '🕯️'), memory('gp-visit', 'A visit and a hello', 'I brought flowers to your resting place and told you about the life still unfolding.', '2026-04-05T18:00:00.000Z', '💐')] },
];

const flashbackMemories: Record<string, Memory[]> = {
  mila: [
    memory('mila-2025', 'A wish for you', 'Before we knew your name, we were already imagining the little person we hoped to meet one day.', '2025-07-19T18:00:00.000Z', '✨'),
    memory('mila-2023', 'A family promise', 'We talked about the family we wanted to build: gentle mornings, loud laughter, and room for every feeling.', '2023-07-19T18:00:00.000Z', '🌙'),
    memory('mila-2021', 'The beginning of us', 'A quiet note we wrote to our future family, full of hope for all the days still ahead.', '2021-07-19T18:00:00.000Z', '🤍'),
  ],
  'joyce-brian': [
    memory('jb-2025', 'Our favorite rainy Sunday', 'Coffee in bed, a slow walk, and the feeling that ordinary days are our favorite kind.', '2025-07-19T18:00:00.000Z', '☔'),
    memory('jb-2023', 'A small anniversary dinner', 'We toasted all the versions of us that made it here, then ordered dessert twice.', '2023-07-19T18:00:00.000Z', '🥂'),
    memory('jb-2021', 'Our first home together', 'We unpacked the last box, ate takeout on the floor, and called it perfect.', '2021-07-19T18:00:00.000Z', '🔑'),
  ],
  'huang-family': [
    memory('family-2025', 'Mom’s birthday dinner', 'Everyone crowded around the table and Dad insisted on taking one more family photo.', '2025-07-19T18:00:00.000Z', '🎂'),
    memory('family-2023', 'A summer weekend at home', 'Mom packed snacks, Dad drove, and we spent the day talking like no time had passed.', '2023-07-19T18:00:00.000Z', '🌿'),
    memory('family-2021', 'The wedding welcome', 'Brian became part of the family with hugs, happy tears, and a very full dinner table.', '2021-07-19T18:00:00.000Z', '💐'),
  ],
  grandparents: [
    memory('gp-2025', 'A letter to Grandma and Grandpa', 'I wrote down the little things I wished I could tell you, then kept the letter close.', '2025-07-19T18:00:00.000Z', '✉️'),
    memory('gp-2023', 'Lunar New Year remembrance', 'I made your favorite dish and shared your stories at the table so you were with us.', '2023-07-19T18:00:00.000Z', '🧧'),
    memory('gp-2021', 'Summer flowers for you', 'I brought fresh flowers and sat quietly, remembering every summer porch conversation.', '2021-07-19T18:00:00.000Z', '💐'),
  ],
};

initialRelationships.forEach((relationship) => relationship.memories.push(...(flashbackMemories[relationship.id] ?? [])));

const memberCheckIns: Record<string, CheckIn[]> = {
  mila: [
    checkIn('mila-daddy-checkin', 'Daddy', 'Hopeful', '😊', 'Feeling amazed by every new milestone as we wait for you.', '2026-07-18T18:00:00.000Z'),
    checkIn('mila-baby-checkin', 'Baby Mila', 'Growing', '🌱', 'Growing safely and getting stronger every day.', '2026-07-18T08:00:00.000Z'),
  ],
  'huang-family': [
    checkIn('family-mom-checkin', 'Mom', 'Great', '😊', 'Feeling happy and excited for our growing family.', '2026-07-18T17:00:00.000Z'),
    checkIn('family-dad-checkin', 'Dad', 'Okay', '🙂', 'A calm day, looking forward to dinner together.', '2026-07-18T16:00:00.000Z'),
    checkIn('family-brian-checkin', 'Brian', 'Great', '😊', 'Feeling grateful to be part of this family.', '2026-07-18T15:00:00.000Z'),
  ],
  grandparents: [
    checkIn('grandma-checkin', 'Grandma', 'Remembered', '🌼', 'Her warmth and cooking are close in our hearts today.', '2026-07-18T12:00:00.000Z'),
    checkIn('grandpa-checkin', 'Grandpa', 'Remembered', '🕊️', 'His stories and gentle encouragement stay with us.', '2026-07-18T11:00:00.000Z'),
  ],
};

initialRelationships.forEach((relationship) => relationship.checkIns.push(...(memberCheckIns[relationship.id] ?? [])));

const memberLabels: Record<string, string> = {
  'mila': 'Mommy (Joyce), Daddy (Brian) & Baby Mila',
  'huang-family': 'Dad (James), Mom (Sarah) & Joyce',
};

const renamedMembers: Record<string, string> = { Mommy: 'Joyce', Daddy: 'Brian', Mom: 'Sarah', Dad: 'James' };

initialRelationships.forEach((relationship) => {
  relationship.members = memberLabels[relationship.id] ?? relationship.members;
  relationship.checkIns.forEach((entry) => { entry.person = renamedMembers[entry.person] ?? entry.person; });
});

initialRelationships.forEach((relationship) => { relationship.reminderYears = [1, 3, 5]; });

function normalizeRelationship(relationship: Partial<Relationship>): Relationship {
  const seed = initialRelationships.find((item) => item.id === relationship.id);
  const restoredCheckIns = relationship.checkIns ?? [];
  const missingSeedCheckIns = (seed?.checkIns ?? []).filter((checkIn) => !restoredCheckIns.some((restored) => restored.person === checkIn.person));
  const restoredMemories = relationship.memories ?? [];
  const missingSeedMemories = (seed?.memories ?? []).filter((memory) => !restoredMemories.some((restored) => restored.id === memory.id));
  return {
    id: relationship.id ?? `relationship-${Date.now()}`,
    name: relationship.name ?? '',
    members: memberLabels[relationship.id] ?? relationship.members ?? seed?.members ?? '',
    memorialMembers: relationship.memorialMembers ?? [],
    startDate: relationship.startDate ?? '',
    reminderYears: (relationship.reminderYears ?? [1, 3, 5]).filter((year) => [1, 3, 5].includes(year)),
    memories: [...restoredMemories, ...missingSeedMemories],
    checkIns: [...restoredCheckIns, ...missingSeedCheckIns],
    futureEvents: relationship.futureEvents ?? [],
  };
}

type RelationshipContextValue = { relationships: Relationship[]; activeRelationship: Relationship; selectRelationship: (id: string) => void; addRelationship: (draft?: Pick<Relationship, 'name' | 'members' | 'memorialMembers' | 'startDate'>) => void; relationshipName: string; setRelationshipName: (name: string) => void; members: string; setMembers: (members: string) => void; startDate: string; setStartDate: (date: string) => void; reminderYears: number[]; setReminderYears: (years: number[]) => void; addMemory: (memory: Omit<Memory, 'id' | 'createdAt'>) => void; addCheckIn: (checkIn: Omit<CheckIn, 'id' | 'createdAt' | 'person'>) => void; addFutureEvent: (event: Omit<FutureEvent, 'id'>) => void };
const RelationshipContext = createContext<RelationshipContextValue | undefined>(undefined);

export function RelationshipProvider({ children }: PropsWithChildren) {
  const [relationships, setRelationships] = useState(initialRelationships); const [activeRelationshipId, setActiveRelationshipId] = useState(initialRelationships[0].id); const [hasLoaded, setHasLoaded] = useState(false);
  useEffect(() => { AsyncStorage.getItem(STORAGE_KEY).then((stored) => { if (!stored) return; const parsed = JSON.parse(stored) as PersistedState; if (parsed.relationships?.length && parsed.activeRelationshipId) { const restored = parsed.relationships.map(normalizeRelationship).filter((relationship) => relationship.name.trim().length > 0); if (restored.length) { setRelationships(restored); setActiveRelationshipId(restored.some((relationship) => relationship.id === parsed.activeRelationshipId) ? parsed.activeRelationshipId : restored[0].id); } } }).catch(() => undefined).finally(() => setHasLoaded(true)); }, []);
  useEffect(() => { if (hasLoaded) AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ relationships, activeRelationshipId })).catch(() => undefined); }, [activeRelationshipId, hasLoaded, relationships]);
  useEffect(() => { if (!hasLoaded) return; AsyncStorage.getItem(JOYCE_BRIAN_TEST_PHOTO_REMOVAL_KEY).then((completed) => { if (completed) return; setRelationships((current) => current.map((relationship) => { if (relationship.id !== 'joyce-brian') return relationship; const testPhoto = [...relationship.memories].filter((memory) => memory.photoUri).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]; return testPhoto ? { ...relationship, memories: relationship.memories.filter((memory) => memory.id !== testPhoto.id) } : relationship; })); return AsyncStorage.setItem(JOYCE_BRIAN_TEST_PHOTO_REMOVAL_KEY, 'true'); }).catch(() => undefined); }, [hasLoaded]);
  useEffect(() => { if (!hasLoaded) return; AsyncStorage.getItem(BRIAN_CHECKIN_UPDATE_KEY).then((completed) => { if (completed) return; setRelationships((current) => current.map((relationship) => relationship.id === 'joyce-brian' ? { ...relationship, checkIns: relationship.checkIns.map((checkIn) => checkIn.person === 'Brian' ? { ...checkIn, mood: 'Very good', emoji: '🤩', note: 'Feeling energized and grateful for our growing family.' } : checkIn) } : relationship)); return AsyncStorage.setItem(BRIAN_CHECKIN_UPDATE_KEY, 'true'); }).catch(() => undefined); }, [hasLoaded]);
  useEffect(() => { if (!hasLoaded) return; AsyncStorage.getItem(CHECKIN_MOOD_NORMALIZATION_KEY).then((completed) => { if (completed) return; setRelationships((current) => current.map((relationship) => { if (relationship.id === 'joyce-brian') return { ...relationship, checkIns: relationship.checkIns.map((checkIn) => checkIn.person === 'Brian' ? { ...checkIn, mood: 'Great', emoji: '😊', note: 'Feeling energized and grateful for our growing family.' } : checkIn) }; if (relationship.id === 'mila') return { ...relationship, checkIns: relationship.checkIns.map((checkIn) => (checkIn.person === 'Joyce' || checkIn.person === 'Mommy') ? { ...checkIn, mood: 'Great', emoji: '😊' } : (checkIn.person === 'Brian' || checkIn.person === 'Daddy') ? { ...checkIn, mood: 'Okay', emoji: '🙂' } : checkIn) }; if (relationship.id === 'grandparents') return { ...relationship, checkIns: relationship.checkIns.map((checkIn) => checkIn.person === 'Grandma' || checkIn.person === 'Grandpa' ? { ...checkIn, mood: 'Okay', emoji: '🕊️ 🕊️' } : checkIn.person === 'Joyce' ? { ...checkIn, mood: 'Okay', emoji: '🙂' } : checkIn) }; return relationship; })); return AsyncStorage.setItem(CHECKIN_MOOD_NORMALIZATION_KEY, 'true'); }).catch(() => undefined); }, [hasLoaded]);
  useEffect(() => { if (!hasLoaded) return; AsyncStorage.getItem(GRANDPARENTS_RIP_UPDATE_KEY).then((completed) => { if (completed) return; setRelationships((current) => current.map((relationship) => relationship.id === 'grandparents' ? { ...relationship, checkIns: relationship.checkIns.map((checkIn) => checkIn.person === 'Grandma' || checkIn.person === 'Grandpa' ? { ...checkIn, mood: 'RIP', emoji: '🕊️' } : checkIn) } : relationship)); return AsyncStorage.setItem(GRANDPARENTS_RIP_UPDATE_KEY, 'true'); }).catch(() => undefined); }, [hasLoaded]);
  const activeRelationship = relationships.find((relationship) => relationship.id === activeRelationshipId) ?? relationships[0];
  const updateActive = (update: (relationship: Relationship) => Relationship) => setRelationships((current) => current.map((relationship) => relationship.id === activeRelationship.id ? update(relationship) : relationship));
  const value = useMemo<RelationshipContextValue>(() => ({ relationships, activeRelationship, selectRelationship: setActiveRelationshipId, addRelationship: (draft) => { const id = `relationship-${Date.now()}`; setRelationships((current) => [...current, { id, name: draft?.name ?? '', members: draft?.members ?? '', memorialMembers: draft?.memorialMembers ?? [], startDate: draft?.startDate ?? '', reminderYears: [1, 3, 5], memories: [], checkIns: [], futureEvents: [] }]); setActiveRelationshipId(id); }, relationshipName: activeRelationship.name, setRelationshipName: (name) => updateActive((relationship) => ({ ...relationship, name })), members: activeRelationship.members, setMembers: (members) => updateActive((relationship) => ({ ...relationship, members })), startDate: activeRelationship.startDate, setStartDate: (date) => updateActive((relationship) => ({ ...relationship, startDate: date })), reminderYears: activeRelationship.reminderYears, setReminderYears: (years) => updateActive((relationship) => ({ ...relationship, reminderYears: years })), addMemory: (newMemory) => updateActive((relationship) => ({ ...relationship, memories: [...relationship.memories, { ...newMemory, id: `memory-${Date.now()}`, createdAt: new Date().toISOString() }] })), addCheckIn: (newCheckIn) => updateActive((relationship) => ({ ...relationship, checkIns: [...relationship.checkIns, { ...newCheckIn, person: 'Joyce', id: `checkin-${Date.now()}`, createdAt: new Date().toISOString() }] })), addFutureEvent: (event) => updateActive((relationship) => ({ ...relationship, futureEvents: [...relationship.futureEvents, { ...event, id: `event-${Date.now()}` }] })) }), [activeRelationship, relationships]);
  return <RelationshipContext.Provider value={value}>{children}</RelationshipContext.Provider>;
}
export function useRelationship() { const value = useContext(RelationshipContext); if (!value) throw new Error('useRelationship must be used within RelationshipProvider'); return value; }
