export default function Hero() {

  return (
    <div class="relative min-h-screen flex items-center bg-gradient-to-br from-[#172217] to-[#186018]">
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-[#90C137] opacity-10 mix-blend-multiply"></div>
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div class="space-y-16">
          <div class="space-y-4">
            <h1 class="text-8xl font-extrabold text-[#F8F6F0] tracking-tight">
              DATA_<span class="text-[#90C137]">GATA</span>
            </h1>
            <p class="text-lg italic text-[#F8F6F0]/70 max-w-2xl">
              "Ah you think having a data swamp is unique? You merely implemented a data swamp in pursuit of a single source of truth. I was born in the swamp, molded by it..."
            </p>
          </div>

          <div class="space-y-8 max-w-4xl">
            <h2 class="text-4xl font-bold text-[#90C137]">Legend has it</h2>

            <div class="flex space-x-8 items-start">
              <img
                src="water_cooler.png"
                alt="Watercooler"
                class="w-64 h-auto object-contain"
              />
              <div class="space-y-6">
                <p class="text-2xl text-[#F8F6F0]/90 font-light leading-relaxed">
                  According to Silicon Valley folklore, some early stage start-ups have reported to have encountered what can only be described as the "DATA_GATA".
                </p>
                <p class="text-2xl text-[#F8F6F0]/90 font-light leading-relaxed">
                  This creature evolved in an environment where a bootstrapped start-up sold data-products as supported production features to raise capital to build the product angel investors were sold on.
                </p>
                <p class="text-2xl text-[#F8F6F0]/90 font-light leading-relaxed">
                  In this environment, this once ambitious young college dropout evolved into what can only be described as a half datar, half gator monstrosity that survives on leading data teams out of the swamp to the promiseland of a true single source of truth data platform.
                </p>
              </div>
            </div>
          </div>

          <div class="inline-block border-2 border-[#90C137] rounded-lg p-1 hover:bg-[#90C137]/10 transition-colors">
            <a
              href="#contact"
              class="text-[#F8F6F0] text-lg font-medium px-8 py-3 inline-block"
              data-element="get-started-cta"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
