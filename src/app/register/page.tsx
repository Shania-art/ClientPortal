
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Landmark } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function RegisterPage() {
  const [email, setEmail] = useState('shanianyaude25@gmail.com');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('Shania Nyaude');
  const [nationalId, setNationalId] = useState('63-1234567-A-00');
  const [dateOfBirth, setDateOfBirth] = useState('1998-05-25');
  const [employmentType, setEmploymentType] = useState('civil');
  const [ecNumber, setEcNumber] = useState('12345678');

  const router = useRouter();
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // --- SIMULATED REGISTRATION ---
    console.log("Simulating registration for:", { fullName, email, nationalId, dateOfBirth, employmentType, ecNumber });
    toast({
      title: "Registration Successful",
      description: "You have successfully created an account. Please login.",
    });
    router.push('/'); // Redirect to login page after successful registration
    // --- END SIMULATION ---
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <Link href="/" className="block" aria-label="Back to home">
            <div className="text-center">
                <div className="inline-flex items-center justify-center bg-primary text-primary-foreground p-3 rounded-full mb-4 shadow-lg">
                    <Landmark className="h-8 w-8" />
                </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground font-headline">
                ALPHA CLIENT PORTAL
              </h1>
            </div>
        </Link>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Create an Account</CardTitle>
            <CardDescription>Fill in your details to get started.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" type="text" placeholder="Shania Nyaude" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="nationalId">National ID Number</Label>
                            <Input id="nationalId" type="text" placeholder="63-1234567-A-00" value={nationalId} onChange={(e) => setNationalId(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dob">Date of Birth</Label>
                            <Input id="dob" type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
                        </div>
                    </div>

                     <div className="space-y-3">
                        <Label>Employment Type</Label>
                        <RadioGroup
                            onValueChange={setEmploymentType}
                            defaultValue={employmentType}
                            className="flex items-center space-x-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="private" id="private"/>
                                <Label htmlFor="private" className="font-normal">Private Sector</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="civil" id="civil"/>
                                 <Label htmlFor="civil" className="font-normal">Public Sector</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {employmentType === 'civil' && (
                         <div className="space-y-2">
                            <Label htmlFor="ecNumber">EC Number</Label>
                            <Input id="ecNumber" type="text" placeholder="Enter your EC Number" value={ecNumber} onChange={(e) => setEcNumber(e.target.value)} required />
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Register
                </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center text-sm">
          <p>Already have an account?{' '}
            <Link href="/" className="font-medium text-primary hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
