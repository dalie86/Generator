// Style Dictionary: DTCG JSON → CSS-переменные.
export default {
  source: ["tokens/src/**/*.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "tokens/build/",
      files: [{ destination: "tokens.css", format: "css/variables" }],
    },
  },
};
