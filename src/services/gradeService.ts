import { gradeRepo } from "../db/index.js"

export const getGrades = async (user_id: number, case_id: number) => {

}

export const upsertGrades = async (user_id: number, case_id: number, grade: number) => {
  if (!user_id || !case_id || !grade) {
    throw new StatusError("Missing user ID, case ID, or grade", 400);
  }

  gradeRepo.upsertGrades(user_id, case_id, grade);
}
