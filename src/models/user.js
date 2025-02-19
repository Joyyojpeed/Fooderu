import { model, models, Schema } from "mongoose";
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
  name: { type: String }, // Store name for all users
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: function () { return !this.isGoogleUser; },
    validate: {
      validator: function (pass) {
        if (!this.isGoogleUser && (!pass || pass.length < 5)) {
          throw new Error("Password must be at least 5 characters.");
        }
      },
    },
  },
  isGoogleUser: { type: Boolean, default: false }, // Identify Google users
}, { timestamps: true });

// Hash password only for non-Google users
UserSchema.pre('save', function (next) {
  if (!this.isGoogleUser && this.password) {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }
  next();
});

export const User = models?.User || model("User", UserSchema);
