import mongoose from "mongoose";
import FileSchema from "./schemas/fileSchema";
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model("set");
  } catch (error) {
    // continue, because model doesnt exist
  }

  const SetSchema = new Schema(
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      tenant: {
        type: Schema.Types.ObjectId,
        ref: "tenant",
        required: true,
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      updatedBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      importHash: { type: String },
    },
    { timestamps: true }
  );

  SetSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: "string" },
      },
    }
  );

  SetSchema.virtual("id").get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  SetSchema.set("toJSON", {
    getters: true,
  });

  SetSchema.set("toObject", {
    getters: true,
  });

  return database.model("set", SetSchema);
};
