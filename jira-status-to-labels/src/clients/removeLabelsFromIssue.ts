// import { GitHub } from '@actions/github/lib/utils'
import { context, getOctokit } from '@actions/github'
import { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/parameters-and-response-types'

// Github Internally issues are also PRS
type PullRequests = RestEndpointMethodTypes["pulls"]['list']["response"]['data']
export type PullRequest = PullRequests[0]

const removeLabelsFromIssue = async (token:string, issueNumber: number, labels: string[]) => {
  const client = getOctokit(token);

  try {
    const removeLabelsPromises = labels.map((label) => client.rest.issues.removeLabel({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: issueNumber,
      name: label
    }))

    await Promise.all(removeLabelsPromises);

  } catch (error) {
    console.log(error);
  }
}

export default removeLabelsFromIssue
