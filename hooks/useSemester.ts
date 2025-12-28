import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

export interface SemesterInfo {
  term: string;
  year: string;
  credits: number;
  startDate?: string;
  endDate?: string;
  gpa?: string;
  updatedAt: Date;
}

const DEFAULT_SEMESTER: SemesterInfo = {
  term: "Spring",
  year: "2025",
  credits: 16,
  startDate: "March 12",
  endDate: "March 19",
  gpa: "3.84",
  updatedAt: new Date(),
};

export function useSemester() {
  const [semester, setSemester] = useLocalStorage<SemesterInfo>("dashboard-semester", DEFAULT_SEMESTER);

  const updateSemester = useCallback((updates: Partial<SemesterInfo>) => {
    setSemester(prev => ({
      ...prev,
      ...updates,
      updatedAt: new Date(),
    }));
  }, [setSemester]);

  const setSemesterInfo = useCallback((term: string, year: string, credits: number) => {
    updateSemester({ term, year, credits });
  }, [updateSemester]);

  const setGPA = useCallback((gpa: string) => {
    updateSemester({ gpa });
  }, [updateSemester]);

  const resetSemester = useCallback(() => {
    setSemester(DEFAULT_SEMESTER);
  }, [setSemester]);

  return {
    semester,
    updateSemester,
    setSemesterInfo,
    setGPA,
    resetSemester,
  };
}
