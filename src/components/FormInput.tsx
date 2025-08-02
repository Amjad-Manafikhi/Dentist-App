// types-and-inputs.ts
export type InputType ={
  name:string;
  type:  "text" | "number" | "date" | "checkbox" | "tel";
}
// 1) S_M (patient–comorbidity)
export const s_mInput:InputType[] = [
  { name: "id",             type: "number" },
  { name: "session_id", type: "number" },
  { name: "material_id",     type: "number" },
  { name: "amount",       type: "number"   },
];

// 2) comorbidity
export const comorbidityInput:InputType[] = [
  { name: "id",   type: "number" },
  { name: "name", type: "text"   },
];

// 3) diagnosticSource
export const diagnosticSourceInput:InputType[] = [
  { name: "id",            type: "number" },
  { name: "sourceType_id", type: "number" },
  { name: "name",          type: "text"   },
  { name: "address",       type: "text"   },
  { name: "phoneNumber",   type: "text"   },
];

// 4) sourceType
export const sourceTypeInput:InputType[] = [
  { name: "id",             type: "number" },
  { name: "sourceTypecol",  type: "text"   },
];

// 5) patient
export const patientInput:InputType[] = [
  { name: "id",          type: "number" },
  { name: "fname",       type: "text"   },
  { name: "birth",       type: "date"   },
  { name: "phoneNumber", type: "text"   },
];

// 6) doctor
export const doctorInput:InputType[] = [
  { name: "id",          type: "number" },
  { name: "fname",       type: "text"   },
  { name: "phoneNumber", type: "text"   },
];

// 7) session
export const sessionInput:InputType[] = [
  { name: "id",     type: "number" },
  { name: "s_s_id", type: "number" },
];

// 8) student
export const studentInput:InputType[] = [
  { name: "id",          type: "number" },
  { name: "fname",       type: "text"   },
  { name: "stuYear",     type: "number" },
  { name: "locker_id",   type: "number" },
  { name: "birth",       type: "date"   },
  { name: "phoneNumber", type: "text"   },
];

// 9) material
export const materialInput:InputType[] = [
  { name: "id",                type: "number" },
  { name: "name",              type: "text"   },
  { name: "priceOf10g",        type: "number" },
  { name: "remainingQuantity", type: "number" },
];

// 10) supervisor
export const supervisorInput:InputType[] = [
  { name: "id",    type: "number" },
  { name: "fname", type: "text"   },
];

// 11) cases (the CASE table)
export const casesInput:InputType[] = [
  { name: "id",           type: "number" },
  { name: "student_id",   type: "number" },
  { name: "patient_id",   type: "number" },
  { name: "d_s_id",       type: "number" },
  { name: "toothache_id", type: "number" },
  { name: "isTreated",    type: "checkbox" }, // boolean
];

// 12) toothache
export const toothacheInput:InputType[] = [
  { name: "id",   type: "number" },
  { name: "name", type: "text"   },
  { name: "course_id", type: "number" },
];

// 13) course
export const courseInput:InputType[] = [
  { name: "id",            type: "number" },
  { name: "name",          type: "text"   },
  { name: "department_id", type: "number"   },
  { name: "term",          type: "text"   },
  { name: "year",          type: "number"   },
];

// 14) s_c (student–course)
export const s_cInput:InputType[] = [
  { name: "id",         type: "number" },
  { name: "course_id",  type: "number" },
  { name: "student_id", type: "number" },
];

// 15) s_s (supervisor–case)
export const s_sInput:InputType[] = [
  { name: "id",            type: "number" },
  { name: "supervisor_id", type: "number" },
  { name: "case_id",       type: "number" },
];

// 16) s_s_c (supervisor–student_course)
export const s_s_cInput:InputType[] = [
  { name: "id",          type: "number" },
  { name: "s_c_id",      type: "number" },
  { name: "supervisor_id", type: "number" },
];

// 17) d_s (doctor–source)
export const d_sInput:InputType[] = [
  { name: "id",                             type: "number" },
  { name: "diagnosticSource_id",            type: "number" },
  { name: "diagnosticSource_sourceType_id", type: "number" },
  { name: "doctor_id",                      type: "number" },
];

// 18) p_c (patient–comorbidity)
export const p_cInput:InputType[] = [
  { name: "id",             type: "number" },
  { name: "patient_id",     type: "number" },
  { name: "comorbidity_id", type: "number" },

];  // alias for S_M

export const noFormInput:InputType[]=[
  
]



// ----------------------------------------------------------------------------
// Map of table-name → its form-fields
// ----------------------------------------------------------------------------
export const inputMap = {
  comorbidity:    comorbidityInput,
  diagnosticSource: diagnosticSourceInput,
  sourceType:     sourceTypeInput,
  patient:        patientInput,
  doctor:         doctorInput,
  session:        sessionInput,
  student:        studentInput,
  material:       materialInput,
  supervisor:     supervisorInput,
  cases:          casesInput,
  toothache:      toothacheInput,
  course:         courseInput,
  s_m:            s_mInput,
  s_c:            s_cInput,
  s_s:            s_sInput,
  s_s_c:          s_s_cInput,
  d_s:            d_sInput,
  p_c:            p_cInput,
  noForm:         noFormInput
};
