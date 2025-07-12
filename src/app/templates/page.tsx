import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Code, Database, Globe } from "lucide-react";

const templates = [
  {
    id: 1,
    title: "React Component Template",
    description: "Pre-built React component with TypeScript and Tailwind CSS",
    category: "Frontend",
    icon: Code,
    isPro: true,
  },
  {
    id: 2,
    title: "API Route Handler",
    description: "Next.js API route with error handling and validation",
    category: "Backend",
    icon: Database,
    isPro: true,
  },
  {
    id: 3,
    title: "Landing Page",
    description: "Modern landing page with hero section and features",
    category: "Templates",
    icon: Globe,
    isPro: false,
  },
  {
    id: 4,
    title: "Documentation Template",
    description: "Clean documentation layout with navigation",
    category: "Documentation",
    icon: FileText,
    isPro: true,
  },
];

/**
 * Templates page component
 * Displays available code templates and snippets
 */
export default function TemplatesPage() {
  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Templates</h1>
          <p className="text-muted-foreground">
            Pre-built templates and code snippets to accelerate your development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => {
            const IconComponent = template.icon;
            return (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{template.title}</CardTitle>
                        <Badge variant="outline" className="mt-1">
                          {template.category}
                        </Badge>
                      </div>
                    </div>
                    {template.isPro && (
                      <Badge className="bg-yellow-500 text-yellow-900 hover:bg-yellow-500">
                        PRO
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {template.description}
                  </CardDescription>
                  <Button 
                    className="w-full" 
                    variant={template.isPro ? "default" : "outline"}
                    disabled={template.isPro}
                  >
                    {template.isPro ? "Upgrade to Pro" : "Use Template"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Card className="p-8 bg-gradient-to-r from-primary/5 to-secondary/5">
            <h2 className="text-2xl font-bold mb-4">Unlock All Templates</h2>
            <p className="text-muted-foreground mb-6">
              Get access to our entire library of professional templates and code snippets
            </p>
            <Button size="lg">
              Upgrade to Pro
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}