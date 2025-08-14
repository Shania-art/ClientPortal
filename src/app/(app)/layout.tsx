
'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuGroup } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Building, FileText, LayoutDashboard, Menu, Landmark, User, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { Badge } from '@/components/ui/badge';

function CartButton() {
    const { cart, clearCart, removeFromCart, updateQuantity } = useCart();
    const router = useRouter();

    const handleCheckout = () => {
        // Since we don't know which company the user will choose,
        // we'll just push them to the list of companies to start an application.
        // The application page will then use the items from the cart.
        if (cart.length > 0) {
            router.push('/companies'); 
        }
    };
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                 <Button
                    variant="outline"
                    size="icon"
                    className="relative"
                    aria-label={`View cart with ${totalItems} items`}
                >
                    <ShoppingCart className="h-5 w-5" />
                    {totalItems > 0 && (
                        <Badge
                            variant="destructive"
                            className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center"
                        >
                            {totalItems}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
                <DropdownMenuLabel className="flex justify-between items-center">
                    <span>My Cart</span>
                    <span>{totalItems} item(s)</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup className="max-h-64 overflow-y-auto">
                    {cart.length > 0 ? (
                        cart.map((item) => (
                           <DropdownMenuItem key={item.id} className="flex justify-between items-start focus:bg-transparent" onSelect={(e) => e.preventDefault()}>
                                <div className="flex gap-2 items-start">
                                     <img src={item.image} alt={item.name} className="w-12 h-12 rounded-md object-cover" />
                                     <div className="flex flex-col gap-1">
                                        <p className="font-medium leading-tight">{item.name}</p>
                                         <div className="flex items-center gap-2">
                                            <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                                <Minus className="h-3 w-3" />
                                            </Button>
                                            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                            <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                <Plus className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:bg-red-50 hover:text-red-500 flex-shrink-0" onClick={() => removeFromCart(item.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </DropdownMenuItem>
                        ))
                    ) : (
                        <div className="px-2 py-4 text-center text-sm text-muted-foreground">Your cart is empty.</div>
                    )}
                </DropdownMenuGroup>
                 <DropdownMenuSeparator />
                 {cart.length > 0 && (
                    <div className="p-2 space-y-2">
                        <Button onClick={() => router.push('/apply/pasm')} className="w-full">Proceed to Apply</Button>
                        <DropdownMenuItem onSelect={clearCart} className="text-red-500 focus:text-red-500 focus:bg-red-50 justify-center">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Clear Cart</span>
                        </DropdownMenuItem>
                    </div>
                 )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}


function AppLayoutContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/applications', label: 'My Applications', icon: FileText },
    { href: '/companies', label: 'Companies', icon: Building },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  const NavLinks = () => (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {navItems.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
            { 'bg-muted text-primary': pathname === href }
          )}
        >
          <Icon className="h-4 w-4" />
          {label}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-card md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Landmark className="h-6 w-6 text-primary" />
              <span className="">ALPHA PORTAL</span>
            </Link>
          </div>
          <div className="flex-1">
            <NavLinks />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0">
               <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 mb-2">
                 <Link href="/" className="flex items-center gap-2 font-semibold">
                    <Landmark className="h-6 w-6 text-primary" />
                    <span className="">ALPHA PORTAL</span>
                </Link>
              </div>
              <NavLinks />
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            {/* Can add a search bar here later if needed */}
          </div>
          <CartButton />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src="https://placehold.co/40x40.png" alt="User avatar" data-ai-hint="person portrait" />
                  <AvatarFallback>SN</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link href="/profile">Profile</Link></DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link href="/">Logout</Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <AppLayoutContent>{children}</AppLayoutContent>
    )
}
