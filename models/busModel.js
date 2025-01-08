import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
  busNumber: {
    type: String,
    required: true,
  },
  totalSeat: {
    type: Number,
    required: true,
  },
  availableSeat: {
    type: Number,
    required: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  fromLocation: {
    type: String,
    required: true,
  },
  toLocation: {
    type: String,
    required: true,
  },
  visitPurpose: {
    type: String,
    required: true,
  },    
}, {
  timestamps: true,
});

export default mongoose.model("Bus", busSchema);
