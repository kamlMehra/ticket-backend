import User from "../models/userModel.js";

export const create = async (req, res) => {
  try {
    const newUser = new ticket() - bookings(req.body);
    const { mobileNumber } = newUser;
    // const useExist = await User.findOne({ mobileNumber });
    // if (useExist) {
    //   return res.status(400).json({ message: "User Already Exist." });
    // }
    const savedTicket = await newUser.save();
    res.status(200).json(savedTicket);
  } catch (error) {
    res.status(500).json({ errorMessage: error });
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
