
import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colors based on your Data Gator brand
        'gator': {
          'green': '#10B981',  // Adjust this to match your logo's green
          'red': '#EF4444',    // For the bow tie red
        }
      }
    },
  },
  plugins: [],
} as Config;