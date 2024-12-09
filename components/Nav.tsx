// components/Nav.tsx
import NavDropdown from "../islands/NavDropdown.tsx";

export default function Nav() {
  return (
    <nav class="fixed w-full z-50">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex justify-between h-28 items-center border-b border-[#F8F6F0]/20">
          <div class="flex items-center">
            <span class="text-3xl font-bold text-[#F8F6F0]">
              DATA_<span class="text-[#90C137]">GATA</span>
            </span>
            <img src="dasgata.jpg" alt="data_gata" class="h-8 w-auto" />
          </div>
          <div class="hidden md:flex items-center gap-12">
            <div class="flex gap-12 text-lg font-light">
              <a href="#about" class="text-[#F8F6F0] hover:text-[#90C137] transition-colors">About</a>
              <NavDropdown />
            </div>
            <a href="#contact" 
              class="text-[#90C137] border border-[#90C137] px-6 py-3 hover:bg-[#90C137] hover:text-[#F8F6F0] transition-all">
              Let's Talk
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}