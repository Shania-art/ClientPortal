
'use client';

import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Gem, Shirt, ShoppingBag, Tv } from 'lucide-react';
import Link from 'next/link';
import ProductList from '@/components/product-list';
import { Product } from '@/types/product';

const companies: Array<{
  id: string;
  name: string;
  icon: React.ElementType;
  dataAiHint: string;
  description: string;
  products: Product[];
}> = [
    {
        id: 'pasm',
        name: 'PASM',
        icon: Gem,
        dataAiHint: 'electronics store',
        description: 'Financing for the latest consumer electronics and appliances.',
        products: [
            { id: 'pasm-fridge', name: 'Smart Refrigerator', guarantee: '2-Year Warranty', paymentPeriod: '24-48 months', category: 'Home Appliances', subCategory: 'Kitchen', image: 'https://placehold.co/600x600.png', dataAiHint: 'refrigerator kitchen', description: 'A state-of-the-art smart refrigerator with a touch screen, internet connectivity, and a spacious interior. Keep your food fresher for longer.', installments: { '3': 450, '6': 230, '9': 160 } },
            { id: 'pasm-microwave', name: 'Microwave Oven', guarantee: '1-Year Warranty', paymentPeriod: '6-18 months', category: 'Home Appliances', subCategory: 'Kitchen', image: 'https://placehold.co/600x600.png', dataAiHint: 'microwave kitchen', description: 'A powerful and efficient microwave oven with multiple presets for easy cooking.', installments: { '3': 50, '6': 26, '9': 18 } },
            { id: 'pasm-dishwasher', name: 'Dishwasher', guarantee: '2-Year Warranty', paymentPeriod: '12-36 months', category: 'Home Appliances', subCategory: 'Kitchen', image: 'https://placehold.co/600x600.png', dataAiHint: 'dishwasher kitchen', description: 'A quiet and energy-efficient dishwasher that leaves your dishes sparkling clean.', installments: { '3': 200, '6': 105, '9': 72 } },
            { id: 'pasm-airfryer', name: 'Air Fryer', guarantee: '1-Year Warranty', paymentPeriod: '6-12 months', category: 'Home Appliances', subCategory: 'Kitchen', image: 'https://placehold.co/600x600.png', dataAiHint: 'air fryer', description: 'Enjoy your favorite fried foods with less oil. This air fryer is perfect for healthy cooking.', installments: { '3': 40, '6': 21, '9': 15 } },
            { id: 'pasm-washing-machine', name: 'Front-Load Washer', guarantee: '3-Year Warranty', paymentPeriod: '18-36 months', category: 'Home Appliances', subCategory: 'Laundry', image: 'https://placehold.co/600x600.png', dataAiHint: 'washing machine', description: 'A high-efficiency front-load washing machine with multiple cycles and steam function.', installments: { '3': 350, '6': 180, '9': 125 } },
            { id: 'pasm-dryer', name: 'Electric Dryer', guarantee: '3-Year Warranty', paymentPeriod: '18-36 months', category: 'Home Appliances', subCategory: 'Laundry', image: 'https://placehold.co/600x600.png', dataAiHint: 'clothes dryer', description: 'A large capacity electric dryer with sensor dry technology to prevent over-drying.', installments: { '3': 320, '6': 165, '9': 115 } },
            { id: 'pasm-laptop', name: 'Gaming Laptop', guarantee: '2-Year Warranty', paymentPeriod: '12-36 months', category: 'Computing', subCategory: 'Laptops', image: 'https://placehold.co/600x600.png', dataAiHint: 'gaming laptop', description: 'A high-performance gaming laptop with a dedicated graphics card and a high-refresh-rate display.', installments: { '3': 600, '6': 310, '9': 210 } },
            { id: 'pasm-monitor', name: '4K Monitor', guarantee: '3-Year Warranty', paymentPeriod: '12-24 months', category: 'Computing', subCategory: 'Monitors', image: 'https://placehold.co/600x600.png', dataAiHint: '4k monitor', description: 'A stunning 27-inch 4K monitor with vibrant colors and sharp details, perfect for work and play.', installments: { '3': 150, '6': 78, '9': 54 } },
            { id: 'pasm-keyboard', name: 'Mechanical Keyboard', guarantee: '1-Year Warranty', paymentPeriod: '6-12 months', category: 'Computing', subCategory: 'Accessories', image: 'https://placehold.co/600x600.png', dataAiHint: 'mechanical keyboard', description: 'A durable mechanical keyboard with customizable RGB backlighting for a superior typing experience.', installments: { '3': 55, '6': 28, '9': 20 } },
            { id: 'pasm-mouse', name: 'Wireless Gaming Mouse', guarantee: '1-Year Warranty', paymentPeriod: '6-12 months', category: 'Computing', subCategory: 'Accessories', image: 'https://placehold.co/600x600.png', dataAiHint: 'gaming mouse', description: 'A high-precision wireless gaming mouse with programmable buttons and long battery life.', installments: { '3': 35, '6': 18, '9': 13 } },
            { id: 'pasm-console', name: 'Gaming Console', guarantee: '1-Year Warranty', paymentPeriod: '12-24 months', category: 'Entertainment', subCategory: 'Gaming', image: 'https://placehold.co/600x600.png', dataAiHint: 'gaming console', description: 'The latest generation gaming console for an immersive gaming experience.', installments: { '3': 180, '6': 95, '9': 65 } },
            { id: 'pasm-headset', name: 'Wireless Headset', guarantee: '1-Year Warranty', paymentPeriod: '6-12 months', category: 'Entertainment', subCategory: 'Audio', image: 'https://placehold.co/600x600.png', dataAiHint: 'wireless headset', description: 'A comfortable wireless headset with high-fidelity sound and a noise-cancelling microphone.', installments: { '3': 60, '6': 32, '9': 22 } },
            { id: 'pasm-projector', name: 'HD Home Projector', guarantee: '2-Year Warranty', paymentPeriod: '12-24 months', category: 'Entertainment', subCategory: 'Home Theater', image: 'https://placehold.co/600x600.png', dataAiHint: 'home projector', description: 'Transform your living room into a cinema with this bright and sharp HD projector.', installments: { '3': 250, '6': 130, '9': 90 } },
            { id: 'pasm-speakers', name: 'Surround Sound System', guarantee: '2-Year Warranty', paymentPeriod: '12-36 months', category: 'Entertainment', subCategory: 'Home Theater', image: 'https://placehold.co/600x600.png', dataAiHint: 'sound system', description: 'A 5.1 channel surround sound system for an immersive audio experience.', installments: { '3': 400, '6': 205, '9': 140 } },
        ],
    },
    {
        id: 'ramslin',
        name: 'RAMSLIN TV-SALES',
        icon: Tv,
        dataAiHint: 'television logo',
        description: 'Get the best TV and home theater systems today.',
        products: [
            { id: 'ramslin-tv1', name: '55" 4K UHD Smart TV', guarantee: '2-Year Warranty', paymentPeriod: '12-24 months', category: 'Televisions', subCategory: 'Smart TVs', image: 'https://placehold.co/600x600.png', dataAiHint: 'smart tv', description: 'Experience breathtaking 4K picture quality and smart features with this 55-inch UHD TV.', installments: { '3': 300, '6': 155, '9': 107 } },
            { id: 'ramslin-tv2', name: '75" 8K QLED TV', guarantee: '3-Year Premium Warranty', paymentPeriod: '18-36 months', category: 'Televisions', subCategory: 'Smart TVs', image: 'https://placehold.co/600x600.png', dataAiHint: 'qled tv', description: 'Immerse yourself in stunning 8K resolution. The future of television is here.', installments: { '3': 800, '6': 410, '9': 280 } },
            { id: 'ramslin-soundbar', name: 'Dolby Atmos Soundbar', guarantee: '1-Year Warranty', paymentPeriod: '12-24 months', category: 'Audio Systems', subCategory: 'Soundbars', image: 'https://placehold.co/600x600.png', dataAiHint: 'soundbar audio', description: 'Elevate your audio experience with cinematic sound from this Dolby Atmos soundbar.', installments: { '3': 120, '6': 62, '9': 43 } },
        ],
    },
    {
        id: 'edgars',
        name: 'EDGARS',
        icon: Shirt,
        dataAiHint: 'fashion logo',
        description: 'Your account for the latest trends in fashion and beauty.',
        products: [
             { id: 'edgars-suit', name: 'Formal Suit', guarantee: '30-Day Returns', paymentPeriod: 'Revolving Credit', category: 'Fashion & Apparel', subCategory: 'Menswear', image: 'https://placehold.co/600x600.png', dataAiHint: 'man suit', description: 'A finely tailored formal suit, perfect for business meetings or special occasions. Made from premium wool blend.', installments: {} },
             { id: 'edgars-handbag', name: 'Leather Handbag', guarantee: '60-Day Returns', paymentPeriod: 'Revolving Credit', category: 'Fashion & Apparel', subCategory: 'Womenswear', image: 'https://placehold.co/600x600.png', dataAiHint: 'leather handbag', description: 'An elegant and timeless leather handbag. A perfect accessory for any outfit.', installments: {} },
        ],
    },
    {
        id: 'jet',
        name: 'JET',
        icon: ShoppingBag,
        dataAiHint: 'retail logo',
        description: 'Affordable credit for clothing, cellphones, and homeware.',
        products: [
            { id: 'jet-uniform', name: 'School Uniform Set', guarantee: '30-Day Returns', paymentPeriod: 'Revolving Credit', category: 'Clothing', subCategory: 'Kids Wear', image: 'https://placehold.co/600x600.png', dataAiHint: 'school uniform', description: 'A complete and durable school uniform set for kids. Available in all sizes.', installments: {} },
            { id: 'jet-cookware', name: 'Non-stick Cookware Set', guarantee: '1-Year Warranty', paymentPeriod: 'Revolving Credit', category: 'Homeware', subCategory: 'Kitchenware', image: 'https://placehold.co/600x600.png', dataAiHint: 'cookware set', description: 'A comprehensive set of non-stick pots and pans for all your cooking needs.', installments: {} },
        ],
    },
];

