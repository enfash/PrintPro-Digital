
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layers, Monitor, Palmtree } from 'lucide-react';

const services = [
  {
    icon: <Layers className="h-8 w-8 text-primary" />,
    title: 'Flex & SAV Banners',
    description: 'Durable, high-resolution flex and self-adhesive vinyl (SAV) banners for indoor and outdoor advertising.',
  },
  {
    icon: <Monitor className="h-8 w-8 text-primary" />,
    title: 'Window Graphics',
    description: 'Transform your storefront with custom window decals and graphics that attract customers and enhance your brand.',
  },
  {
    icon: <Palmtree className="h-8 w-8 text-primary" />,
    title: '3D Signage & Lettering',
    description: 'Make a bold statement with custom 3D signs and lettering that add depth and professionalism to your space.',
  },
];

export default function Services() {
  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Our Services</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">What We Print</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We specialize in a wide range of large format printing solutions tailored to meet your business needs in Lagos and beyond.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12 mt-12">
          {services.map((service) => (
            <Card key={service.title} className="shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-4">
                {service.icon}
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
