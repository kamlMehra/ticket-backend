import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    mobileNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v); 
        },
        message: `Please enter a valid number!`,
      },
    },
    ticketPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    busNumber: {
      type: Number,
      required: true, 
    },
    seatNumber: {
      type: Array,
      required: true,
      validate: {
        validator: async function (seatNumbers) {
          const existingSeats = await mongoose
            .model("Ticket-booking")
            .find({ busNumber: this.busNumber, seatNumber: { $in: seatNumbers } });

          return existingSeats.length === 0; 
        },
        message: `The selected seats are already booked for this bus. Please choose different seats.`,
      },
    },
    fromLocation: {
      type: String,
      required: true,
    },
    toLocation: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Ticket-booking", userSchema);
