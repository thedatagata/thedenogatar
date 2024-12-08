// components/Hero.tsx
export default function Hero() {
    return (
      <div class="relative pt-24 pb-20 bg-gradient-to-r from-green-50 to-green-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="relative">
            <div class="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
              <div class="mt-12 lg:mt-0">
                <div class="text-center lg:text-left md:max-w-2xl md:mx-auto lg:mx-0">
                  <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                    <span class="block">DATA GATA</span>
                    <span class="block text-gator-green mt-3 text-3xl sm:text-4xl lg:text-3xl xl:text-4xl">
                    Over the course of millions of years my digestive track has evolved to consume then model raw data.
                    </span>
                  </h1>
                  <div class="mt-10">
                    <a
                      href="#contact"
                      class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gator-green hover:bg-green-700 transition-colors duration-150"
                    >
                      Get Started
                    </a>
                  </div>
                </div>
              </div>
              <div class="mt-12 lg:mt-0">
                <div class="flex justify-center lg:justify-start">
                  <img 
                    src="/dasgata.jpg" 
                    alt="Data Gator Logo" 
                    class="h-64 w-64 object-contain"
                  />
                </div>
                <p class="mt-6 text-base text-gray-600 sm:text-lg md:text-xl">
                  According to Louisiana Cajun folklore, some areas of the Bayou may be haunted by a "DATA_GATA", an unbaptized, illegitimate child left to die in the swamp. Raised by alligators, it transformed into a half-gator, half-dator monstrosity that survives purely off manipulating execs with data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }