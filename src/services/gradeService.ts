import { gradeRepo } from "../db/index.js"

export const getGradesByCaseID = async (user_id: number, case_id: number) => {
  if (!user_id || !case_id) {
    throw new StatusError("Missing user ID or case ID", 400);
  }

  const grades = await gradeRepo.getGradesByCaseID(user_id, case_id);
  
  if (!grades) {
    throw new StatusError("Grades not found", 200);
  }
  return grades[0];
}

export const getGradesByUserID = async (user_id: number) => {
  if (!user_id) {
    throw new StatusError("Missing user ID", 400);
  }

  const grades = await gradeRepo.getGradesByUserID(user_id);

  if (grades.length === 0) {
    throw new StatusError("Grades not found", 404);
  }

  return grades;
}

export const upsertGrades = async (user_id: number, case_id: number, grade: number) => {
  if (!user_id || !case_id || !grade) {
    throw new StatusError("Missing user ID, case ID, or grade", 400);
  }

  gradeRepo.upsertGrades(user_id, case_id, grade);
}
