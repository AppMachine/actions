// import { GitHub } from '@actions/github/lib/utils'
import { context, getOctokit } from '@actions/github'
import { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/parameters-and-response-types'

// Github Internally issues are also PRS
type PullRequests = RestEndpointMethodTypes["pulls"]['list']["response"]['data']
export type PullRequest = PullRequests[0]

const addLabelsToIssue = async (token:string, issueNumber: number, labels: string[]) => {
  const client = getOctokit(token);

  try {
    await client.rest.issues.addLabels({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: issueNumber,
      labels,
    });

  } catch (error) {
    console.log(error);
  }
}

export default addLabelsToIssue
