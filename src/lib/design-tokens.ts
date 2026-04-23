export const colors = {
  ocean: {
    50: "#EFF8FF",
    100: "#DBEAFE",
    200: "#B6D8F7",
    300: "#7BB8EC",
    400: "#4496DE",
    500: "#2275C4",
    600: "#1A5C94",
    700: "#154D7E",
    800: "#14405E",
    900: "#0D2E4A",
    950: "#081A2C",
  },
  tropical: {
    50: "#F0FDF4",
    100: "#DCFCE7",
    500: "#22C55E",
    600: "#2A7A4B",
    700: "#1F5E39",
    800: "#166534",
  },
  terracotta: {
    50: "#FFF7ED",
    100: "#FFEDD5",
    400: "#FB923C",
    500: "#F97316",
    600: "#C45E2A",
    700: "#9A4420",
  },
  sand: {
    50: "#FAF7F0",
    100: "#F3EDE0",
    200: "#E8DFC9",
  },
  neutral: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#3D3D3D",
    800: "#1F2937",
    900: "#111827",
  },
} as const;

export const fonts = {
  heading: "Outfit, system-ui, sans-serif",
  body: "Inter, system-ui, sans-serif",
} as const;

export const artisanSpecialties = [
  { id: "plomberie", label: "Plomberie", color: "ocean" },
  { id: "electricite", label: "Électricité", color: "tropical" },
  { id: "gros-oeuvre", label: "Gros œuvre", color: "terracotta" },
  { id: "finition", label: "Finition", color: "ocean" },
] as const;

export type ArtisanSpecialty = (typeof artisanSpecialties)[number]["id"];

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

export const animationVariants = {
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, ease: "easeInOut" } },
  },
  staggerContainer: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  },
  slideRight: {
    hidden: { opacity: 0, x: "-100%" },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
  },
} as const;

export const wcagContrast = {
  "ocean-600/white": 6.8,
  "ocean-900/white": 14.1,
  "tropical-600/white": 5.2,
  "terracotta-600/white": 4.52,
  "neutral-700/white": 9.7,
} as const;
