import { Answers, labelingIssue } from "./priority";
import { env } from "./env";
import { addLabels } from "./github";

export async function check(answers: Answers) {
  const { category, priority } = answers;
  const roundedScore = Math.round(priority.score)

  const labels: string[] = [];

  if (category.choice === "none") {
    return
  } else if (category.choice === "bug") {
    labels.push(env.config.category.bug)
  } else if (category.choice === "documentation") {
    labels.push(env.config.category.documentation)
  } else if (category.choice === "features") {
    labels.push(env.config.category.features)
  }

  if (roundedScore == 0) {
    labels.push(env.config.priority.high)
  } else if (roundedScore === 1) {
    labels.push(env.config.priority.middle)
  } else if (roundedScore === 2) {
    labels.push(env.config.priority.low)
  }

  await addLabels({
    labels
  })
}

(async () => {
  const resp = await labelingIssue({
    title: env.ISSUE_TITLE,
    content: env.ISSUE_BODY
  })
  await check(resp.answers)
})();
