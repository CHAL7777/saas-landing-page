"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, 
  CalendarDays, 
  Flame, 
  ChevronRight, 
  Target,
  Plus,
  Edit2,
  Trash2,
  X,
  Save,
  CheckCircle2,
  Circle,
  Clock,
  GripVertical,
  TrendingUp
} from "lucide-react";
import { useStudyPlan } from "@/hooks/useStudyPlan";
import { StudyPlanStep } from "@/types/dashboard";

interface StepFormData {
  day: string;
  task: string;
  type: StudyPlanStep['type'];
  duration: string;
}

export default function StudyPlan() {
  const {
    studyPlan,
    updateStudyPlan,
    addStep,
    updateStep,
    deleteStep,
    toggleStepCompletion,
    incrementStreak,
    resetStreak,
    getProgressPercentage,
    getCompletedSteps,
    getIncompleteSteps
  } = useStudyPlan();

  const [showEditPlan, setShowEditPlan] = useState(false);
  const [showAddStep, setShowAddStep] = useState(false);
  const [editingStep, setEditingStep] = useState<StudyPlanStep | null>(null);
  const [planFormData, setPlanFormData] = useState({
    title: studyPlan.title,
    targetDate: studyPlan.targetDate,
    targetExam: studyPlan.targetExam || '',
  });
  const [stepFormData, setStepFormData] = useState<StepFormData>({
    day: '',
    task: '',
    type: 'Review',
    duration: '',
  });

  const progressPercentage = getProgressPercentage();
  const completedSteps = getCompletedSteps();
  const incompleteSteps = getIncompleteSteps();

  const resetStepForm = () => {
    setStepFormData({
      day: '',
      task: '',
      type: 'Review',
      duration: '',
    });
    setEditingStep(null);
  };

  const handleSavePlan = () => {
    updateStudyPlan(planFormData);
    setShowEditPlan(false);
  };

  const handleSubmitStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStep) {
      updateStep(editingStep.id, stepFormData);
    } else {
      addStep({
        ...stepFormData,
        completed: false,
      });
    }
    resetStepForm();
    setShowAddStep(false);
  };

  const handleEditStep = (step: StudyPlanStep) => {
    setStepFormData({
      day: step.day,
      task: step.task,
      type: step.type,
      duration: step.duration,
    });
    setEditingStep(step);
    setShowAddStep(true);
  };

  const getStepTypeColor = (type: StudyPlanStep['type']) => {
    switch (type) {
      case 'Quiz':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Active Recall':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Practice':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Focus':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default:
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-1 bg-gradient-to-b from-emerald-500/20 to-transparent rounded-[2.5rem]">
      <div className="bg-slate-950 p-8 md:p-10 rounded-[2.4rem] border border-white/5">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/20">
              <Target size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-white italic">{studyPlan.title}</h3>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
                Target: {studyPlan.targetExam} ({studyPlan.targetDate})
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Flame size={14} className="text-orange-500" /> {studyPlan.currentStreak} Day Streak
            </div>
            <button
              onClick={() => setShowEditPlan(true)}
              className="px-3 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-xl border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest transition-colors"
            >
              Edit Plan
            </button>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="mb-8 p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-bold text-white">Progress Overview</h4>
            <span className="text-sm text-slate-400">{progressPercentage}% Complete</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-black text-emerald-400">{completedSteps.length}</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest">Completed</div>
            </div>
            <div>
              <div className="text-2xl font-black text-orange-400">{incompleteSteps.length}</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest">Remaining</div>
            </div>
            <div>
              <div className="text-2xl font-black text-purple-400">{studyPlan.steps.length}</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest">Total Steps</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-bold">Study Timeline</h4>
          <button 
            onClick={() => setShowAddStep(true)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-slate-950 rounded-xl font-medium hover:bg-emerald-400 transition-colors"
          >
            <Plus size={18} />
            Add Step
          </button>
        </div>

        {/* Timeline Steps */}
        <div className="space-y-4 mb-8">
          <AnimatePresence>
            {studyPlan.steps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: i * 0.1 }}
                className="group relative flex items-center gap-6 p-5 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-emerald-500/30 rounded-2xl transition-all cursor-pointer"
              >
                {/* Completion Toggle */}
                <button
                  onClick={() => toggleStepCompletion(step.id)}
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                    step.completed 
                      ? "bg-emerald-500 border-emerald-500" 
                      : "border-slate-600 hover:border-emerald-500"
                  }`}
                >
                  {step.completed && <CheckCircle2 size={16} className="text-slate-950" />}
                </button>

                <div className="text-center min-w-[60px]">
                  <span className="block text-[10px] font-black text-slate-500 uppercase tracking-tighter">Day</span>
                  <span className="text-lg font-black text-white italic">{i + 1}</span>
                </div>

                <div className="h-10 w-px bg-white/10" />

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-md border ${getStepTypeColor(step.type)}`}>
                      {step.type}
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold italic flex items-center gap-1">
                      <Clock size={12} />
                      {step.duration}
                    </span>
                  </div>
                  <p className={`text-sm font-bold ${step.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                    {step.task}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">{step.day}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEditStep(step)}
                    className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => deleteStep(step.id)}
                    className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button className="flex-1 py-4 bg-white text-slate-950 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-xl flex items-center justify-center gap-2">
            <Brain size={18} /> Start Next Session
          </button>
          <button
            onClick={incrementStreak}
            className="px-6 py-4 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 text-orange-400 rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center gap-2"
          >
            <Flame size={18} /> +1 Day
          </button>
        </div>
      </div>

      {/* Edit Plan Modal */}
      <AnimatePresence>
        {showEditPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setShowEditPlan(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Edit Study Plan</h3>
                <button
                  onClick={() => setShowEditPlan(false)}
                  className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Plan Title</label>
                  <input
                    type="text"
                    value={planFormData.title}
                    onChange={(e) => setPlanFormData({ ...planFormData, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    placeholder="Study Plan of Attack"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Target Date</label>
                  <input
                    type="text"
                    value={planFormData.targetDate}
                    onChange={(e) => setPlanFormData({ ...planFormData, targetDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    placeholder="Oct 24"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Target Exam/Goal</label>
                  <input
                    type="text"
                    value={planFormData.targetExam}
                    onChange={(e) => setPlanFormData({ ...planFormData, targetExam: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    placeholder="Midterm Exam"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowEditPlan(false)}
                  className="flex-1 px-4 py-2 border border-white/20 text-slate-400 rounded-lg hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePlan}
                  className="flex-1 px-4 py-2 bg-emerald-500 text-slate-950 rounded-lg font-medium hover:bg-emerald-400 transition-colors flex items-center gap-2 justify-center"
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add/Edit Step Modal */}
      <AnimatePresence>
        {showAddStep && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setShowAddStep(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">
                  {editingStep ? "Edit Step" : "Add New Step"}
                </h3>
                <button
                  onClick={() => setShowAddStep(false)}
                  className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmitStep} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Day</label>
                  <input
                    type="text"
                    required
                    value={stepFormData.day}
                    onChange={(e) => setStepFormData({ ...stepFormData, day: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    placeholder="e.g., Today, Tomorrow, Monday"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Task Description</label>
                  <input
                    type="text"
                    required
                    value={stepFormData.task}
                    onChange={(e) => setStepFormData({ ...stepFormData, task: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    placeholder="Enter task description..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Step Type</label>
                  <select
                    value={stepFormData.type}
                    onChange={(e) => setStepFormData({ ...stepFormData, type: e.target.value as StudyPlanStep['type'] })}
                    className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  >
                    <option value="Review">Review</option>
                    <option value="Active Recall">Active Recall</option>
                    <option value="Quiz">Quiz</option>
                    <option value="Focus">Focus</option>
                    <option value="Practice">Practice</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Duration</label>
                  <input
                    type="text"
                    required
                    value={stepFormData.duration}
                    onChange={(e) => setStepFormData({ ...stepFormData, duration: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    placeholder="e.g., 30 min, 1 hour"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddStep(false)}
                    className="flex-1 px-4 py-2 border border-white/20 text-slate-400 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-emerald-500 text-slate-950 rounded-lg font-medium hover:bg-emerald-400 transition-colors"
                  >
                    {editingStep ? "Update Step" : "Add Step"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
