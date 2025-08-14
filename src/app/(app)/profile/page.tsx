
'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload } from "lucide-react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const profileFormSchema = z.object({
  employmentType: z.string({ required_error: "Please select your employment type." }),
  ecNumber: z.string().optional(),
  nationalIdPhoto: z.any().optional(),
  payslip: z.any().optional(),
  proofOfResidence: z.any().optional(),
  titleDeeds: z.any().optional(),
  vehicleRegistration: z.any().optional(),
})

// Mock user data - in a real app, this would be fetched
const userData = {
    fullName: "Shania Nyaude",
    email: "shanianyaude25@gmail.com",
    nationalId: "63-1234567-A-00",
    dateOfBirth: "1998-05-25",
    employmentType: 'civil', // This would come from the user's data
    ecNumber: '12345678' // This would also come from user's data if they are a civil servant
};

export default function ProfilePage() {
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      employmentType: userData.employmentType,
    },
  })

  // Watch the employmentType field to conditionally render other fields
  const employmentType = form.watch("employmentType");

  function onSubmit(values: z.infer<typeof profileFormSchema>) {
    console.log(values)
    toast({
      title: "Profile Information Submitted",
      description: "Your verification information is now under review.",
    })
  }

  const FileUploadButton = ({ field }: { field: any }) => (
     <div className="relative">
        <Button type="button" variant="outline" className="w-full justify-start text-muted-foreground">
            <Upload className="mr-2 h-4 w-4" />
            {field.value?.[0]?.name || 'Choose file...'}
        </Button>
        <Input 
            type="file" 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
            onChange={(e) => field.onChange(e.target.files)}
        />
    </div>
  )

  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-lg font-semibold md:text-2xl font-headline">Client Verification Profile</h1>
            <p className="text-muted-foreground">Complete your profile to get verified and unlock all features.</p>
        </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Personal Details</CardTitle>
                    <CardDescription>This information is pre-filled from your registration. Contact support if you need to make changes.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src="https://placehold.co/80x80.png" data-ai-hint="person portrait" />
                            <AvatarFallback>SN</AvatarFallback>
                        </Avatar>
                        <div>
                             <Button variant="outline" type="button" className="mb-2">Change Photo</Button>
                             <p className="text-sm text-muted-foreground">Upload a clear profile picture.</p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <Label>Full Name</Label>
                            <Input value={userData.fullName} disabled />
                        </div>
                         <div className="space-y-1">
                            <Label>Email Address</Label>
                            <Input value={userData.email} disabled />
                        </div>
                        <div className="space-y-1">
                            <Label>National ID</Label>
                            <Input value={userData.nationalId} disabled />
                        </div>
                         <div className="space-y-1">
                            <Label>Date of Birth</Label>
                            <Input value={userData.dateOfBirth} disabled />
                        </div>
                    </div>
                </CardContent>
            </Card>

          <Card>
            <CardHeader>
              <CardTitle>KYC & Employment Documents</CardTitle>
              <CardDescription>This information helps us verify your identity and financial status.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="employmentType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Employment Type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="private" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Formal Employment (Private Sector)
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="civil" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Civil Servant (Public Sector)
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              
                <FormField
                    control={form.control}
                    name="nationalIdPhoto"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Upload National ID</FormLabel>
                        <FormDescription>For security, please upload a clear photo of you holding your ID card next to your face.</FormDescription>
                        <FormControl><FileUploadButton field={field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField
                    control={form.control}
                    name="proofOfResidence"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Proof of Residence</FormLabel>
                        <FormDescription>Upload a recent utility bill or bank statement (not older than 3 months).</FormDescription>
                        <FormControl><FileUploadButton field={field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

              {employmentType === 'civil' && (
                <FormField
                  control={form.control}
                  name="ecNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>EC Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your EC Number" {...field} defaultValue={userData.ecNumber} />
                      </FormControl>
                       <FormDescription>This is your civil servant EC number.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {employmentType === 'private' && (
                   <FormField control={form.control} name="payslip" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Upload Latest Payslip</FormLabel>
                        <FormDescription>Please upload a clear copy of your most recent payslip (PDF, JPG, PNG).</FormDescription>
                        <FormControl><FileUploadButton field={field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                  )} />
              )}

            </CardContent>
          </Card>
          
           <Card>
                <CardHeader>
                    <CardTitle>Collaterals</CardTitle>
                    <CardDescription>If you have any collaterals, please upload the necessary documents below. This is optional.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                     <FormField
                        control={form.control}
                        name="titleDeeds"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title Deeds</FormLabel>
                            <FormDescription>Upload a clear copy of the property title deeds.</FormDescription>
                            <FormControl><FileUploadButton field={field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                     <FormField
                        control={form.control}
                        name="vehicleRegistration"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Vehicle Registration Book</FormLabel>
                            <FormDescription>Upload a copy of the vehicle's registration book.</FormDescription>
                            <FormControl><FileUploadButton field={field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </CardContent>
            </Card>

          <div className="flex justify-end">
            <Button type="submit">Submit for Verification</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
