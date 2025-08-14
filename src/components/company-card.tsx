
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, LucideIcon } from 'lucide-react';

type Product = {
  name: string;
  rate: string;
  term: string;
};

type Company = {
  id: string;
  name: string;
  icon: LucideIcon;
  dataAiHint?: string;
  description: string;
  products: Product[];
};

export default function CompanyCard({ company }: { company: Company }) {
    const Icon = company.icon;
  return (
    <Card className="flex flex-col hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex-row items-start gap-4 pb-4">
        <div className="w-12 h-12 flex items-center justify-center bg-muted rounded-lg border">
            <Icon className="w-6 h-6 text-muted-foreground" />
        </div>
        <div className="flex-1">
          <CardTitle>{company.name}</CardTitle>
          <CardDescription className="mt-1">{company.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        {/* Products moved to details page */}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-primary hover:bg-primary/90">
          <Link href={`/companies/${company.id}`}>
            View Products <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
