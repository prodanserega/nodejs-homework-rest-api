const { Schema, model } = require("mongoose");
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      trsnsform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

contactSchema.path("name").validate(function (value) {
  const re = /\b[A-Z][-'a-zA-Z]+,?\s[A-Z][-'a-zA-Z]{0,19}\b/;
  return re.test(String(value));
});

const Contact = model("contact", contactSchema);

module.exports = Contact;