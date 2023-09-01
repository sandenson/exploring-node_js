import express from "express";
import { save } from "./lib.js";
import skiTerms from "../data/skiTerms.json" assert { type: "json" };
const router = new express.Router();

router.get("/", (req, res) => {
  res.json(skiTerms);
});

router.post("/", express.json(), (req, res) => {
  skiTerms.push(req.body);
  save(skiTerms);
  res.json({
    status: "success",
    term: req.body
  });
});

router.delete("/:term", (req, res) => {
  skiTerms.filter(({ term }) => term !== req.params.term);
  save(skiTerms);
  res.json({
    status: "success",
    removed: req.params.term,
    newLength: skiTerms.length
  });
});

export default router;
