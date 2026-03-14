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
        show_on_totem: false, // Começa como false para não quebrar o limite sem querer
        created_at: new Date().toISOString() 
      };
      setFaqs(prev => [newFaq, ...prev]);
      toast.success("FAQ criada!");
    }
  };

  const deleteFaq = (id: string) => {
    setFaqs(prev => prev.filter(f => f.id !== id));
    toast.success("FAQ excluída!");
  };

  const toggleTotemStatus = (id: string) => {
    setFaqs(prev => {
      const faqToUpdate = prev.find(f => f.id === id);
      const activeCount = prev.filter(f => f.show_on_totem).length;

      // Se estiver tentando ativar e já houver 4
      if (faqToUpdate && !faqToUpdate.show_on_totem && activeCount >= 4) {
        toast.error("Limite máximo de 4 FAQs no totem atingido!");
        return prev;
      }

      return prev.map(f => f.id === id ? { ...f, show_on_totem: !f.show_on_totem } : f);
    });
  };

  return { faqs, loading, saveFaq, deleteFaq, toggleTotemStatus };
}