const { model, Schema } = require("mongoose");
const {
  reqString,
  departmentField,
  email,
  mobile,
  preSaveHashPassword,
} = require("./schemaFields");

const verificationField = {
  type: String,
  default: "pending",
  enum: ["pending", "verified", "mod_req"],
};

const personalInfo = {
  name: { type: String },
  middleName: { type: String },
  email: { type: String },
  gender: { type: String },
  mobile: { type: String },
  motherName: { type: String },
  nationality: { type: String },
  category: { type: String },
  aadhar: { type: String },
  dob: { type: Date },
  ageYears: { type: Number },
  physicallyDisabled: { type: String },
  department: departmentField,
  address: { type: String },
  adressCorrespondance: { type: String },
  verification: verificationField,
  remarks: { type: String, default: "" },
};

const academicsUG = {
  institute: { type: String },
  degree: { type: String },
  specialization: { type: String },
  // marksFinalYear: { type: Number },
  //totalAggregate: { type: Number },
  //totalMarks: { type: Number },
  cgpa10: { type: Number },
  percentageMarks: { type: Number },
  dateOfDeclaration: { type: Date },
  verification: verificationField,
  remarks: { type: String, default: "" },
  
};

const academicsPG = {
  institute: { type: String },
  degree: { type: String },
  specialization: { type: String },
  // marksFinalYear: { type: Number },
  //totalAggregate: { type: Number },
  //totalMarks: { type: Number },
  cgpa10: { type: Number },
  percentageMarks: { type: Number },
  dateOfDeclaration: { type: Date },
  verification: verificationField,
  remarks: { type: String, default: "" },
};

const entranceDetails = {
  givenGate: { type: Boolean },
  givenPet: { type: Boolean },
  isInterestedCoepRPET: { type: Boolean },
  isInterestedCoepEntrance: { type: Boolean },
  Gate: {
    score: { type: String },
    lastDateOfValidation: { type: Date },
  },
  sppuPet: {
    details: { type: String },
    year: { type: String },
  },
  verification: verificationField,
  remarks: { type: String, default: "" },
};

const docUploaded = {
  type: { type: String },
  filename: { type: String },
  originalName: { type: String },
  contentType: { type: String },
  verification: verificationField,
};

const feeDetails = {
  utrDuNumber: { type: String },
  amount: { type: String },
  transactionTime: { type: Date },
  bank: { type: String },
  verification: verificationField,
  remarks: { type: String, default: "" },
  docUploaded: {
    type: { type: String },
    filename: { type: String },
    originalName: { type: String },
    contentType: { type: String },
  },
};

// TODO : How to store verification data ? (need more info about requirements)
const StudentSchema = Schema(
  {
    name: reqString,
    email: email,
    mobile: { type: String },
    password: reqString,
    applicationId: { type: String },
    personalInfo: personalInfo,
    academicsUG: academicsUG,
    academicsPG: academicsPG,
    feeDetails: feeDetails,
    infoVerified: verificationField,
    documentsUploaded: [docUploaded],
    remarks: { type: String, default: "" },
    entranceDetails: entranceDetails,
    mailVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
    mobileVerified: {
      type: Boolean,
      default: true,
      required: true,
    },
    editable: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  { timestamps: true }
);

StudentSchema.pre("save", preSaveHashPassword);

const Student = model("student", StudentSchema, "students");

module.exports = Student;
