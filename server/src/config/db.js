// import mongoose from "mongoose";

// export const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("MongoDB connected");
//   } catch (err) {
//     console.error("MongoDB connection error:", err.message);
//     process.exit(1);
//   }
// };

// src/config/db.js
import mongoose from "mongoose";

export async function connectDB(retry = 0) {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error(`MongoDB connection error (attempt ${retry+1}):`);
    console.error(err && err.stack ? err.stack : err);
    // retry after delay instead of crashing
    setTimeout(() => connectDB(retry + 1), Math.min(5000 * (retry + 1), 30000));
  }
}
