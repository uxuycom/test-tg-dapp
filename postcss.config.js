module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "postcss-pxtorem": {
      rootValue: 16,
      propList: ["*"],
      minPixelValue: 1,
      exclude: /node_modules/i,
    },
  },
};
