"use client";
import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { StudyPlan, StudyPlanStep, DEFAULT_STUDY_PLAN } from "@/types/dashboard";

export function useStudyPlan() {
  const [studyPlan, setStudyPlan] = useLocalStorage<StudyPlan>("dashboard-study-plan", DEFAULT_STUDY_PLAN);

  const updateStudyPlan = useCallback((updates: Partial<StudyPlan>) => {
    setStudyPlan(prev => ({
      ...prev,
      ...updates,
      updatedAt: new Date(),
    }));
  }, [setStudyPlan]);

  const addStep = useCallback((stepData: Omit<StudyPlanStep, "id" | "createdAt" | "updatedAt">) => {
    const newStep: StudyPlanStep = {
      ...stepData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setStudyPlan(prev => ({
      ...prev,
      steps: [...prev.steps, newStep],
      updatedAt: new Date(),
    }));
    return newStep;
  }, [setStudyPlan]);

  const updateStep = useCallback((stepId: string, updates: Partial<Omit<StudyPlanStep, "id" | "createdAt" | "updatedAt">>) => {
    setStudyPlan(prev => ({
      ...prev,
      steps: prev.steps.map(step => 
        step.id === stepId 
          ? { ...step, ...updates, updatedAt: new Date() }
          : step
      ),
      updatedAt: new Date(),
    }));
  }, [setStudyPlan]);

  const deleteStep = useCallback((stepId: string) => {
    setStudyPlan(prev => ({
      ...prev,
      steps: prev.steps.filter(step => step.id !== stepId),
      updatedAt: new Date(),
    }));
  }, [setStudyPlan]);

  const toggleStepCompletion = useCallback((stepId: string) => {
    setStudyPlan(prev => ({
      ...prev,
      steps: prev.steps.map(step => 
        step.id === stepId 
          ? { ...step, completed: !step.completed, updatedAt: new Date() }
          : step
      ),
      updatedAt: new Date(),
    }));
  }, [setStudyPlan]);

  const incrementStreak = useCallback(() => {
    setStudyPlan(prev => ({
      ...prev,
      currentStreak: prev.currentStreak + 1,
      updatedAt: new Date(),
    }));
  }, [setStudyPlan]);

  const resetStreak = useCallback(() => {
    setStudyPlan(prev => ({
      ...prev,
      currentStreak: 0,
      updatedAt: new Date(),
    }));
  }, [setStudyPlan]);

  const reorderSteps = useCallback((startIndex: number, endIndex: number) => {
    setStudyPlan(prev => {
      const result = Array.from(prev.steps);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return {
        ...prev,
        steps: result,
        updatedAt: new Date(),
      };
    });
  }, [setStudyPlan]);

  const resetStudyPlan = useCallback(() => {
    setStudyPlan(DEFAULT_STUDY_PLAN);
  }, [setStudyPlan]);

  const getCompletedSteps = useCallback(() => {
    return studyPlan.steps.filter(step => step.completed);
  }, [studyPlan.steps]);

  const getIncompleteSteps = useCallback(() => {
    return studyPlan.steps.filter(step => !step.completed);
  }, [studyPlan.steps]);

  const getProgressPercentage = useCallback(() => {
    return studyPlan.steps.length > 0 ? Math.round((getCompletedSteps().length / studyPlan.steps.length) * 100) : 0;
  }, [studyPlan.steps, getCompletedSteps]);

  const getStepsByType = useCallback((type: StudyPlanStep['type']) => {
    return studyPlan.steps.filter(step => step.type === type);
  }, [studyPlan.steps]);

  return {
    studyPlan,
    updateStudyPlan,
    addStep,
    updateStep,
    deleteStep,
    toggleStepCompletion,
    incrementStreak,
    resetStreak,
    reorderSteps,
    resetStudyPlan,
    getCompletedSteps,
    getIncompleteSteps,
    getProgressPercentage,
    getStepsByType,
  };
}
