import { MainLayout } from "@/components/layout/main-layout";

/**
 * Templates layout component
 * Uses main layout without chat history sidebar
 */
export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout showChatHistory={false}>
      {children}
    </MainLayout>
  );
}