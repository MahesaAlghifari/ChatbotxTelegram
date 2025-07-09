const Sentiment = require("sentiment");
const analyzer = new Sentiment();

module.exports = (text) => {
  const result = analyzer.analyze(text);
  return result.score > 0 ? "Positif" : result.score < 0 ? "Negatif" : "Netral";
};
