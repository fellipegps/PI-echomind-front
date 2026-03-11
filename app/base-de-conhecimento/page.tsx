import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, CalendarIcon } from "lucide-react";
import { FaqTab } from "./components/faq-tab";
import { EventTab } from "./components/event-tab";

export default function KnowledgeBasePage() {
  return (
    <div className="container mx-auto py-10 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Base de Conhecimento</h1>
        <p className="text-muted-foreground text-sm">Gerencie informações locais para prototipagem</p>
      </div>

      <Tabs defaultValue="faqs" className="w-full">
        <TabsList>
          <TabsTrigger value="faqs" className="gap-2">
            <BookOpen className="h-4 w-4" /> FAQs
          </TabsTrigger>
          <TabsTrigger value="events" className="gap-2">
            <CalendarIcon className="h-4 w-4" /> Eventos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="faqs">
          <FaqTab />
        </TabsContent>

        <TabsContent value="events">
          <EventTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}