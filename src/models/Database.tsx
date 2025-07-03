// types.ts



// 2) comorbidity
export type Comorbidity = {
  id: number;
  name: string;
};

// 3) diagnosticSource
export type DiagnosticSource = {
  id: number;
  sourceType_id: number;
  name: string;
  address: string;
  phoneNumber: string;
};

// 4) sourceType
export type SourceType = {
  id: number;
  sourceTypecol: string;
};

// 5) patient
export type Patient = {
  id: number;
  fname: string;
  birth: string;        // ISO date string
  phoneNumber: string;
};

// 6) doctor
export type Doctor = {
  id: number;
  fname: string;
  phoneNumber: string;
};

// 7) session
export type Session = {
  id: number;
  s_s_id: number;
};

// 8) student
export type Student = {
  id: number;
  fname: string;
  stuYear: number;
  locker_id: number;
  birth: string;        // ISO date string
  phoneNumber: string;
};

// 9) material
export type Material = {
  id: number;
  name: string;
  priceOf10g: number;
  remainingQuantity: number;

};

// 10) supervisor
export type Supervisor = {
  id: number;
  fname: string;

};

// 11) cases (CASE table)
export type Cases = {
  id: number;
  student_id: number;
  patient_id: number;
  d_s_id: number;
  toothache_id: number;
  isTreated: boolean;
};

// 12) toothache
export type Toothache = {
  id: number;
  name: string;
  course_id: number;
};

// 13) course
export type Course = {
  id: number;
  name: string;
  department_d: number;
  term: string;
  year: number;
};
// 1) S_M (patient–comorbidity)
export type S_M = {
  id: number;
  session_id: number;
  material_id: number;
  amount: number;
};

// 14) s_c (student–course)
export type S_C = {
  id: number;
  course_id: number;
  student_id: number;
};

// 15) s_s (supervisor–case)
export type S_S = {
  id: number;
  supervisor_id: number;
  case_id: number;
};

// 16) s_s_c (supervisor–student_course)
export type S_S_C = {
  id: number;
  s_c_id: number;
  supervisor_id: number;
};

// 17) d_s (doctor–source)
export type D_S = {
  id: number;
  diagnosticSource_id: number;
  diagnosticSource_sourceType_id: number;
  doctor_id: number;
};

// 18) p_c (alias for S_M)
export type P_C = {
  id: number;
  patient_id: number;
  comorbidity_id: number;

};
export type AddSession={
  student_id:number;
  case_id:number;
  course_id:number;
  materials:{name:string, amount:string}[];
}

// Unified table-row union
export type TableRow =
  | S_M
  | Comorbidity
  | DiagnosticSource
  | SourceType
  | Patient
  | Doctor
  | Session
  | Student
  | Material
  | Supervisor
  | Cases
  | Toothache
  | Course
  | S_C
  | S_S
  | S_S_C
  | D_S
  | P_C;

