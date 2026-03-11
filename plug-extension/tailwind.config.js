/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx,html}",
    "./src/panel/**/*.{ts,tsx,html}"
  ],
  theme: {
    extend: {
      colors: {
        dm: {
          background: "#050816",
          surface: "#0b1020",
          accent: "#3b82f6",
          "accent-soft": "rgba(59,130,246,0.14)",
          success: "#22c55e",
          warning: "#f97316"
        }
      },
      boxShadow: {
        "dm-soft": "0 18px 45px rgba(15,23,42,0.55)"
      },
      borderRadius: {
        xl: "1.1rem"
      },
      keyframes: {
        slideInRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" }
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" }
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        },
        pulse2: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" }
        }
      },
      animation: {
        "slide-in-right": "slideInRight 0.28s cubic-bezier(0.16,1,0.3,1)",
        "fade-up": "fadeUp 0.35s ease-out both",
        "shimmer": "shimmer 1.6s infinite linear",
        "scale-in": "scaleIn 0.22s ease-out both",
        "pulse-slow": "pulse2 2s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

