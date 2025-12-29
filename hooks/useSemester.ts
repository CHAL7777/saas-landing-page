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

// Empty state - no default values
const EMPTY_SEMESTER: SemesterInfo = {
  term: "",
  year: "",
  credits: 0,
  updatedAt: new Date(),
};

export function useSemester() {
  const [semester, setSemester] = useLocalStorage<SemesterInfo>("dashboard-semester", EMPTY_SEMESTER);

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
    setSemester(EMPTY_SEMESTER);
  }, [setSemester]);

  return {
    semester,
    updateSemester,
    setSemesterInfo,
    setGPA,
    resetSemester,
  };
}
