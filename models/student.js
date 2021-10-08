const { model, Schema } = require("mongoose");
const {
  reqString,
  departmentField,
  email,
  preSaveHashPassword,
} = require("./schemaFields");

const personalInfo = {
  mobile: { type: String },
  nationality: { type: String },
  category: { type: String },
  aadhar: { type: String },
  dob: { type: Date },
  ageYears: { type: Number },
  physcialDisability: {
    type: Boolean,
    required: true,
  },
  department: departmentField,
  adressPermenant: { type: String },
  adressCorrespondance: { type: String },
};

const academicsUG = {
  institute: { type: String },
  degree: { type: String },
  specialization: { type: String },
  marksFinalYear: { type: Number },
  totalAggregate: { type: Number },
  totalMarks: { type: Number },
  cgpa10: { type: Number },
  percentageMarks: { type: Number },
  dateOfDeclaration: { type: Date },
};

const entranceDetails = {
  entranceExamObtained: { type: String },
  isInterestedCoepRPET: { type: Boolean },
  isInterestedCoepEntrance: { type: Boolean },
  GATE: {
    score: { type: Number },
    lastDateOfValidation: { type: Date },
  },
  sppuPet: {
    details: { type: String },
    year: { type: String },
  },
};

const academicsPG = {
  institute: { type: String },
  degree: { type: String },
  specialization: { type: String },
  marksFinalYear: { type: Number },
  totalAggregate: { type: Number },
  totalMarks: { type: Number },
  cgpa10: { type: Number },
  percentageMarks: { type: Number },
  dateOfDeclaration: { type: Date },
};

const verificationField = {
  type: String,
  default: "pending",
  enum: ["pending", "verified", "mod-req"],
};

const docUploaded = {
  type: { type: String },
  filename: { type: String },
  originalName: { type: String },
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
  },
};

const footerData = {
  date: { type: Date },
  place: { type: String },
};

// TODO : How to store verification data ? (need more info about requirements)
const StudentSchema = Schema(
  {
    name: reqString,
    email: email,
    password: reqString,
    verification: verificationField,
    personalInfo: personalInfo,
    academicsUG: academicsUG,
    academicsPG: academicsPG,
    feeDetails: feeDetails,
    documentsUploaded: [docUploaded],
    remarks: { type: String, default: "" },
    footerData: footerData,
    entranceDetails: entranceDetails,
    mailVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

StudentSchema.pre("save", preSaveHashPassword);

const Student = model("student", StudentSchema, "students");

module.exports = Student;
