
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Gem, Search, Shirt, ShoppingBag, Tv } from 'lucide-react';
import CompanyCard from '@/components/company-card';

const companies = [
  { id: 'pasm', name: 'PASM', icon: Gem, dataAiHint: 'electronics store', description: 'Financing for the latest consumer electronics and appliances.', products: [ { name: 'Consumer Electronics Loan', rate: '8.99%', term: '6-24 months' }, { name: 'Appliance Financing', rate: '7.5%', term: '12-36 months' }, ], },
  { id: 'ramslin', name: 'RAMSLIN TV-SALES', icon: Tv, dataAiHint: 'television logo', description: 'Get the best TV and home theater systems today.', products: [ { name: 'HD TV Loan', rate: '9.25%', term: '12-24 months' }, { name: 'Home Theater System Financing', rate: '8.5%', term: '18-36 months' }, ], },
  { id: 'edgars', name: 'EDGARS', icon: Shirt, dataAiHint: 'fashion logo', description: 'Your account for the latest trends in fashion and beauty.', products: [ { name: 'Fashion Account', rate: '21.0%', term: 'revolving' }, { name: 'Beauty Credit', rate: '21.0%', term: 'revolving' }, ], },
  { id: 'jet', name: 'JET', icon: ShoppingBag, dataAiHint: 'retail logo', description: 'Affordable credit for clothing, cellphones, and homeware.', products: [ { name: 'Clothing Account', rate: '22.0%', term: 'revolving' }, { name: 'Homeware Credit', rate: '21.5%', term: 'revolving' }, ], },
];

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Select a Company</h1>
        <p className="text-muted-foreground">Browse and compare loan products from our trusted partners.</p>
      </div>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search companies..."
          className="pl-8 w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredCompanies.map(company => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
}
