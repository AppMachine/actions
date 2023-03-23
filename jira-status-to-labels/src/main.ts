import * as core from '@actions/core';

import getAllOpenPrs from './clients/getAllOpenPrs'
import addLabelsToIssue from './clients/addLabelsToIssue'
import removeLabelsFromIssue from './clients/removeLabelsFromIssue'
import findIssue from './helpers/findIssue'

async function start() {
  const labelsConfig = core.getInput('labels')
  const token = core.getInput('github-token')
  const statusLabels = labelsConfig.split(',').map(label => label.trim())

  // For debugging
  // const statusLabels = ['QA ready on Preview', 'Merge with Staging', 'QA Fail']

  const pulls = await getAllOpenPrs(token)

  const pullPromises = pulls.map(async (pull) => {
    const ticket = await findIssue(pull)

    if (ticket == null) {
      console.log(`#${pull.number}`, 'Does not contain any ticket key.')
      return
    }

    const status = ticket.fields?.status?.name

    if (status == null) {
      return
    }

    console.log(`#${pull.number}`, `Has Jira status: "${status}"`);

    if (!statusLabels.includes(status)) {
      console.log(`#${pull.number}`, 'Has a ticket status that doesn\'t need to be processed.');
      return
    }

    const prHasAlreadyTheLabel = pull.labels.some((label) => label.name === status)

    if (!prHasAlreadyTheLabel) {
      console.log(`#${pull.number}`, `Adding "${status}" label`);
      await addLabelsToIssue(token, pull.number, [status])
    } else {
      console.log(`#${pull.number}`, 'Labels are up to date');
    }

    const labelsToRemove = statusLabels.filter(label => label !== status)
    const prHasLabelsToRemove = pull.labels.some((label) => labelsToRemove.includes(label.name))

    if (prHasLabelsToRemove) {
      console.log(`#${pull.number}`, 'Has labels to be removed.');
      await removeLabelsFromIssue(token, pull.number, labelsToRemove)
    }
  })

  await Promise.all(pullPromises)
}

try {
  start()
} catch (err: any) {
  throw new Error("Something went wrong", { cause: err });
}
