
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Clock, Search, XCircle, ShoppingBag, Tv, Shirt, Gem, AlertTriangle } from 'lucide-react';
import CompanyCard from '@/components/company-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const summaryStats = {
  approved: 2,
  inReview: 2,
  rejected: 1,
};

const recommendedCompanies = [
    { id: 'pasm', name: 'PASM', icon: Gem, dataAiHint: 'electronics store', description: 'Financing for the latest consumer electronics and appliances.', products: [ { name: 'Consumer Electronics Loan', rate: '8.99%', term: '6-24 months' }, { name: 'Appliance Financing', rate: '7.5%', term: '12-36 months' }, ], },
    { id: 'ramslin', name: 'RAMSLIN TV-SALES', icon: Tv, dataAiHint: 'television logo', description: 'Get the best TV and home theater systems today.', products: [ { name: 'HD TV Loan', rate: '9.25%', term: '12-24 months' }, { name: 'Home Theater System Financing', rate: '8.5%', term: '18-36 months' }, ], },
    { id: 'jet', name: 'JET', icon: ShoppingBag, dataAiHint: 'retail logo', description: 'Affordable credit for clothing, cellphones, and homeware.', products: [ { name: 'Clothing Account', rate: '22.0%', term: 'revolving' }, { name: 'Homeware Credit', rate: '21.5%', term: 'revolving' }, ], },
];

const userName = "Shania"; // In a real app, this would be fetched dynamically
const isKycComplete = false; // In a real app, this would be fetched based on user data

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-lg font-semibold md:text-2xl font-headline">Welcome, {userName}!</h1>
            <p className="text-muted-foreground">Here's a summary of your account.</p>
        </div>
        <div className="flex items-center gap-2">
            <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/companies">
                  New Application
                </Link>
            </Button>
        </div>
      </div>

       {/* KYC Alert */}
       {!isKycComplete && (
         <Alert variant="default" className="bg-yellow-50 border-yellow-200">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertTitle className="text-yellow-800">Complete Your Profile</AlertTitle>
            <AlertDescription className="flex justify-between items-center text-yellow-700">
                Please complete your KYC verification to unlock all features and apply for loans.
                <Button asChild variant="link" className="text-yellow-800 font-bold">
                    <Link href="/profile">
                        Go to Profile <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </AlertDescription>
        </Alert>
       )}


      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-green-50 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{summaryStats.approved}</div>
            <p className="text-xs text-green-700">Applications approved</p>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-800">In Review</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900">{summaryStats.inReview}</div>
            <p className="text-xs text-yellow-700">Applications being processed</p>
          </CardContent>
        </Card>
        <Card className="bg-red-50 border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-800">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">{summaryStats.rejected}</div>
            <p className="text-xs text-red-700">Applications not approved</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Search and Recommendations */}
      <Card>
          <CardHeader>
              <CardTitle>Find Financial Products</CardTitle>
              <p className="text-muted-foreground pt-2">Search for companies or browse our recommendations below to get started on a new application.</p>
          </CardHeader>
          <CardContent className="space-y-6">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search companies or products..."
                  className="pl-8 w-full md:w-2/3"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Recommended for you</h3>
                    <Button variant="ghost" asChild>
                        <Link href="/companies">
                            View All <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {recommendedCompanies.map(company => (
                        <CompanyCard key={company.id} company={company} />
                    ))}
                </div>
              </div>
          </CardContent>
      </Card>
    </div>
  );
}
