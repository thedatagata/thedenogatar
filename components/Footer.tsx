export default function Footer() {
  return (
      <footer class="bg-gray-900 text-white">
          <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
              <div class="lg:grid lg:grid-cols-3 gap-8 items-center">
                  {/* Logo and Copyright */}
                  <div class="space-y-4">
                    <p class="text-2xl font-extrabold text-[#F8F6F0] tracking-tight">
                      DATA_<span class="text-[#90C137]">GATA</span>
                    </p>
                    <p class="text-gray-400">
                      © 2024 Data Gator LLC. All rights reserved.
                    </p>
                  </div>

                  {/* Location */}
                  <div class="mt-8 lg:mt-0">
                      <h3 class="text-sm font-semibold uppercase tracking-wider">Location</h3>
                      <p class="mt-4 text-gray-400">
                          Durham, NC
                      </p>
                  </div>

                  {/* Social Links */}
                  <div class="mt-8 lg:mt-0 flex items-center">
                      {/* Alligator Image */}
                      <img
                          src="/nerdy_alligator_headshot.png"
                          alt="Nerdy Alligator"
                          class="h-24 w-auto mr-4 rounded-full"
                      />
                      
                      {/* Social Links */}
                      <div>
                          <h3 class="text-sm font-semibold uppercase tracking-wider">Connect</h3>
                          <div class="mt-4 space-y-2">
                              <a href="https://github.com/thedatagata" class="block text-gray-400 hover:text-white transition">
                                  GitHub
                              </a>
                              <a href="https://www.linkedin.com/company/datagata" class="block text-gray-400 hover:text-white transition">
                                  LinkedIn
                              </a>
                              <a href="mailto:dasgata@datagator.com" class="block text-gray-400 hover:text-white transition">
                                  Email
                              </a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </footer>
  );
}
