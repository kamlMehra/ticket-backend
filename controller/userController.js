import User from "../models/userModel.js";

export const create = async (req, res) => {
  try {
    const {startDate, busNumber, seatNumber, endDate, visitPurpose, toLocation , fromLocation, mobileNumber,ticketPrice,name
    } = req.body;
    if(
      !startDate || !busNumber || !seatNumber || !endDate || !visitPurpose || !toLocation || !fromLocation || !mobileNumber || !ticketPrice, !name
    ){
      return res.status(400).json({message: "All fields are required"})
    }


    const isAlreadyExits = await User.findOne({busNumber, startDate, seatNumber});
    if(isAlreadyExits){
      return res.status(400).json({message: "Seat already booked"})
    }

    const createNewTickets = await User.create({
      busNumber,
      startDate,
      seatNumber,
      endDate,
      visitPurpose,
      toLocation,
      fromLocation,
      mobileNumber,
      ticketPrice,
      name
    });

    if(!createNewTickets){
      return res.status(400).json({message: "Failed to create ticket"})
    }
   return  res.status(200).json(createNewTickets);
   
  } catch (error) {
   return res.status(500).json({ errorMessage: error });
  }
};

export const getallticket = async (req, res) => {
  try {
    const allTicket = await User.find();
    if (!allTicket || allTicket.length === 0) {
      return res.status(404).json({ message: "Tickets not Found!" });
    }
    res.status(200).json(allTicket);
  } catch (error) {
    res.status(500).json({ errorMessage: error });
  }
};

export const getTicketsByNumber = async (req, res) => {
  try {
    const number = req.params.mobileNumber;
    const tickets = await User.find({ mobileNumber: number });
    if (tickets.length === 0) {
      return res.status(404).json({ message: "Tickets not Found!" });
    }
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const allTicket = await User.findById(id);
    if (!allTicket) {
      return res.status(404).json({ message: "Ticket not Found!" });
    }
    const updatedTicket = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const cancelTicket = async(req,res)=>{
  try {
    const id = req.params.id;
    const ticketCancel = await User.findById(id);
    if(!ticketCancel){
      return res.status(404).json({ message: "Ticekt not Found!" });
    }
    const deletedTicket = await User.findByIdAndDelete(id, req.body, {
      new: true,
    })
    res.status(200).json(deletedTicket);
  } catch (error) {
    res.status(500).json({errorMessage: error.message})
  }
}
