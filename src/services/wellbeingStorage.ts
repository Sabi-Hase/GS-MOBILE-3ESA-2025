import AsyncStorage from "@react-native-async-storage/async-storage";

export type MoodValue = 1 | 2 | 3 | 4 | 5;

export interface WellbeingEntry {
  id: number;
  mood: MoodValue;
  notes?: string;
  date: string; // YYYY-MM-DD
}

const ENTRIES_KEY = "WORKWELL_ENTRIES";

/* ---------------- basic helpers ---------------- */

async function readAll(): Promise<WellbeingEntry[]> {
  const raw = await AsyncStorage.getItem(ENTRIES_KEY);
  return raw ? JSON.parse(raw) : [];
}

async function writeAll(list: WellbeingEntry[]) {
  await AsyncStorage.setItem(ENTRIES_KEY, JSON.stringify(list));
}

/* ---------------- exported API ---------------- */

export async function getEntries(): Promise<WellbeingEntry[]> {
  const list = await readAll();
  return list;
}

export async function saveEntry(entry: WellbeingEntry): Promise<void> {
  const list = await readAll();
  list.push(entry);
  await writeAll(list);
}

export async function updateEntry(entry: WellbeingEntry): Promise<void> {
  const list = await readAll();
  const idx = list.findIndex((e) => e.id === entry.id);
  if (idx >= 0) {
    list[idx] = entry;
    await writeAll(list);
  } else {
    // fallback: append
    list.push(entry);
    await writeAll(list);
  }
}

export async function deleteEntry(entryId: number): Promise<void> {
  const list = await readAll();
  const filtered = list.filter((e) => e.id !== entryId);
  await writeAll(filtered);
}

export async function getWeeklyAverage(): Promise<number | null> {
  const entries = await readAll();
  const now = new Date();
  const weekEntries = entries.filter((e) => {
    const d = new Date(e.date);
    const diffDays = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
    const day = d.getDay();
    // keep last 7 days including today, exclude weekends
    return diffDays >= 0 && diffDays <= 7 && day !== 0 && day !== 6;
  });
  if (weekEntries.length === 0) return null;
  const avg = weekEntries.reduce((s, x) => s + x.mood, 0) / weekEntries.length;
  return avg;
}

export async function getMonthlyAverage(): Promise<number | null> {
  const entries = await readAll();
  const now = new Date();
  const monthEntries = entries.filter((e) => {
    const d = new Date(e.date);
    const day = d.getDay();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear() && day !== 0 && day !== 6;
  });
  if (monthEntries.length === 0) return null;
  const avg = monthEntries.reduce((s, x) => s + x.mood, 0) / monthEntries.length;
  return avg;
}
