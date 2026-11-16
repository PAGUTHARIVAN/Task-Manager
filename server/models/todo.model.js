import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  //Data fields
  {
    text: {
      type: String,
      trim: true,
      required: [true, "Text is required"],
    },
    done: {
      type: Boolean,
      default: false,
    },
  },
  //Data options
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
      },
    },
  },
);
export const Todo = mongoose.model("Todo", todoSchema);
