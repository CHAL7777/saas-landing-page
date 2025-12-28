// Data types for the customizable dashboard

export interface Task {
  id: string;
  title: string;
  course: string;
  due: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserStats {
  currentGPA: string;
  studyStreak: number;
  tasksCompleted: number;
  totalTasks: number;
  nextGoal: string;
  goalStatus: string;
  updatedAt: Date;
}

export interface Event {
  id: string;
  title: string;
  time: string;
  date: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  name: string;
  academicLevel: string;
  major: string;
  university: string;
  updatedAt: Date;
}

export interface StudyPlanStep {
  id: string;
  day: string;
  task: string;
  type: 'Review' | 'Active Recall' | 'Quiz' | 'Focus' | 'Practice';
  duration: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudyPlan {
  id: string;
  title: string;
  targetDate: string;
  targetExam?: string;
  currentStreak: number;
  steps: StudyPlanStep[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SemesterInfo {
  term: string;
  year: string;
  credits: number;
  startDate?: string;
  endDate?: string;
  gpa?: string;
  updatedAt: Date;
}

export interface DashboardSettings {
  theme: 'dark' | 'light';
  defaultView: string;
  notifications: boolean;
  autoSave: boolean;
  browserNotifications: boolean;
  reminderTime: number; // minutes before due date
  emailNotifications: boolean;
  soundEnabled: boolean;
  updatedAt: Date;
}

export interface Reminder {
  id: string;
  title: string;
  message: string;
  type: 'task' | 'event' | 'custom';
  relatedId?: string; // taskId or eventId if related
  scheduledTime: Date;
  isRead: boolean;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'reminder' | 'alert' | 'info';
  isRead: boolean;
  actionUrl?: string;
  actionText?: string;
  createdAt: Date;
}

export interface DashboardPreviewCourse {
  name: string;
  code: string;
  progress: number;
  nextDeadline: string;
  status: 'good' | 'warning' | 'urgent';
  color: string;
}

export interface DashboardPreviewProps {
  courses?: DashboardPreviewCourse[];
  semester?: {
    term: string;
    year: string;
    credits: number;
  };
  gpa?: string;
  streak?: number;
  timeline?: {
    startDate: string;
    endDate: string;
    days?: number[];
  };
  theme?: {
    primary?: string;
    accent?: string;
    background?: string;
  };
  useRealData?: boolean;
}

// Default data
export const DEFAULT_TASKS: Task[] = [
  {
    id: '1',
    title: 'Complete Math Assignment',
    course: 'Calculus II',
    due: '2 hours',
    priority: 'high',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Read Chapter 5',
    course: 'Physics',
    due: '1 day',
    priority: 'medium',
    completed: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'Prepare for Quiz',
    course: 'Chemistry',
    due: '3 days',
    priority: 'high',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    title: 'Group Project Meeting',
    course: 'Computer Science',
    due: 'Tomorrow',
    priority: 'low',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const DEFAULT_STATS: UserStats = {
  currentGPA: '3.84',
  studyStreak: 12,
  tasksCompleted: 24,
  totalTasks: 30,
  nextGoal: "Dean's List",
  goalStatus: 'On Track',
  updatedAt: new Date(),
};

export const DEFAULT_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Math Exam',
    time: '10:00 AM',
    date: 'Tomorrow',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Study Group',
    time: '3:00 PM',
    date: 'Friday',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'Lab Session',
    time: '2:00 PM',
    date: 'Monday',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const DEFAULT_PROFILE: UserProfile = {
  name: 'Student',
  academicLevel: 'Undergraduate',
  major: 'Computer Science',
  university: 'Your University',
  updatedAt: new Date(),
};

export const DEFAULT_STUDY_PLAN: StudyPlan = {
  id: '1',
  title: 'Study Plan of Attack',
  targetDate: 'Oct 24',
  targetExam: 'Midterm Exam',
  currentStreak: 4,
  steps: [
    {
      id: '1',
      day: 'Today',
      task: 'Review Syllabus & Chapter 1 notes',
      type: 'Review',
      duration: '20 min',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      day: 'Tomorrow',
      task: 'Flashcards: Core Concepts',
      type: 'Active Recall',
      duration: '30 min',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      day: 'Wednesday',
      task: 'Practice Quiz: Modules 1-2',
      type: 'Quiz',
      duration: '45 min',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '4',
      day: 'Thursday',
      task: 'Deep Dive: Problem Areas',
      type: 'Focus',
      duration: '60 min',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const DEFAULT_SETTINGS: DashboardSettings = {
  theme: 'dark',
  defaultView: 'overview',
  notifications: true,
  autoSave: true,
  browserNotifications: true,
  reminderTime: 15, // 15 minutes before
  emailNotifications: false,
  soundEnabled: true,
  updatedAt: new Date(),
};
