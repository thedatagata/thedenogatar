import NavDropdown from "../islands/NavDropdown.tsx";
import ProfileDropdownIsland from "../islands/ProfileDropdown.tsx";

export default function Nav() {
  return (
    <nav class="fixed w-full z-50 bg-[#172217]" data-element="main-navigation">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex justify-between h-28 items-center border-b border-[#F8F6F0]/20">
          {/* Logo */}
          <div class="flex items-center">
            <a
              href="/"
              class="text-3xl font-bold text-[#F8F6F0]"
              data-element="nav-logo"
            >
              DATA_<span class="text-[#90C137]">GATA</span>
            </a>
          </div>

          {/* Center Navigation Links */}
          <div class="hidden md:flex flex-1 justify-center items-center gap-12 text-lg font-light">
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

          {/* Profile Dropdown */}
          <div class="flex items-center">
            <ProfileDropdownIsland />
          </div>
        </div>
      </div>
    </nav>
  );
}
