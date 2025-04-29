import multer from "multer";
import auth_middleware from "../middlewares/auth.middleware.js";
import profile_middleware from "../middlewares/profile.middleware.js";
import profile_controller from "../controllers/profile.controller.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

function profileRoutes (app) {
  app.post("/uploadProfileImage", [
    upload.single("file"), 
    auth_middleware.verifyToken, 
    profile_middleware.validateProfileImage
  ], profile_controller.uploadProfileImage);  
  
  app.get("/profile", auth_middleware.verifyToken, profile_controller.viewProfile);
  app.get("/profileImage", auth_middleware.verifyToken, profile_controller.viewProfileImage);
  
  app.post("/updateBio", [
    auth_middleware.verifyToken, 
    profile_middleware.validateBioUpdate
  ], profile_controller.updateBio);
  
  app.post("/updateSkills", [
    auth_middleware.verifyToken, 
    auth_middleware.isEmployee, 
    profile_middleware.validateSkillsUpdate
  ], profile_controller.updateSkills);
  
  app.post("/updateLanguages", [
    auth_middleware.verifyToken, 
    auth_middleware.isEmployee, 
    profile_middleware.validateLanguagesUpdate
  ], profile_controller.updateLanguages);
  
  app.post("/updateAvailability", [
    auth_middleware.verifyToken, 
    auth_middleware.isEmployee
  ], profile_controller.updateAvailability);
  
  app.post("/updateGithub", [
    auth_middleware.verifyToken, 
    auth_middleware.isEmployee, 
    profile_middleware.validateSocialLinks
  ], profile_controller.updateGithub);
  
  app.post("/updateTwitter", [
    auth_middleware.verifyToken, 
    auth_middleware.isEmployee, 
    profile_middleware.validateSocialLinks
  ], profile_controller.updateTwitter);
  
  app.post("/updateLinkedIn", [
    auth_middleware.verifyToken, 
    auth_middleware.isEmployee, 
    profile_middleware.validateSocialLinks
  ], profile_controller.updateLinkedIn);
  
  app.post("/updateHourlyRate", [
    auth_middleware.verifyToken, 
    auth_middleware.isEmployee, 
    profile_middleware.validateHourlyRate
  ], profile_controller.updateHourlyRate);
}

export default profileRoutes;