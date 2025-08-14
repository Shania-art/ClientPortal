
'use client';

import { useParams, useRouter } from 'next/navigation';
import { staticCompanyData } from '@/app/(app)/companies/[companyId]/page';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingCart, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { addToCart } = useCart();
    const { toast } = useToast();

    const productId = params.productId as string;

    const allProducts = staticCompanyData.flatMap(c => c.products);
    const product = allProducts.find(p => p.id === productId);

     if (!product) {
        return (
             <div className="flex flex-col items-center justify-center h-full text-center">
                <h1 className="text-2xl font-bold">Product Not Found</h1>
                <p className="text-muted-foreground">The product you are looking for does not exist.</p>
                <Button asChild variant="link" className="mt-4">
                    <Link href="/companies">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Companies
                    </Link>
                </Button>
            </div>
        );
    }

    const handleAddToCart = (product: Product) => {
      addToCart(product);
      toast({
          title: "Added to Cart",
          description: `${product.name} has been added to your cart.`,
      });
    };

    const hasInstallments = Object.keys(product.installments).length > 0;

    return (
        <div className="space-y-6">
            <div>
                 <Button onClick={() => router.back()} variant="outline" size="sm" className="mb-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                     <Card className="overflow-hidden">
                        <div className="relative aspect-square w-full">
                             <Image 
                                src={product.image} 
                                alt={product.name} 
                                fill 
                                className="object-cover"
                                data-ai-hint={product.dataAiHint}
                            />
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    <div>
                        <Badge variant="outline" className="mb-2">{product.category}</Badge>
                        <h1 className="text-3xl md:text-4xl font-bold font-headline">{product.name}</h1>
                        <p className="text-muted-foreground mt-2 text-lg">{product.description}</p>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-green-600" />
                            <span className="font-medium">{product.guarantee}</span>
                        </div>
                         <div className="flex items-center gap-2">
                             <span className="text-muted-foreground">Payment Period:</span>
                             <span className="font-medium">{product.paymentPeriod}</span>
                        </div>
                    </div>
                    
                    {hasInstallments && (
                         <Card>
                            <CardHeader>
                                <CardTitle>Payment Plans</CardTitle>
                                <CardDescription>Choose a payment plan that works for you.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Term</TableHead>
                                            <TableHead className="text-right">Monthly Installment</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {Object.entries(product.installments).map(([term, amount]: [string, number]) => (
                                            <TableRow key={term}>
                                                <TableCell className="font-medium">{term} months</TableCell>
                                                <TableCell className="text-right font-mono">${amount.toFixed(2)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    )}

                    <Button size="lg" className="w-full" onClick={() => handleAddToCart(product)}>
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    );

}
