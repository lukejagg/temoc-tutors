import { ChangeEvent, FormEvent, useState } from "react";
import { StudentCreationRequest } from "../../database/types";
import { createStudent } from "../../hooks/databaseOperations";
import SampleCalendarApp from "../../components/calendar/calendar";

export const PlaceholderCalendar: React.FC = () => {
  const customEvents = [
    {
      title: "Custom Event 1",
      start: "2023-03-01",
      end: "2023-03-03",
    },
    {
      title: "Custom Event 2",
      start: "2023-03-07",
      end: "2023-03-09",
    },
  ];

  return <SampleCalendarApp events={customEvents} />;
};
