
'use client';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types/product';
import Link from 'next/link';

interface ProductListProps {
  products: Product[];
}

const ProductRow = ({ product }: { product: Product }) => {
    const { addToCart } = useCart();
    const { toast } = useToast();

    const handleAddToCart = (e: React.MouseEvent, product: Product) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        toast({
            title: "Added to Cart",
            description: `${product.name} has been added to your cart.`,
        });
    };

    return (
      <Link href={`/products/${product.id}`} className="block group">
        <div className="bg-card border p-3 rounded-lg flex justify-between items-center mt-3 first:mt-0 transition-all group-hover:bg-muted/60 group-hover:shadow-sm">
            <div>
                <h3 className="font-semibold group-hover:text-primary">{product.name}</h3>
                <div className="text-sm text-muted-foreground mt-1">
                    Guarantee: <Badge variant="secondary">{product.guarantee}</Badge> | Payment Period: <Badge variant="secondary">{product.paymentPeriod}</Badge>
                </div>
            </div>
            <Button size="sm" onClick={(e) => handleAddToCart(e, product)}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
            </Button>
        </div>
      </Link>
    );
};


export default function ProductList({ products }: ProductListProps) {
  const groupedProducts = products.reduce((acc, product) => {
    const { category, subCategory } = product;
    if (!acc[category]) {
      acc[category] = {};
    }
    const key = subCategory || 'general';
    if (!acc[category][key]) {
      acc[category][key] = [];
    }
    acc[category][key].push(product);
    return acc;
  }, {} as Record<string, Record<string, Product[]>>);

  const defaultOpenCategories = Object.keys(groupedProducts).slice(0, 1);

  if (products.length === 0) {
    return <p className="text-muted-foreground">No products available for this company yet.</p>;
  }

  // Handle case where products are not categorized
  if (Object.keys(groupedProducts).length === 1 && groupedProducts[Object.keys(groupedProducts)[0]]['general']) {
     return (
        <div className="space-y-3">
             {products.map((product) => (
                <ProductRow key={product.id} product={product} />
            ))}
        </div>
     );
  }

  return (
    <Accordion type="single" collapsible defaultValue={defaultOpenCategories[0]} className="w-full space-y-4">
      {Object.entries(groupedProducts).map(([category, subCategories]) => (
        <Card key={category} className="bg-muted/40 overflow-hidden">
            <AccordionItem value={category} className="border-b-0">
                <AccordionTrigger className="p-6 text-lg font-semibold hover:no-underline">
                   {category}
                </AccordionTrigger>
                <AccordionContent className="p-0 bg-background">
                    <div className="border-t">
                      <Accordion type="multiple" className="w-full" defaultValue={Object.keys(subCategories).slice(0, 1)}>
                        {Object.entries(subCategories).map(([subCategory, items]) => (
                            <div key={subCategory} className="border-b last:border-b-0">
                                {subCategory !== 'general' ? (
                                     <AccordionItem value={subCategory} className="border-b-0">
                                        <AccordionTrigger className="px-6 py-4 font-medium hover:no-underline">
                                            {subCategory}
                                        </AccordionTrigger>
                                        <AccordionContent className="pb-0">
                                            <div className="space-y-3 px-6 pb-4 border-t bg-muted/20">
                                                {items.map((product) => (
                                                    <ProductRow key={product.id} product={product} />
                                                ))}
                                            </div>
                                        </AccordionContent>
                                     </AccordionItem>
                                ) : (
                                  <div className="px-6 py-4 space-y-3">
                                      {items.map((product) => (
                                        <ProductRow key={product.id} product={product} />
                                      ))}
                                  </div>
                                )}
                            </div>
                        ))}
                      </Accordion>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Card>
      ))}
    </Accordion>
  );
}