export const staticCompanyData = companies;


export default function CompanyDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const companyId = Array.isArray(params.companyId) ? params.companyId[0] : params.companyId;

    const company = companies.find(c => c.id === companyId);

    if (!company) {
        return (
             <div className="flex flex-col items-center justify-center h-full text-center">
                <h1 className="text-2xl font-bold">Company Not Found</h1>
                <p className="text-muted-foreground">The company you are looking for does not exist.</p>
                <Button asChild variant="link" className="mt-4">
                    <Link href="/companies">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Companies
                    </Link>
                </Button>
            </div>
        );
    }

    const Icon = company.icon;

    return (
        <div className="flex flex-col gap-6">
            <div>
                <Button asChild variant="outline" size="sm" className="mb-4">
                    <Link href="/companies">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Companies
                    </Link>
                </Button>
                <div className="flex items-center gap-4">
                     <div className="w-16 h-16 flex items-center justify-center bg-muted rounded-lg border flex-shrink-0">
                        <Icon className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold md:text-3xl font-headline">{company.name}</h1>
                        <p className="text-muted-foreground">{company.description}</p>
                    </div>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Available Loan Products</CardTitle>
                    <CardDescription>Review the terms and rates for products offered by {company.name}. Select a product to see more details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <ProductList products={company.products} />
                </CardContent>
            </Card>

             <div className="flex justify-end">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href={`/apply/${company.id}`}>
                        Proceed to Application
                    </Link>
                </Button>
            </div>
        </div>
    )
}
