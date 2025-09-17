// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "nativewind/postcss": {}, // 👈 required for NativeWind
  },
};
