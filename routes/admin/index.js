import { Router } from "express";
import home from "./home";
import login from "./login";
import dashboard from "./dashboard";
import protectRoute, { csrfProtection } from "../../utils/protectRoute";
import logOut from "./logout";
import moderatePost from "./moderate-post";
import signUpAdmin from "./signup-admin";
import {
  loginAdminValidation,
  signUpAdminValidation,
} from "../../utils/validation";

const router = Router();

router.get("/", home);
router
  .route("/login")
  .get(csrfProtection, (req, res) =>
    res.render("login", { csrfToken: req.csrfToken() })
  )
  .post(csrfProtection, loginAdminValidation, login);
router
  .route("/signup")
  .get(csrfProtection, (req, res) =>
    res.render("signup", { csrfToken: req.csrfToken() })
  )
  .post(csrfProtection, signUpAdminValidation, signUpAdmin);
router.get(
  "/dashboard",
  protectRoute("/admin/login"),
  csrfProtection,
  dashboard
);
router.get("/logout", logOut);
router.post(
  "/moderate",
  protectRoute("/admin/login"),
  csrfProtection,
  moderatePost
);

export default router;
