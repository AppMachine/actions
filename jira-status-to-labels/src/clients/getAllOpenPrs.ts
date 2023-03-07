// import { GitHub } from '@actions/github/lib/utils'
import { context, getOctokit } from '@actions/github'
import { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/parameters-and-response-types'

// Github Internally issues are also PRS
type PullRequests = RestEndpointMethodTypes["pulls"]['list']["response"]['data']
export type PullRequest = PullRequests[0]

const getAllOpenPrs = async (token: string): Promise<PullRequests> => {
  const client = getOctokit(token);

  try {
    const issueResult = await client.rest.pulls.list({
      owner: context.repo.owner,
      repo: context.repo.repo,
      state: 'open',
      per_page: 100,
      direction: 'asc'
    });

    return issueResult.data
  } catch (error) {
    console.log(error);

    return Promise.resolve([]);
  }

}

export default getAllOpenPrs
