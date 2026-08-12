import { algorithmRepo } from "../db/index.js"

export const getAlgorithms = async (user_id: number, case_id: number) => {
  if (!user_id || !case_id) {
    throw new StatusError("Missing user ID or case ID", 400);
  }

  const algorithms = await algorithmRepo.getAlgorithmsByCaseID(user_id, case_id);
  return algorithms;
}

export const postAlgorithms = async (user_id: number, case_id: number, algorithm: string) => {
  if (!user_id || !case_id) {
    throw new StatusError("Missing user ID or case ID", 400);
  }

  algorithmRepo.insertAlgorithms(user_id, case_id, algorithm);
}

export const patchAlgorithms = async (alg_id: number, algorithm: string) => {
  if (!alg_id) {
    throw new StatusError("Missing algorithm ID", 400);
  }

  algorithmRepo.updateAlgorithms(alg_id, algorithm);
}

export const deleteAlgorithms = async (alg_id: number) => {
  if (!alg_id) {
    throw new StatusError("Missing algorithm ID", 400);
  }

  algorithmRepo.deleteAlgorithms(alg_id);
}