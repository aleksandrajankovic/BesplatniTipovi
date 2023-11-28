import mongoose from "mongoose";

const tipsSchema = mongoose.Schema({
  title: String,
  rivales: String,
  league: String,
  sport: String,
  tipsAndQuotes: String,
  tipsAndQuotesLink: String,
  description: String,
  creator: String,
  tipDate: Date,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likeCount: {
    type: Number,
    default: 0,
  },
});

const TipsModal = mongoose.model("Tip", tipsSchema);

export default TipsModal;
