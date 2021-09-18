const { model, Schema } = require("mongoose");
const {
  reqString,
  departmentField,
  email,
  reqNumber,
  preSaveHashPassword,
} = require("./schemaFields");

const personalInfo = {
  name: reqString,
  mobile: reqString,
  nationality: reqString,
  category: reqString,
  aadhar: reqString,
  dob: { type: Date },
  ageYears: { type: Number },
  physcialDisability: {
    type: Boolean,
    required: true,
  },
  department: departmentField,
  adressPermenant: reqString,
  adressCorrespondance: reqString,
};

const academicsUG = {
  institute: reqString,
  degree: reqString,
  specialization: reqString,
  marksFinalYear: reqNumber,
  totalAggregate: reqNumber,
  totalMarks: reqNumber,
  cgpa10: reqNumber,
  percentageMarks: reqNumber,
  dateOfDeclaration: { type: Date },
};

const entranceDetailsPG = {
  entranceExamObtained: reqString,
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
  institute: reqString,
  degree: reqString,
  specialization: reqString,
  marksFinalYear: reqNumber,
  totalAggregate: reqNumber,
  totalMarks: reqNumber,
  cgpa10: reqNumber,
  percentageMarks: reqNumber,
  dateOfDeclaration: { type: Date },
  entranceDetails: entranceDetailsPG,
};

const docUploaded = {
  type: reqString,
  filename: reqString,
  originalName: reqString,
};

const feeDetails = {
  utrDuNumber: reqString,
  amount: reqString,
  transactionTime: { type: Date },
  bank: reqString,
  docUploaded: docUploaded,
};

const footerData = {
  date: { type: Date },
  place: reqString,
};
personalInfoSchema = Schema(personalInfo);
academicsUGSchema = Schema(academicsUG);
academicsPGSchema = Schema(academicsPG);
feeDetailsSchema = Schema(feeDetails);
footerDataSchema = Schema(footerData);

// TODO : How to store verification data ? (need more info about requirements)
const StudentSchema = Schema(
  {
    email: email,
    password: reqString,
    personalInfo: personalInfoSchema,
    academicsUG: academicsUGSchema,
    academicsPG: academicsPGSchema,
    feeDetails: feeDetailsSchema,
    documentsUploaded: [docUploaded],
    footerData: footerDataSchema,
  },
  { timestamps: true }
);

StudentSchema.pre("save", preSaveHashPassword);

const Student = model("student", StudentSchema, "student");

module.exports = Student;
