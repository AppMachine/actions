# Actions

Open-source Shared Github Actions of AppMachine.

## Jira Status to labels Action

This action reads the list of open PRs. After that it will check every PR with a ticket in the PR title or branch name. After that it will add labels based on the status of JIRA ticket. If the status is `QA Ready Preview`. It will add the label to PR.

This is useful if you want to see the current ticket status in the github PR overview.

Action Usage:

```yml
name: Jira Status to Github labels

on:
  schedule:
    - cron: "0 * * * *"

jobs:
  add-labels:
    name: Add labels from Jira tickets
    runs-on: ubuntu-latest
    steps:
      - name: Checkout 🛎
        uses: actions/checkout@v3

      - name: Setup Node 🗃
        uses: actions/setup-node@v2.4.1
        with:
          node-version: 16

      - name: Check PRS
        uses: 'AppMachine/actions/jira-status-to-labels@main'
        with:
          labels: 'QA ready on Preview, QA Preview OK, Merge with Staging, QA Fail'
        env:
          JIRA_BASE_URL: ${{ secrets.JIRA_BASE_URL }}
          JIRA_USER_EMAIL: ${{ secrets.JIRA_USER_EMAIL }}
          JIRA_API_TOKEN: ${{ secrets.JIRA_API_TOKEN }}
```

## Jira PR Approved Action

This action can transition Jira tickets and add labels to the PR

Action Usage:

```yml
name: Jira Status to Github labels

on:
  schedule:
    - cron: "0 * * * *"

jobs:
  add-labels:
    name: Add labels from Jira tickets
    runs-on: ubuntu-latest
    steps:
      - name: Checkout 🛎
        uses: actions/checkout@v3

      - name: Setup Node 🗃
        uses: actions/setup-node@v2.4.1
        with:
          node-version: 16

      - name: Check PRS
        uses: 'AppMachine/actions/jira-status-to-labels@main'
        with:
          labels: 'QA ready on Preview, QA Preview OK, Merge with Staging, QA Fail'
        env:
          JIRA_BASE_URL: ${{ secrets.JIRA_BASE_URL }}
          JIRA_USER_EMAIL: ${{ secrets.JIRA_USER_EMAIL }}
          JIRA_API_TOKEN: ${{ secrets.JIRA_API_TOKEN }}
```

