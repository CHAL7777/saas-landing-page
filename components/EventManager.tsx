"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Search, 
  Calendar, 
  Clock,
  Edit2, 
  Trash2, 
  X,
  CalendarDays,
  GripVertical
} from "lucide-react";
import { useEvents } from "@/hooks/useEvents";
import { Event } from "@/types/dashboard";

interface EventFormData {
  title: string;
  time: string;
  date: string;
  description?: string;
}

export default function EventManager() {
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    time: "",
    date: "",
    description: "",
  });

  const resetForm = () => {
    setFormData({
      title: "",
      time: "",
      date: "",
      description: "",
    });
    setEditingEvent(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEvent) {
      updateEvent(editingEvent.id, formData);
    } else {
      addEvent(formData);
    }
    resetForm();
    setShowAddModal(false);
  };

  const handleEdit = (event: Event) => {
    setFormData({
      title: event.title,
      time: event.time,
      date: event.date,
      description: event.description || "",
    });
    setEditingEvent(event);
    setShowAddModal(true);
  };

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.date.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group events by date for better organization
  const groupedEvents = filteredEvents.reduce((groups, event) => {
    const date = event.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(event);
    return groups;
  }, {} as Record<string, Event[]>);

  const dateOrder = Object.keys(groupedEvents).sort((a, b) => {
    // Simple date sorting - you might want to improve this
    if (a.toLowerCase() === 'today') return -1;
    if (a.toLowerCase() === 'tomorrow') return 0;
    if (b.toLowerCase() === 'today') return 1;
    if (b.toLowerCase() === 'tomorrow') return 0;
    return a.localeCompare(b);
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Calendar</h2>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-slate-950 rounded-xl font-medium hover:bg-emerald-400 transition-colors"
        >
          <Plus size={18} />
          Add Event
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-2 w-full bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
        />
      </div>

      {/* Events List */}
      <div className="space-y-6">
        {dateOrder.length === 0 ? (
          <div className="text-center py-12">
            <CalendarDays className="mx-auto mb-4 text-slate-500" size={48} />
            <h3 className="text-xl font-bold mb-2">No Events Yet</h3>
            <p className="text-slate-500">Add your first event to get started!</p>
          </div>
        ) : (
          dateOrder.map((date) => (
            <div key={date} className="space-y-3">
              <h3 className="text-lg font-bold text-emerald-400 capitalize">{date}</h3>
              <div className="grid gap-3">
                <AnimatePresence>
                  {groupedEvents[date].map((event) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-10 h-10 bg-emerald-500/20 rounded-xl">
                          <Calendar size={16} className="text-emerald-400" />
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="font-medium text-white">{event.title}</h4>
                          {event.description && (
                            <p className="text-sm text-slate-400 mt-1">{event.description}</p>
                          )}
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1 text-xs text-slate-500">
                              <Clock size={12} />
                              {event.time}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-slate-500">
                              <Calendar size={12} />
                              {event.date}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEdit(event)}
                            className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white transition-colors"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => deleteEvent(event.id)}
                            className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Event Modal */}
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
                  {editingEvent ? "Edit Event" : "Add New Event"}
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
                    Event Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    placeholder="Enter event title..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    Date
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    placeholder="e.g., Today, Tomorrow, Friday, 2024-01-15"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    Time
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    placeholder="e.g., 10:00 AM, 3:00 PM"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    Description (Optional)
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    placeholder="Add event description..."
                    rows={3}
                  />
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
                    {editingEvent ? "Update Event" : "Add Event"}
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
