import {PullRequest} from '../clients/getAllOpenPrs'
import Jira from '../clients/Jira'

const issueIdRegEx = /([a-zA-Z0-9]+-[0-9]+)/g

const findIssueById = async(searchString: string) => {
  const jira = new Jira({
    baseUrl: process.env.JIRA_BASE_URL,
    token: process.env.JIRA_API_TOKEN,
    email: process.env.JIRA_USER_EMAIL,
  })

  const match = searchString.match(issueIdRegEx)

  if (!match) {
    return
  }

  for (const issueKey of match) {
    const issue = await jira.getIssue(issueKey)

    if (issue) {
      return issue
    }
  }
}

export const findIssue = async (pr: PullRequest) => {
  const prTitle = pr.title
  const branchName = pr.head.ref

  let ticket

  ticket = await findIssueById(prTitle)

  if (ticket) return ticket

  ticket = await findIssueById(branchName)

  if (ticket) return ticket

  return undefined
}

export default findIssue
