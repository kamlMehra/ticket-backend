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
      type: Array, // Keeping it as an array for multiple seat bookings
      required: true,
      // validate: {
      //   validator: async function (seatNumbers) {
      //     const TicketBooking = mongoose.model("TicketBooking"); // Use the correct model name

      //     // Check for existing bookings with the same busNumber, seatNumber, and startDate
      //     const existingSeats = await TicketBooking.find({
      //       busNumber: this.busNumber,
      //       startDate: this.startDate, // Include startDate in the query
      //       seatNumber: { $in: seatNumbers },
      //     });

      //     return existingSeats.length === 0; // Validation passes if no conflicts are found
      //   },
      //   message: `The selected seats are already booked for this bus on the specified date. Please choose different seats or date.`,
      // },
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
    visitPurpose:{
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);


export default mongoose.model("TicketBooking", userSchema);
