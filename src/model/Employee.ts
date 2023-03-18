import { Document, model, Schema } from "mongoose";
import { IEmployees } from "../interfaces/interface";

const employeeSchema = new Schema<IEmployees>({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
});

module.exports = model<IEmployees>("Employee", employeeSchema);
