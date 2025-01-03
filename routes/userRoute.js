import express from "express";

import { cancelTicket, create, getallticket, getTicketsByNumber, update } from "../controller/userController.js";

const route = express.Router();

route.post("/book", create);
route.get("/ticket", getallticket);
route.put("/update/:id",update);
route.get('/ticket/:mobileNumber', getTicketsByNumber);
route.delete("/cancel/:id", cancelTicket)
export default route;
