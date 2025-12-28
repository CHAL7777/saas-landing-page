"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  CheckCircle2,
  Circle,
  Calendar,
  BookOpen,
  X
} from "lucide-react";
import { useTasks } from "@/hooks/useTasks";
import { Task } from "@/types/dashboard";

interface TaskFormData {
  title: string;
  course: string;
  due: string;
  priority: 'high' | 'medium' | 'low';
}

export default function TaskManager() {
  const { tasks, addTask, updateTask, deleteTask, toggleTaskCompletion } = useTasks();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    course: "",
    due: "",
    priority: "medium",
  });

  const resetForm = () => {
    setFormData({
      title: "",
      course: "",
      due: "",
      priority: "medium",
    });
    setEditingTask(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTask) {
      updateTask(editingTask.id, formData);
    } else {
      addTask({
        ...formData,
        completed: false,
      });
    }
    resetForm();
    setShowAddModal(false);
  };

  const handleEdit = (task: Task) => {
    setFormData({
      title: task.title,
      course: task.course,
      due: task.due,
      priority: task.priority,
    });
    setEditingTask(task);
    setShowAddModal(true);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'completed' && task.completed) ||
                         (filterStatus === 'incomplete' && !task.completed);
    
    return matchesSearch && matchesPriority && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Tasks</h2>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-slate-950 rounded-xl font-medium hover:bg-emerald-400 transition-colors"
        >
          <Plus size={18} />
          Add Task
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Search tasks or courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          />
        </div>
        
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="px-4 py-2 bg-slate-900/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
        >
          <option value="all">All Priorities</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 bg-slate-900/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
        >
          <option value="all">All Tasks</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>

      {/* Task List */}
      <div className="grid gap-4">
        <AnimatePresence>
          {filteredTasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => toggleTaskCompletion(task.id)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    task.completed 
                      ? "bg-emerald-500 border-emerald-500" 
                      : "border-slate-600 hover:border-emerald-500"
                  }`}
                >
                  {task.completed && <CheckCircle2 size={14} className="text-slate-950" />}
                </button>
                
                <div className="flex-1">
                  <h3 className={`font-medium ${task.completed ? "line-through text-slate-500" : ""}`}>
                    {task.title}
                  </h3>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <BookOpen size={12} />
                      {task.course}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Calendar size={12} />
                      {task.due}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    task.priority === "high" ? "bg-red-500/20 text-red-400" :
                    task.priority === "medium" ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-blue-500/20 text-blue-400"
                  }`}>
                    {task.priority}
                  </span>
                  
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(task)}
                      className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white transition-colors"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add/Edit Task Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">
                  {editingTask ? "Edit Task" : "Add New Task"}
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    Task Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    placeholder="Enter task title..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    Course
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    placeholder="Enter course name..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    Due Date
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.due}
                    onChange={(e) => setFormData({ ...formData, due: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    placeholder="e.g., Tomorrow, 2 hours, 3 days"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'high' | 'medium' | 'low' })}
                    className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2 border border-white/20 text-slate-400 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-emerald-500 text-slate-950 rounded-lg font-medium hover:bg-emerald-400 transition-colors"
                  >
                    {editingTask ? "Update Task" : "Add Task"}
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
