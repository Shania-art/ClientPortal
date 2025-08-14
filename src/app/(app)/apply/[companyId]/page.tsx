
'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useParams, useRouter } from "next/navigation"
import { useCart } from "@/hooks/use-cart"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import { Product } from "@/types/product"

const companiesData: { [key: string]: { name: string, products: string[] } } = {
  pasm: { name: "PASM", products: ["Consumer Electronics Loan", "Appliance Financing"] },
  ramslin: { name: "RAMSLIN TV-SALES", products: ["HD TV Loan", "Home Theater System Financing"] },
  edgars: { name: "EDGARS", products: ["Fashion Account", "Beauty Credit"] },
  jet: { name: "JET", products: ["Clothing Account", "Homeware Credit"] },
};

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(10, "Phone number must be at least 10 digits."),
  address: z.string().min(5, "Address is required."),
  loanAmount: z.coerce.number({invalid_type_error: "Please enter a valid amount"}).positive("Loan amount must be a positive number."),
  annualIncome: z.coerce.number({invalid_type_error: "Please enter a valid amount"}).positive("Annual income must be a positive number."),
})

export default function ApplyPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast()
  const { cart, clearCart } = useCart();

  const companyId = Array.isArray(params.companyId) ? params.companyId[0] : params.companyId;
  const company = companyId ? companiesData[companyId] : { name: "Selected Company", products: [] };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "Shania Nyaude",
      email: "shanianyaude25@gmail.com",
      phone: "",
      address: "710 Mkoba 13, Gweru",
      loanAmount: undefined,
      annualIncome: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({applicationValues: values, cartItems: cart});
    toast({
      title: "Application Submitted!",
      description: `Your application has been received.`,
      variant: 'default',
    })
    clearCart();
    router.push('/dashboard');
  }

  if (!companyId || !companiesData[companyId]) {
      return <div>Company not found.</div>;
  }

  if (cart.length === 0) {
    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold">Your Cart is Empty</h2>
            <p className="text-muted-foreground">Please add products to your cart before applying.</p>
            <Button asChild className="mt-4">
              <Link href="/companies">Browse Products</Link>
            </Button>
        </div>
    )
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <h1 className="text-lg font-semibold md:text-2xl font-headline">Loan Application</h1>

      <Card>
        <CardHeader>
          <CardTitle>Apply with {company.name}</CardTitle>
          <CardDescription>Please confirm your details and the products you are applying for.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
               <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg font-medium">My Products ({totalItems})</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2 rounded-lg border p-4 mt-2">
                            {cart.map((item) => (
                                <div key={item.id} className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-md object-cover"/>
                                      <div>
                                        <div className="font-medium">{item.name} <span className="text-muted-foreground text-sm">x{item.quantity}</span></div>
                                        <div className="text-sm text-muted-foreground">
                                          Guarantee: <Badge variant="secondary">{item.guarantee}</Badge> | Period: <Badge variant="secondary">{item.paymentPeriod}</Badge>
                                        </div>
                                      </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
                </Accordion>


              <div className="grid md:grid-cols-2 gap-8">
                  <FormField control={form.control} name="fullName" render={({ field }) => (
                      <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl><Input placeholder="Shania Nyaude" {...field} /></FormControl>
                          <FormMessage />
                      </FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl><Input type="email" placeholder="shanianyaude25@gmail.com" {...field} /></FormControl>
                          <FormMessage />
                      </FormItem>
                  )} />
                  <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl><Input placeholder="(123) 456-7890" {...field} /></FormControl>
                          <FormMessage />
                      </FormItem>
                  )} />
                   <FormField control={form.control} name="address" render={({ field }) => (
                      <FormItem>
                          <FormLabel>Home Address</FormLabel>
                          <FormControl><Input placeholder="123 Main St, Anytown, USA" {...field} /></FormControl>
                          <FormMessage />
                      </FormItem>
                  )} />
                  <FormField control={form.control} name="loanAmount" render={({ field }) => (
                      <FormItem>
                          <FormLabel>Desired Loan Amount ($)</FormLabel>
                          <FormControl><Input type="number" placeholder="10000" {...field} onChange={e => field.onChange(e.target.value === '' ? undefined : +e.target.value)} /></FormControl>
                          <FormMessage />
                      </FormItem>
                  )} />
                  <FormField control={form.control} name="annualIncome" render={({ field }) => (
                       <FormItem>
                          <FormLabel>Annual Income ($)</FormLabel>
                          <FormControl><Input type="number" placeholder="75000" {...field} onChange={e => field.onChange(e.target.value === '' ? undefined : +e.target.value)} /></FormControl>
                          <FormDescription>Your gross annual income before taxes.</FormDescription>
                          <FormMessage />
                      </FormItem>
                  )} />
              </div>
              <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">Submit Application</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}
