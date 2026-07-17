import { createContext, PropsWithChildren, useContext, useState } from 'react';

type RelationshipContextValue = {
  relationshipName: string;
  setRelationshipName: (name: string) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  reminderYears: number[];
  setReminderYears: (years: number[]) => void;
};

const RelationshipContext = createContext<RelationshipContextValue | undefined>(undefined);

export function RelationshipProvider({ children }: PropsWithChildren) {
  const [relationshipName, setRelationshipName] = useState('Joyce & Brian');
  const [startDate, setStartDate] = useState('2018-04-01');
  const [reminderYears, setReminderYears] = useState<number[]>([1, 3, 5]);

  return (
    <RelationshipContext.Provider value={{ relationshipName, setRelationshipName, startDate, setStartDate, reminderYears, setReminderYears }}>
      {children}
    </RelationshipContext.Provider>
  );
}

export function useRelationship() {
  const value = useContext(RelationshipContext);
  if (!value) throw new Error('useRelationship must be used within RelationshipProvider');
  return value;
}
