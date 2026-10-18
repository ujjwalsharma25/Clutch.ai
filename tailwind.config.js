const v = (n) => `rgb(var(--${n}) / <alpha-value>)`;
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { ink: v("bg"), panel: v("panel"), edge: v("edge"), a1: v("a1"), a2: v("a2"), xp: v("xp"), good: v("good"), bad: v("bad") },
    fontFamily: { display: ['"Chakra Petch"', "system-ui", "sans-serif"], sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"] },
    keyframes: { float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-12px)" } }, pulseRing: { "0%": { transform: "scale(.9)", opacity: ".9" }, "100%": { transform: "scale(1.8)", opacity: "0" } } },
    animation: { float: "float 6s ease-in-out infinite", ring: "pulseRing 1.4s ease-out infinite" },
  } }, plugins: [],
};
