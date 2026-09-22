import { choice, score, TypeSafeClient } from "@typesafe-ai/sdk";
import { env } from "./env";

export const client = new TypeSafeClient({
  baseURL: "https://api.typesafe.ai",
  logLevel: "off",
  retry: { maxRetries: 0 },
  
  apiKey: env.JEV_TOKEN
});

export const questions = {
  category: choice("このissueを分類するべきカテゴリは次のうちどれですか？", {
    bug: "何かが正常に動作していない報告",
    features: "新機能に関する提案",
    documentation: "ドキュメントに関する提案",
    none: "これらのカテゴリに当てはまらないか、必要な情報がない",
  }),
  priority: score("このissueはどの程度の優先度ですか？", [
    "最優先で対応する必要のある問題",
    "即座に対応する必要がないが、できる限り早く修正するべき問題",
    "即座に対応する必要もなく、加えて緊急性が低い問題",
  ]),
};

export async function labelingIssue(state: {
    title: string,
    content: string
}) {
  return client.systemOne({ model: "jev-latest", state, questions });
}

export type Answers = Awaited<ReturnType<typeof labelingIssue>>["answers"];
