import express from "express";


import { cancelTicket, create, getallticket, getTicketsByNumber, update, getBus, getBusByNumber, addBus, updateBus, deleteBus, deleteTicketsByBusNumber, updateTicketsBusNumber, getTicketsByBusNumber } from "../controller/userController.js";

const route = express.Router();

route.post("/book", create);
route.get("/ticket", getallticket);
route.put("/update/:id",update);
route.get('/ticket/:mobileNumber', getTicketsByNumber);
route.delete("/cancel/:id", cancelTicket);
route.get("/bus", getBus);
route.get("/bus/:busNumber", getBusByNumber);
route.post("/addbus", addBus);
route.put("/updatebus/:id", updateBus);
route.delete("/deletebus/:id", deleteBus);
route.delete("/tickets/:busNumber", deleteTicketsByBusNumber);
route.get("/ticketbybus/:busNumber", getTicketsByBusNumber);
route.put("/tickets/:busNumber", updateTicketsBusNumber);

export default route;
