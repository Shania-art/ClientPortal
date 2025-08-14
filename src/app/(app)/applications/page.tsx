
'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const applications = [
  { id: 'APP001', company: 'RAMSLIN TV-SALES', product: 'HD TV Loan', amount: 1200, status: 'Approved', date: '2023-10-28' },
  { id: 'APP002', company: 'PASM', product: 'Consumer Electronics Loan', amount: 850, status: 'In Review', date: '2023-11-05' },
  { id: 'APP003', company: 'JET', product: 'Clothing Account', amount: 300, status: 'Approved', date: '2023-11-10' },
  { id: 'APP004', company: 'EDGARS', product: 'Fashion Account', amount: 500, status: 'Rejected', date: '2023-11-12' },
  { id: 'APP005', company: 'PASM', product: 'Appliance Financing', amount: 2500, status: 'In Review', date: '2023-11-15' },
];

const statusStyles: { [key: string]: string } = {
    'Approved': 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200',
    'In Review': 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200',
    'Rejected': 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200'
}

export default function ApplicationsPage() {
    const router = useRouter();

    const handleContactSupport = (applicationId: string) => {
        window.location.href = `mailto:support@alphaportal.com?subject=Support Request for Application ID: ${applicationId}`;
    };
  
    const handleViewDetails = (appId: string) => {
        router.push(`/applications/${appId}`);
    };

  return (
    <div className="flex flex-col gap-4">
        <div>
            <h1 className="text-lg font-semibold md:text-2xl font-headline">My Loan Applications</h1>
            <p className="text-muted-foreground">Track the status of all your loan applications here.</p>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Application History</CardTitle>
                <CardDescription>A list of your recent loan applications.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                <Button variant="ghost" className="-ml-4">
                                    Application ID
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>Product</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead>Status</TableHead>
                             <TableHead>
                                <Button variant="ghost">
                                    Date
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {applications.map(app => (
                            <TableRow key={app.id}>
                                <TableCell className="font-medium">{app.id}</TableCell>
                                <TableCell>{app.company}</TableCell>
                                <TableCell>{app.product}</TableCell>
                                <TableCell className="text-right">${app.amount.toLocaleString()}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={statusStyles[app.status] || ''}>{app.status}</Badge>
                                </TableCell>
                                <TableCell>{app.date}</TableCell>
                                <TableCell>
                                     <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Toggle menu</span>
                                        </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onSelect={() => handleViewDetails(app.id)}>View Details</DropdownMenuItem>
                                            <DropdownMenuItem onSelect={() => handleContactSupport(app.id)}>Contact Support</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        <div className="flex justify-end">
            <Button asChild>
                <Link href="/companies">Apply for a new loan</Link>
            </Button>
        </div>
    </div>
  )
}
