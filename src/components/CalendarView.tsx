import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { getEntries } from "../services/wellbeingStorage";

type Props = {
  onDateSelect: (date: string) => void;
};

export default function CalendarView({ onDateSelect }: Props) {
  const [marked, setMarked] = useState<Record<string, any>>({});

  useEffect(() => {
    loadCalendar();
  }, []);

  async function loadCalendar() {
    const entries = await getEntries();
    const marks: Record<string, any> = {};

    entries.forEach(e => {
      const color = ["#ff0000","#ff6a00","#ffd000","#74d400","#1fa000"][e.mood-1];

      const dateKey = e.date.split(" ")[0]; // YYYY-MM-DD
      marks[dateKey] = {
        selected: true,
        selectedColor: color,
      };
    });

    setMarked(marks);
  }

  function disableSundaySaturdayAndFuture(dateString: string) {
    const d = new Date(dateString + "T00:00");
    const today = new Date();
    today.setHours(0,0,0,0);

    if (d.getDay() === 0 || d.getDay() === 6) return true;
    if (d > today) return true;

    return false;
  }

  return (
    <Calendar
      onDayPress={(day: DateData) => {
        if (!disableSundaySaturdayAndFuture(day.dateString)) {
          onDateSelect(day.dateString);
        }
      }}

      markedDates={marked}

      disableAllTouchEventsForDisabledDays={true}
      dayComponent={({ date }) => {
        if (!date) return null; // ⛔ PREVINE ERRO TS

        const disabled = disableSundaySaturdayAndFuture(date.dateString);
        const mark = marked[date.dateString];

        return (
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 6,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: mark?.selectedColor || "white",
              opacity: disabled ? 0.3 : 1
            }}
          >
            <Text style={{ fontWeight: "bold" }}>{date.day}</Text>
          </View>
        );
      }}
    />
  );
}
