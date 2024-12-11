// components/Nav.tsx
import NavDropdown from "../islands/NavDropdown.tsx";

export default function Nav() {
  return (
    <nav class="fixed w-full z-50" data-element="main-navigation">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex justify-between h-28 items-center border-b border-[#F8F6F0]/20">
          <div class="flex items-center">
            <a 
              href="/" 
              class="text-3xl font-bold text-[#F8F6F0]"
              data-element="nav-logo"
            >
              DATA_<span class="text-[#90C137]">GATA</span>
            </a>
          </div>
          <div class="hidden md:flex items-center gap-12">
            <div class="flex gap-12 text-lg font-light">
              <a 
                href="#about" 
                class="text-[#F8F6F0] hover:text-[#90C137] transition-colors"
                data-element="nav-link"
                data-nav-section="about"
              >
                About
              </a>
              <NavDropdown />
            </div>
            <a 
              href="#contact" 
              class="text-[#90C137] border border-[#90C137] px-6 py-3 hover:bg-[#90C137] hover:text-[#F8F6F0] transition-all"
              data-element="nav-cta"
            >
              Let's Talk
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}