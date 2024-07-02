"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Bricolage_Grotesque } from 'next/font/google'
import { Space_Mono } from 'next/font/google'
import { Menu, X } from 'lucide-react';
import { useState } from "react"
import { NavigationMenu, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { createClient } from '@supabase/supabase-js'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);


const fontBodyBold = Space_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: '700',
  variable: '--font-body',
})

const fontBold = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  weight: '700',
  variable: '--font-heading',
})

const fontBody = Space_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-body',
})

const reviews = [
  {
    quote: "I was able to find the perfect dress for my event without ever leaving my home. The virtual dressing room is a game-changer!",
    name: "Jane Doe",
    title: "CEO, Acme Inc"
  },
  {
    quote: "The customer service was exceptional. They went above and beyond to ensure I had the right fit and style for my occasion.",
    name: "John Smith",
    title: "Marketing Director, Tech Co"
  },
  {
    quote: "The quality of the clothing exceeded my expectations. I'll definitely be a returning customer!",
    name: "Emily Brown",
    title: "Fashion Blogger"
  }
];



export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

const toggleMenu = () => {
  setIsMenuOpen(!isMenuOpen);
};

const [isDialogOpen, setIsDialogOpen] = useState(false)
const [email, setEmail] = useState('')
const [redeemCode, setRedeemCode] = useState('')
const [message, setMessage] = useState('')

const handleAppsumoClick = () => {
  setIsDialogOpen(true)
}



