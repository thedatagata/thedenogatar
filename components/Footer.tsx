export default function Footer() {
    return (
      <footer class="bg-gray-900 text-white">
        <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div class="lg:grid lg:grid-cols-3 gap-8 items-center">
            {/* Logo and Copyright */}
            <div class="space-y-4">
              <img src="/dasgata.jpg" alt="Data Gator" class="h-12 w-auto" />
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
            <div class="mt-8 lg:mt-0">
              <h3 class="text-sm font-semibold uppercase tracking-wider">Connect</h3>
              <div class="mt-4 space-y-2">
                <a href="https://github.com/data-gator" class="block text-gray-400 hover:text-white transition">
                  GitHub
                </a>
                <a href="https://linkedin.com/company/data-gator-llc" class="block text-gray-400 hover:text-white transition">
                  LinkedIn
                </a>
                <a href="mailto:contact@datagator.com" class="block text-gray-400 hover:text-white transition">
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }