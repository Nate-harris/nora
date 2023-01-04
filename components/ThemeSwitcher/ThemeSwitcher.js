import { useHasMounted } from "../../utils/helpers";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

const moonPath =
  "M7.63636 12.2178C7.63636 18.8452 12.4661 24.2178 12 24.2178C5.3726 24.2178 0 18.8452 0 12.2178C0 5.59037 5.3726 0.217773 12 0.217773C12 0.217773 7.63636 5.59037 7.63636 12.2178Z";

const sunPath =
  "M24 12C24 18.6274 18.6274 24 12 24C5.3726 24 0 18.6274 0 12C0 5.3726 5.3726 0 12 0C18.6274 0 24 5.3726 24 12Z";

const themes = [
  {
    title: "Light",
    name: "light",
    color: { hex: "#f4f4f0" },
    icon: sunPath,
  },
  {
    title: "Dark",
    name: "dark",
    color: { hex: "#000000" },
    icon: moonPath,
  },
];

const ThemeSwitcher = () => {
  const hasMounted = useHasMounted();
  const { theme, setTheme } = useTheme();

  // Make sure it's client-only
  if (!hasMounted || !theme) return null;

  // store our current and next theme objects (will be first theme, if undefined)
  const currentIndex = Math.max(
    0,
    themes.findIndex((t) => t.name === theme)
  );

  const nextTheme = themes[(currentIndex + 1) % themes.length];
  const currentTheme = themes[currentIndex];

  return (
    <div className="theme-switch">
      <button
        className="theme-switch--toggle"
        onClick={() => setTheme(nextTheme.name)}
        aria-label={`Change theme to ${nextTheme.title}`}
      >
        <svg
          className="theme-switch--icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={currentTheme.icon} />
        </svg>
        <div className="theme-switch--label">{currentTheme.title}</div>
      </button>
    </div>
  );
};

export default ThemeSwitcher;