const handleSubmit = async () => {
  console.log('Submitting with email:', email, 'and code:', redeemCode);
  setMessage('')
  console.log('Form submitted')

  try {
    console.log('Searching for user with email:', email)
    // Find the user ID based on the email
    const { data: userData, error: userError } = await supabase
      .from('dressmeup')
      .select('id')
      .eq('email', email)
      .single()

    if (userError) {
      console.error('Error fetching user:', userError)
      if (userError.code === 'PGRST116') {
        setMessage('Email not found. Please sign up first.')
      } else {
        setMessage(`Error fetching user: ${userError.message}`)
      }
      return
    }

    if (userData) {
      console.log('User found:', userData)
      // User found, now insert the redeem code for this user
      const { data: insertData, error: insertError } = await supabase
        .from('dressmeup')
        .update({ redeemcode: redeemCode })
        .eq('id', userData.id)
        .select();

      if (insertError) {
        console.error('Error inserting redeem code:', insertError)
        setMessage(`Error inserting redeem code: ${insertError.message}`)
        return
      }

      console.log('Redeem code inserted:', insertData)
      setMessage('Redeem code successfully applied! wait for 24 hour')
    } else {
      console.log('No user found with this email')
      setMessage('No user found with this email. Please sign up first.')
    }
  } catch (error) {
    console.error('Unexpected error:', error)
    setMessage(`An unexpected error occurred: ${error.message}`)
  }
}

  return (
    <div className="flex flex-col min-h-[100dvh]">
     <header className="px-4 lg:px-6 h-14 flex items-center border-b">
      <Link href="#" className="flex items-center justify-center" prefetch={false}>
      <img src="/logoone.png" alt="Logo" className="h-8 w-auto mr-2" />
        <span className="sr-only">Acme SaaS Platform</span>
      </Link>
      <nav className="ml-auto hidden lg:flex gap-4">
        <Link href="#" className={`text-sm font-medium ${fontBody.className}`} prefetch={false}>
          Features
        </Link>
        <Link href="#" className={`text-sm font-medium ${fontBody.className}`} prefetch={false}>
          Pricing
        </Link>
        <Link href="#" className={`text-sm font-medium ${fontBody.className}`} prefetch={false}>
          About
        </Link>
        <Link href="#" className={`text-sm font-medium ${fontBody.className}`} prefetch={false}>
          Contact
        </Link>
      </nav>
      <div className="ml-auto hidden lg:flex gap-4">
      <Link href="/dress">
            <Button variant="outline" className={`w-full ${fontBody.className}`}>Sign in</Button>
            </Link>
            <Link href="/dress">
            <Button className={`w-full ${fontBody.className}`} style={{background:"#005F8F"}}>Sign Up</Button>
            </Link>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="ml-auto lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <nav className="flex flex-col gap-4">
            <Link href="#" className={`text-sm font-medium ${fontBody.className}`} prefetch={false}>
              Features
            </Link>
            <Link href="#" className={`text-sm font-medium ${fontBody.className}`} prefetch={false}>
              Pricing
            </Link>
            <Link href="#" className={`text-sm font-medium ${fontBody.className}`} prefetch={false}>
              About
            </Link>
            <Link href="#" className={`text-sm font-medium ${fontBody.className}`} prefetch={false}>
              Contact
            </Link>
            <Link href="/dress">
            <Button variant="outline" className={`w-full ${fontBody.className}`}>Sign in</Button>
            </Link>
            <Link href="/dress">
            <Button className={`w-full ${fontBody.className}`} style={{background:"#005F8F"}}>Sign Up</Button>
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
      <main className="flex-1">
        <section className="w-full py-6 md:py-12 lg:py-16 xl:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className={`text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none ${fontBold.className}`}>
                    Virtually Try On Any Dress
                  </h1>
                  <p className={`max-w-[600px] text-muted-foreground md:text-xl ${fontBody.className}`}>
                    Discover your perfect fit with our virtual dressing room. Personalized recommendations and a
                    seamless shopping experience.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="#"
                    className={`inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${fontBody.className}`} style={{background:"#005F8F"}}
                    prefetch={false}
                  >
                    Try It Now
                  </Link>
                  <Link
                    href="/dress"
                    className={`inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${fontBody.className}`}
                    prefetch={false}
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
              <img
                src="/home.png"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className={`inline-block rounded-lg bg-muted px-3 py-1 text-sm ${fontBody.className}  `}>Virtual Dressing Room</div>
                <h2 className={`text-3xl font-bold tracking-tighter sm:text-5xl ${fontBold.className} `}>Visualize Your Perfect Fit</h2>
                <p className={`max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ${fontBody.className} `}>
                  Our virtual dressing room allows you to try on dresses from the comfort of your own home. See how they
                  look on your body and get personalized recommendations.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <img
                src="/second.png"
                width="550"
                height="310"
                alt="Virtual Dressing Room"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className={`text-xl font-bold ${fontBold.className}`}>Personalized Fit</h3>
                      <p className={`text-muted-foreground ${fontBody.className}`}>
                        Our AI-powered virtual dressing room analyzes your body shape and size to provide personalized
                        recommendations.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className={`text-xl font-bold ${fontBold.className} `}>Seamless Experience</h3>
                      <p className={`text-muted-foreground  ${fontBody.className}`}>
                        Try on dresses with just a few clicks. No more waiting in line or dealing with crowded dressing
                        rooms.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className={`text-xl font-bold ${fontBold.className} `}>Endless Options</h3>
                      <p className={`text-muted-foreground ${fontBody.className} `}>
                        Browse our extensive collection of dresses and find the perfect one for any occasion.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
  <div className="container px-4 md:px-6">
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="space-y-2">
        <div className={`inline-block rounded-lg bg-muted px-3 py-1 text-sm ${fontBody.className}`}>Dress Gallery</div>
        <h2 className={`text-3xl font-bold tracking-tighter sm:text-5xl  ${fontBold.className}`}>Explore Our Dress Collection</h2>
        <p className={`max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ${fontBody.className} `}>
          Browse through our extensive collection of dresses and find the perfect one for any occasion. Try them
          on virtually to see how they look on you.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[
          { src: "/firstone.jpg", alt: "Elegant Evening Gown" },
          { src: "/fifthone.jpg", alt: "Floral Summer Dress" },
          { src: "/secondone.jpg", alt: "Cocktail Party Dress" },
          { src: "/sixthone.jpg", alt: "Bohemian Maxi Dress" },
          { src: "/thirdone.jpg", alt: "Professional Business Dress" },
          { src: "/seventhone.jpg", alt: "Vintage-Inspired Dress" },
          { src: "/fourthone.jpg", alt: "Casual Sundress" },
          { src: "/eightone.jpg", alt: "Formal Ball Gown" },
        ].map((dress, i) => (
          <div key={i} className="relative group">
            <img
              src={dress.src}
              width="300"
              height="400"
              alt={dress.alt}
              className="w-full h-[400px] object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Link
                href="#"
                className={`inline-flex h-10 items-center justify-center rounded-md  px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${fontBody.className} `}
                prefetch={false}
                style={{background:"#005F8F"}}
              >
                Try On
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className={`text-3xl font-bold tracking-tighter md:text-4xl/tight ${fontBold.className} `}>Get Started with Dress Try-On</h2>
              <p className={`mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ${fontBody.className} `}>
                Sign up now and start virtually trying on dresses. It's quick, easy, and completely free.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <Link href="/dress">
              <Button type="submit" className={`w-full ${fontBody.className} `} style={{background:'#005F8F'}}>
                Sign Up
              </Button>
              </Link>
              <p className={`text-xs text-muted-foreground ${fontBody.className} `}>
                By signing up, you agree to our{" "}
                <Link href="#" className={`underline underline-offset-2  ${fontBody.className} `} prefetch={false}>
                  Terms &amp; Conditions
                </Link>
              </p>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className={`inline-block rounded-lg bg-muted px-3 py-1 text-sm  ${fontBody.className} `}>Platform Sponsors</div>
                <h2 className={`text-3xl font-bold tracking-tighter sm:text-5xl  ${fontBold.className} `}>Our Trusted Partners</h2>
                <p className={`max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed  ${fontBody.className} `}>
                  We're proud to partner with leading brands in the fashion industry. Check out our sponsors below.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                {[
          { src: "/partnerone.png", alt: "Elegant Evening Gown" },
          { src: "/V.png", alt: "Elegant Evening Gown" },
          { src: "/kgk.png", alt: "Elegant Evening Gown" },
          { src: "/sr.png", alt: "Elegant Evening Gown" },
          { src: "/za.png", alt: "Elegant Evening Gown" },
          { src: "/ssd.png", alt: "Elegant Evening Gown" },
          { src: "/tst.png", alt: "Elegant Evening Gown" },
          { src: "/xttt.png", alt: "Elegant Evening Gown" },
          { src: "/lxx.png", alt: "Elegant Evening Gown" },
          { src: "/partnersecond.png", alt: "Elegant Evening Gown" }
        ].map((partner, i) => (
                  <div key={i} className="flex items-center justify-center">
                    <img
                      src={partner.src}
                      width="140"
                      height="70"
                      alt={`Sponsor ${i + 1}`}
                      className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className={`inline-block rounded-lg bg-muted px-3 py-1 text-sm  ${fontBody.className} `}>Testimonials</div>
                <h2 className={`text-3xl font-bold tracking-tighter sm:text-5xl  ${fontBold.className} `}>What Our Customers Say</h2>
                <p className={`max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed  ${fontBody.className} `}>
                  Hear from real customers who have used our virtual dressing room and loved the experience.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {reviews.map((review, i) => (
        <Card key={i} className="text-center">
          <CardContent>
            <blockquote className={`text-lg font-semibold leading-snug ${fontBodyBold.className}`} style={{paddingTop:"26px"}}>
              &ldquo;{review.quote}&rdquo;
            </blockquote>
            <div className="mt-4">
              <div className={`font-semibold ${fontBodyBold.className}`}>{review.name}</div>
              <div className={`text-sm text-muted-foreground ${fontBold.className}`}>{review.title}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className={`inline-block rounded-lg bg-muted px-3 py-1 text-sm  ${fontBody.className} `}>Pricing</div>
                <h2 className={`text-3xl font-bold tracking-tighter sm:text-5xl ${fontBold.className}  `}>Affordable Pricing</h2>
                <p className={`max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ${fontBody.className}  `}>
                  Our virtual dressing room is available at a range of affordable pricing options to fit your needs.
                </p>
              </div>
            
              <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          <div className="bg-card rounded-lg p-6 md:p-8 flex flex-col gap-6">
            <div className="space-y-2">
              <h3 className={`text-2xl font-bold ${fontBold.className}`}>Basic</h3>
              <p className={`text-muted-foreground ${fontBody.className}`}>For small teams or individuals.</p>
            </div>
            <div className="space-y-2">
              <div className={`text-4xl font-bold ${fontBold.className}`}>$9</div>
              <p className={`text-muted-foreground ${fontBody.className}`}>per month</p>
            </div>
            <ul className="space-y-2 text-sm">
              <li className={`flex items-center gap-2 ${fontBody.className}`}>
                <CheckIcon className="w-4 h-4 fill-green-500" />
                100 Free Credits
              </li>
              <li className={`flex items-center gap-2 ${fontBody.className}`}>
                <CheckIcon className="w-4 h-4 fill-green-500" />
                Limited Dress
              </li>
              <li className={`flex items-center gap-2 ${fontBody.className}`}>
                <XIcon className="w-4 h-4 fill-red-500" />
                Email Support
              </li>
             
            </ul>
            <Button size="lg" className={`${fontBody.className}`} style={{background:"#005F8F"}} >Get Started</Button>
          </div>
          <div className="bg-card rounded-lg p-6 md:p-8 flex flex-col gap-6 shadow-lg">
            <div className="space-y-2">
              <h3  className={`text-2xl font-bold ${fontBold.className}`}>Appsumo Plan</h3>
              <p className={`text-muted-foreground ${fontBody.className}`}>For growing teams and businesses.</p>
            </div>
            <div className="space-y-2">
              <div className={`text-4xl font-bold ${fontBold.className}`}>$19</div>
              <p className={`text-muted-foreground ${fontBody.className}`}>per month</p>
            </div>
            <ul className="space-y-2 text-sm">
              <li className={`flex items-center gap-2 ${fontBody.className}`}>
                <CheckIcon className="w-4 h-4 fill-green-500" />
                400 Credits
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 fill-green-500" />
                Variety of dress
              </li>
              <li className={`flex items-center gap-2 ${fontBody.className}`}>
                <CheckIcon className="w-4 h-4 fill-green-500" />
                Email Support
              </li>
              
            </ul>
            <Button size="lg" className={`${fontBody.className}`} style={{background:"#005F8F"}} onClick={handleAppsumoClick}>Get Started</Button>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className={`${fontBold.className}`}>Redeem Appsumo Code</DialogTitle>
            <DialogDescription className={`${fontBody.className}`}>
              Please enter your signed-in email and redeem code to activate the Appsumo Plan.
            </DialogDescription>
          </DialogHeader>
         <form onSubmit={(e) => {
  e.preventDefault();
  handleSubmit();
}} >
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className={`text-right ${fontBody.className}`}>
                  Email
                </Label>
                <Input 
                  id="email" 
                  type="email" 
                  className="col-span-3" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="redeemCode" className={`text-right ${fontBody.className}`}>
                  Redeem Code
                </Label>
                <Input 
                  id="redeemCode" 
                  type="text" 
                  className="col-span-3" 
                  required 
                  value={redeemCode}
                  onChange={(e) => setRedeemCode(e.target.value)}
                />
              </div>

            </div>
           
            <DialogFooter>
              <Button type="submit" className={`${fontBody.className}`} style={{background:"#005F8F"}} >Submit</Button>
            </DialogFooter>
         </form>
         {message && <p className={message.includes('successfully') ? 'text-green-500' : 'text-red-500'}>{message}</p>}
        </DialogContent>
      </Dialog>
          <div className="bg-card rounded-lg p-6 md:p-8 flex flex-col gap-6">
            <div className="space-y-2">
              <h3  className={`text-2xl font-bold ${fontBold.className}`}>Enterprise</h3>
              <p className={`text-muted-foreground ${fontBody.className}`}>For large teams and organizations.</p>
            </div>
            <div className="space-y-2">
              <div className={`text-4xl font-bold ${fontBold.className}`}>$99</div>
              <p className={`text-muted-foreground ${fontBody.className}`}>per month</p>
            </div>
            <ul className="space-y-2 text-sm">
              <li className={`flex items-center gap-2 ${fontBody.className}`}>
                <CheckIcon className="w-4 h-4 fill-green-500" />
                Coming Soon
              </li>
              <li className={`flex items-center gap-2 ${fontBody.className}`}>
                <CheckIcon className="w-4 h-4 fill-green-500" />
                Coming Soon
              </li>
              <li className={`flex items-center gap-2 ${fontBody.className}`}>
                <CheckIcon className="w-4 h-4 fill-green-500" />
                Coming Soon
              </li>
            
            </ul>
            <Button size="lg" className={`${fontBody.className}`} style={{background:"#005F8F"}}>Get Started</Button>
          </div>
          </div>


            </div>
          </div>
        </section>
      
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className={`text-xs text-muted-foreground ${fontBodyBold.className}  `}>&copy; 2024 DressMeUp. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className={`text-xs hover:underline underline-offset-4 ${fontBody.className}  `} prefetch={false}>
            Pricing
          </Link>
          <Link href="#" className={`text-xs hover:underline underline-offset-4 ${fontBody.className}  `} prefetch={false}>
            About
          </Link>
          <Link href="#" className={`text-xs hover:underline underline-offset-4 ${fontBody.className}  `} prefetch={false}>
            Contact
          </Link>
          <Link href="#" className={`text-xs hover:underline underline-offset-4 ${fontBody.className}  `} prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}


function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}
