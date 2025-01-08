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
    busNumber: {
      type: String,
      required: true,
    },
    seatNumber: {
      type: Array,
      required: true,
      validate: {
        validator: async function (seatNumbers) {
          const TicketBooking = mongoose.model("TicketBooking"); // Use the correct model name

          // Check for existing bookings with the same busNumber, seatNumber, and startDate
          const existingSeats = await TicketBooking.find({
            busNumber: this.busNumber,
            startDate: this.startDate, // Include startDate in the query
            seatNumber: { $in: seatNumbers },
          });

          return existingSeats.length === 0; // Validation passes if no conflicts are found
        },
        message: `The selected seats are already booked for this bus on the specified date. Please choose different seats or date.`,
      },
    },
  },
  {
    timestamps: true,
  }
);


export default mongoose.model("TicketBooking", userSchema);
