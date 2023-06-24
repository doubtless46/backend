exports.isQuestion=(req,res,next)=>{
  let {heading} = req.body;
  if(!heading || heading.length<=1){
    return res.status(400).send({ message: "ASK SOME QUESTION" });
  }
  heading = heading.trim(" ");
  if (heading.endsWith("?")) {
    return next();
  }
  const questionWords = [
    "who",
    "what",
    "when",
    "where",
    "why",
    "which",
    "how",
    "is",
    "are",
    "do",
    "does",
    "did",
    "can",
    "could",
    "should",
    "would",
    "will",
    "won't",
    "kya",
    "kyu",
    "kaise",
  ];
  const words = heading.split(' ');
  for (const word of words) {
    const lowercaseWord = word.toLowerCase();
    if (questionWords.includes(lowercaseWord)) {
      return next();
    }
  }

  return res.status(400).send({ message: "ASK QUESTIONS ONLY" });
}