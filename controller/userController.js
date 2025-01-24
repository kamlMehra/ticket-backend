import User from "../models/userModel.js";
import Bus from "../models/busModel.js";

export const create = async (req, res) => {
  try {
    const {startDate, busNumber, seatNumber, endDate, visitPurpose, toLocation , fromLocation, mobileNumber,ticketPrice,name
    } = req.body;
    if(
      !startDate || !busNumber || !seatNumber || !endDate || !visitPurpose || !toLocation || !fromLocation || !mobileNumber || !ticketPrice, !name
    ){
      return res.status(400).json({message: "All fields are required"})
    }


    const isAlreadyExits = await User.findOne({busNumber, seatNumber});
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

export const createTicket = async(req,res)=>{
  try {
    const {name, mobileNumber, busNumber, seatNumber} = req.body;
    if(!name || !mobileNumber || !busNumber || !seatNumber){
      return res.status(400).json({message: "All fields are required"})
    }
    const isAlreadyExits = await User.findOne({seatNumber,busNumber});
    if(isAlreadyExits){
      return res.status(400).json({message: "seat already booked"})
    }   
    const createNewTicket = await User.create({
      name,
      mobileNumber,
      busNumber,
      seatNumber
    })
    if(!createNewTicket){
      return res.status(400).json({message: "Failed to create ticket"})
    }
   return  res.status(200).json(createNewTicket);
  } catch (error) {
    res.status(500).json({errorMessage: error.message})
  }
}

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

export const getTicketsByBusNumber = async (req, res) => {
  try {
    const busnumber = req.params.busNumber;
    const tickets = await User.find({ busNumber: busnumber });
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


export const getBus = async(req,res)=>{
  try {
    const bus = await Bus.find();
    if(!bus){
      return res.status(404).json({message: "Bus not Found!"});
    }
    res.status(200).json(bus);
  } catch (error) {
    res.status(500).json({errorMessage: error.message})
  }
} 

export const getBusByNumber = async(req,res)=>{
  try {
    const busNumber = req.params.busNumber;
    const bus = await Bus.find({busNumber});
    if(!bus){
      return res.status(404).json({message: "Bus not Found!"});
    }
    res.status(200).json(bus);
  } catch (error) {
    res.status(500).json({errorMessage: error.message})
  }
}

export const addBus = async(req,res)=>{
  try {
    const {busNumber, totalSeat, availableSeat, ticketPrice, startDate, startTime, fromLocation, toLocation, visitPurpose} = req.body;
    if(!busNumber || !totalSeat || !availableSeat || !ticketPrice || !startDate || !startTime || !fromLocation || !toLocation){
      return res.status(400).json({message: "All fields are required"})
    } 
    const isAlreadyExits = await Bus.findOne({busNumber});
    if(isAlreadyExits){
      return res.status(400).json({message: "Bus already exists"})
    } 
    const createNewBus = await Bus.create({
      busNumber,
      totalSeat,
      availableSeat,
      ticketPrice,
      startDate,
      startTime,
      fromLocation,
      toLocation,
      visitPurpose
    })  
    if(!createNewBus){
      return res.status(400).json({message: "Failed to create bus"})
    }
    res.status(200).json(createNewBus);
  } catch (error) {
    res.status(500).json({errorMessage: error.message})
  }
} 

export const updateBus = async(req,res)=>{
  try {
    const id = req.params.id;
    const bus = await Bus.findById(id);
    if(!bus){
      return res.status(404).json({message: "Bus not Found!"});
    }
    const updatedBus = await Bus.findByIdAndUpdate(id, req.body, {new: true});
    res.status(200).json(updatedBus);
  } catch (error) {
    res.status(500).json({errorMessage: error.message})
  }
}   

export const deleteBus = async(req,res)=>{
  try {
    const id = req.params.id;
    const bus = await Bus.findById(id);
    if(!bus){
      return res.status(404).json({message: "Bus not Found!"});
    }
    const deletedBus = await Bus.findByIdAndDelete(id);
    res.status(200).json(deletedBus);
  } catch (error) {
    res.status(500).json({errorMessage: error.message})
  }
} 

export const deleteTicketsByBusNumber = async (req, res) => {
  try {
    const busNumber = req.params.busNumber;

    // Check if any tickets exist for the given bus number
    const tickets = await User.find({ busNumber });
    console.log(tickets)
    if (tickets.length === 0) {
      return res.status(404).json({ message: "No tickets found for this bus number!" });
    }

    // Delete tickets
    const deletedTickets = await User.deleteMany({ busNumber });

    // Send response after deletion
    return res.status(200).json({
      message: `${deletedTickets.deletedCount} ticket(s) deleted successfully.`,
    });
  } catch (error) {
    // Handle any errors and return the response once
    return res.status(500).json({ errorMessage: error.message });
  }
};

// export const updateTicketsBusNumber = async (req, res) => {
//   try {
//     const busNumber = req.params.busNumber;

//     // Validate input
//     if (!oldBusNumber || !newBusNumber) {
//       return res.status(400).json({ message: "Both old and new bus numbers are required." });
//     }

//     // Check if any tickets exist with the old bus number
//     const tickets = await User.find({ busNumber: oldBusNumber });
//     if (tickets.length === 0) {
//       return res.status(404).json({ message: "No tickets found with the given old bus number." });
//     }

//     // Update bus number for all matching tickets
//     console.log(tickets);
//     // const updatedTickets = await tickets.updateMany(
//     //   { busNumber: oldBusNumber },
//     //   { $set: { busNumber: newBusNumber } }
//     // );

//     const updatedTickets = await User.updateMany(
//       { busNumber: oldBusNumber },
//       { busNumber: newBusNumber }
//     )

//     return res.status(200).json({
//       message: `${updatedTickets.modifiedCount} ticket(s) updated successfully.`,
//     });
//   } catch (error) {
//     return res.status(500).json({ errorMessage: error.message });
//   }
// };

export const updateTicketsBusNumber = async (req, res) => {
  try {
    const busNumber = req.params.busNumber;
    const {newBusNumber} = req.body;

    if(!busNumber || !newBusNumber){
      return res.status(400).json({message: "Bus number is required"})
    }

    const tickets = await User.find({busNumber})  
    console.log(tickets)
    if(tickets.length === 0){
      return res.status(404).json({message: "No tickets found with the given bus number"})
    }

    const updatedTickets = await User.updateMany({busNumber}, {busNumber: newBusNumber}, {new: true})  
    return res.status(200).json({
      message: `${updatedTickets.modifiedCount} ticket(s) updated successfully.`,
    });
  } catch (error) {
    return res.status(500).json({errorMessage: error.message})
  }
}   
    
