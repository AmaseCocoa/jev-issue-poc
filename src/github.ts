import { App, Octokit } from "octokit";
import { env } from "./env";

export async function useOctokit() {
  const app = new App({
    appId: env.APP_ID,
    privateKey: env.APP_PRIVATE_KEY,
  });

  const response = await app.octokit.request(
    "POST /app/installations/{installation_id}/access_tokens",
    {
      installation_id: env.APP_INSTALLATION_ID,
    }
  );

  const octokit = new Octokit({
    auth: response.data.token
  })

  return octokit;
}

export async function addLabels({ labels }: {
  labels: string[]
}) {
  const octokit = await useOctokit();
  const { data } = await octokit.rest.issues.addLabels({
    owner: env.GITHUB_REPO_OWNER,
    repo: env.GITHUB_REPO,
    issue_number: env.GITHUB_ISSUE,

    labels
  });

  return data
}
