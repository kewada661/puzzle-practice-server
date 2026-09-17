import { gradeRepo } from "../db/index.js"

export const getGradesByCaseID = async (user_id: number, case_id: number) => {
  if (!user_id || !case_id) {
    throw new StatusError("Missing user ID or case ID", 400);
  }

  const grade = await gradeRepo.getGradesByCaseID(user_id, case_id);
  if (!grade) {
    return { grade: undefined };
  }
  return grade;
}

export const getGradesByUserID = async (user_id: number) => {
  if (!user_id) {
    throw new StatusError("Missing user ID", 400);
  }

  const grades = await gradeRepo.getGradesByUserID(user_id);

  if (grades.length === 0) {
    throw new StatusError("No grades yet", 200);
  }

  return grades;
}

export const upsertGrades = async (user_id: number, case_id: number, grade: number) => {
  if (!user_id) {
    throw new StatusError("Missing user ID, case ID, or grade", 400);
  }
  else if (!case_id) throw new StatusError("Missing case ID.", 400);
  else if (!grade) throw new StatusError("Missing grade.", 400);

  gradeRepo.upsertGrades(user_id, case_id, grade);
}
