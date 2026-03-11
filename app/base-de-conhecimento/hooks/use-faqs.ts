import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Faq } from "../types";
import { MOCK_FAQS } from "../constants";

export function useFaqs() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setFaqs(MOCK_FAQS);
    setLoading(false);
  }, []);


  const saveFaq = async (faqForm: { question: string; answer: string }, editingId: string | null) => {
    if (editingId) {
      setFaqs(prev => prev.map(f => f.id === editingId ? { ...f, ...faqForm } : f));
      toast.success("FAQ atualizada!");
    } else {
      const newFaq: Faq = { 
        id: Math.random().toString(36).substring(2, 9), 
        ...faqForm, 
        is_active: true, 
        created_at: new Date().toISOString() 
      };
      setFaqs(prev => [newFaq, ...prev]);
      toast.success("FAQ criada!");
    }

    return;
  };

  const deleteFaq = (id: string) => {
    setFaqs(prev => prev.filter(f => f.id !== id));
    toast.success("FAQ excluída!");
  };

  const toggleActive = (id: string) => {
    setFaqs(prev => prev.map(f => f.id === id ? { ...f, is_active: !f.is_active } : f));
  };

  return { faqs, loading, saveFaq, deleteFaq, toggleActive };
}