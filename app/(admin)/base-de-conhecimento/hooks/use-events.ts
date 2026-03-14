import { useState, useEffect } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { CompanyEvent, EventFormState } from "../types";
import { MOCK_EVENTS } from "../constants";

export function useEvents() {
  const [events, setEvents] = useState<CompanyEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setEvents(MOCK_EVENTS);
    setLoading(false);
  }, []);

  const saveEvent = async (form: EventFormState, editingId: string | null) => {
    if (!form.event_date) return;

    const formattedDate = format(form.event_date!, "yyyy-MM-dd");

    if (editingId) {
      setEvents(prev => prev.map(e => e.id === editingId ? { 
        ...e, 
        title: form.title, 
        event_date: formattedDate, 
        event_type: form.event_type, 
        description: form.description 
      } : e));
      toast.success("Evento atualizado!");
    } else {
      const newEvent: CompanyEvent = {
        id: Math.random().toString(36).substring(2, 9),
        title: form.title,
        event_date: formattedDate,
        event_type: form.event_type,
        description: form.description || null,
        created_at: new Date().toISOString()
      };
      setEvents(prev => [newEvent, ...prev]);
      toast.success("Evento criado!");
    }
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    toast.success("Evento excluído!");
  };

  return { events, loading, saveEvent, deleteEvent };
}