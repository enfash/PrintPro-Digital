
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative w-full py-24 lg:py-32 xl:py-40 bg-primary-50">
       <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,white_10%,transparent_100%)]"></div>
      <div className="container px-4 md:px-6 text-center relative">
        <div className="space-y-4">
          <h1 className="font-headline text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none animate-in fade-in-5 slide-in-from-bottom-4 duration-500">
            Vibrant Large Format Printing
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl animate-in fade-in-5 slide-in-from-bottom-5 duration-500 delay-100">
            From stunning banners to eye-catching vehicle wraps, we are your premier printing partner in Lagos. High-quality prints, fast turnaround.
          </p>
        </div>
        <div className="mt-6 animate-in fade-in-5 slide-in-from-bottom-6 duration-500 delay-200">
          <Button asChild size="lg" className="font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow">
            <Link href="#contact">Get Your Free Quote</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
