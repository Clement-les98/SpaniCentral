const express = require("express");
const router = express.Router();
const verifyToken =
  require(
    "../middleware/authMiddleware"
  );
const upload = require("../config/multer");

const {
  addJob,
  getJobs,
   getJobById,
   deleteJob,
   updateJob

} = require("../Controllers/jobsController.js");

router.get("/", getJobs);
router.get("/:id", getJobById);
router.delete("/:id", deleteJob);


router.post(
  "/",
  verifyToken,
  upload.single("company_logo"),
  addJob
);
router.put(
  "/:id",
  verifyToken,
  upload.single("company_logo"),
  updateJob
);

module.exports = router;