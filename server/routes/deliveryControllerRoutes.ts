import express from "express";
import {
  assignDelivery,
  cancelDelivery,
  completeDelivery,
  getDeliveryDetail,
  loginPartner,
  updateliveLocation,
} from "../controllers/deliveryController.js";
import deliveryAuth from "../middleware/deliveryAuth.js";
import { updateDeliveryPartner } from "../controllers/adminController.js";

const deliveryPartnerRouter = express.Router();

deliveryPartnerRouter.post("/login", loginPartner);
deliveryPartnerRouter.get("/my-deliveries", deliveryAuth, assignDelivery);
deliveryPartnerRouter.get(
  "/my-deliveries/:id",
  deliveryAuth,
  getDeliveryDetail,
);
deliveryPartnerRouter.put(
  "/my-deliveries/:id/complete",
  deliveryAuth,
  completeDelivery,
);
deliveryPartnerRouter.put(
  "/my-deliveries/:id/cancel",
  deliveryAuth,
  cancelDelivery,
);
deliveryPartnerRouter.put(
  "/my-deliveries/:id/status",
  deliveryAuth,
  updateDeliveryPartner,
);
deliveryPartnerRouter.put(
  "/my-deliveries/:id/status",
  deliveryAuth,
  updateliveLocation,
);

export default deliveryPartnerRouter;
