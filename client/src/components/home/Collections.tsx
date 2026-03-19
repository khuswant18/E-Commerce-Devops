import { motion } from 'framer-motion';
import { Link, useLocation } from 'wouter';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { Image } from '@unpic/react';
import { useCategories } from '@/hooks/useApi';

export default function Collections() {
  const { data: categories, isLoading } = useCategories();
  const [, setLocation] = useLocation();

  const handleCategoryClick = (categoryName: string) => {
    setLocation(`/shop?category=${encodeURIComponent(categoryName)}`);
  };

  const getCategoryImage = (item: any, idx: number) => {
    if (item.imageUrl) return item.imageUrl;

    // Nice fallback photos for collections
    const fallbacks = [
      'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop',
    ];

    const nameMap: Record<string, string> = {
      men: fallbacks[2],
      women: fallbacks[1],
      accessories: fallbacks[3],
      shoes: fallbacks[4],
      sneakers: fallbacks[4],
      apparel: fallbacks[0],
    };

    const key = item.name?.toLowerCase();
    if (key && nameMap[key]) return nameMap[key];

    return fallbacks[idx % fallbacks.length];
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Top Collections</h2>
          <Link href="/shop">
            <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto cursor-pointer hover:text-black transition-colors">
              Express your style with our standout collection—fashion meets sophistication.
            </p>
          </Link>
        </div>

        <div className="relative px-4">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {isLoading
                ? Array.from({ length: 6 }).map((_, idx) => (
                    <CarouselItem key={idx} className="pl-4 basis-1/2 md:basis-1/4 lg:basis-1/6">
                      <div className="flex flex-col items-center gap-4 p-2">
                        <Skeleton className="w-24 h-24 md:w-32 md:h-32 rounded-full" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    </CarouselItem> 
                  ))
                : categories?.map((item, idx) => (
                    <CarouselItem key={idx} className="pl-4 basis-1/2 md:basis-1/4 lg:basis-1/6">
                      <div
                        onClick={() => handleCategoryClick(item.name)}
                        className="flex flex-col items-center gap-4 group cursor-pointer p-2"
                      >
                        <motion.div
                          className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-transparent group-hover:border-black transition-all p-1"
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="w-full h-full rounded-full overflow-hidden bg-gray-100">
                            <Image
                              src={getCategoryImage(item, idx)}
                              alt={item.name}
                              layout="fullWidth"
                              className="w-full h-full object-cover"
                              background="auto"
                            />
                          </div>
                        </motion.div>
                        <span className="font-medium text-sm md:text-base tracking-wide">
                          {item.name}
                        </span>
                      </div>
                    </CarouselItem>
                  ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
