import Sentiment from "sentiment";
const sentiment = new Sentiment();

export function getSentimentLabel(text) {
  const result = sentiment.analyze(text);
  if (result.score > 0) return "Positif";
  if (result.score < 0) return "Negatif";
  return "Netral";
}
