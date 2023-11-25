import TipsModal from "../models/tips.js";
import mongoose from "mongoose";

export const createTip = async (req, res) => {
  const tip = req.body;
  const newTip = new TipsModal({
    ...tip,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newTip.save();
    res.status(201).json(newTip);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getTips = async (req, res) => {
  try {
    const tips = await TipsModal.find();
    res.status(200).json(tips);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getTip = async (req, res) => {
  const { id } = req.params;
  try {
    const tip = await TipsModal.findById(id);
    res.status(200).json(tip);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getTipsByUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "User doesn't exist" });
  }
  const userTips = await TipsModal.find({ creator: id });
  res.status(200).json(userTips);
};

export const deleteTip = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No tips exist with id: ${id}` });
    }
    await TipsModal.findByIdAndRemove(id);
    res.json({ message: "Tip deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const updateTip = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    creator,
    rivales,
    league,
    sport,
    tipsAndQuotes,
    tipDate,
  } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No tip exist with id: ${id}` });
    }

    const updatedTip = {
      creator,
      title,
      description,
      rivales,
      league,
      sport,
      tipsAndQuotes,
      tipDate,
      _id: id,
    };
    await TipsModal.findByIdAndUpdate(id, updatedTip, { new: true });
    res.json(updatedTip);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};
