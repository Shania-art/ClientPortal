
'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Mock data - in a real app, you'd fetch this based on the ID
const applications = [
  { id: 'APP001', company: 'RAMSLIN TV-SALES', product: 'HD TV Loan', amount: 1200, status: 'Approved', date: '2023-10-28', applicant: 'Shania Nyaude', email: 'shanianyaude25@gmail.com', address: '710 Mkoba 13, Gweru' },
  { id: 'APP002', company: 'PASM', product: 'Consumer Electronics Loan', amount: 850, status: 'In Review', date: '2023-11-05', applicant: 'Shania Nyaude', email: 'shanianyaude25@gmail.com', address: '710 Mkoba 13, Gweru' },
  { id: 'APP003', company: 'JET', product: 'Clothing Account', amount: 300, status: 'Approved', date: '2023-11-10', applicant: 'Shania Nyaude', email: 'shanianyaude25@gmail.com', address: '710 Mkoba 13, Gweru' },
  { id: 'APP004', company: 'EDGARS', product: 'Fashion Account', amount: 500, status: 'Rejected', date: '2023-11-12', applicant: 'Shania Nyaude', email: 'shanianyaude25@gmail.com', address: '710 Mkoba 13, Gweru' },
  { id: 'APP005', company: 'PASM', product: 'Appliance Financing', amount: 2500, status: 'In Review', date: '2023-11-15', applicant: 'Shania Nyaude', email: 'shanianyaude25@gmail.com', address: '710 Mkoba 13, Gweru' },
];

const statusStyles: { [key: string]: string } = {
    'Approved': 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200',
    'In Review': 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200',
    'Rejected': 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200'
};

const DetailRow = ({ label, value }: { label: string; value: string | number }) => (
    <div className="flex justify-between py-2">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium text-right">{value}</span>
    </div>
);

export default function ApplicationDetailsPage() {
    const params = useParams();
    const appId = params.id;

    const application = applications.find(app => app.id === appId);

    if (!application) {
        return (
             <div className="flex flex-col items-center justify-center h-full text-center">
                <h1 className="text-2xl font-bold">Application Not Found</h1>
                <p className="text-muted-foreground">The application with ID "{appId}" could not be found.</p>
                <Button asChild variant="link" className="mt-4">
                    <Link href="/applications">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to My Applications
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <div>
                <Button asChild variant="outline" size="sm" className="mb-4">
                    <Link href="/applications">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Applications
                    </Link>
                </Button>
                <h1 className="text-lg font-semibold md:text-2xl font-headline">
                    Application Details
                </h1>
                <p className="text-muted-foreground">
                    Viewing details for application #{application.id}
                </p>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                             <CardTitle>{application.company}</CardTitle>
                             <CardDescription>{application.product}</CardDescription>
                        </div>
                        <Badge variant="outline" className={statusStyles[application.status] || ''}>
                            {application.status}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Separator />
                    <DetailRow label="Application ID" value={application.id} />
                    <Separator />
                    <DetailRow label="Application Date" value={application.date} />
                    <Separator />
                    <DetailRow label="Applicant Name" value={application.applicant} />
                    <Separator />
                    <DetailRow label="Contact Email" value={application.email} />
                    <Separator />
                     <DetailRow label="Home Address" value={application.address} />
                    <Separator />
                    <DetailRow label="Loan Amount" value={`$${application.amount.toLocaleString()}`} />
                </CardContent>
            </Card>
        </div>
    );
}
