import fetch, { RequestInit } from 'node-fetch'
import { JiraIssue } from '../types'

export default class Jira {
  baseUrl: string
  token: string
  email:string

  constructor ({ baseUrl, token, email }) {
    this.baseUrl = baseUrl
    this.token = token
    this.email = email
  }

  async getIssue (issueId: string, query: Record<string, []> = {}): Promise<JiraIssue | undefined> {
    const { fields = [], expand = [] } = query

    try {
      const res = await this.fetch({
        pathname: `/rest/api/2/issue/${issueId}`,
        query: [
          ['fields',fields.join(',')],
          ['expand', expand.join(',')],
        ],
      })

      return res as JiraIssue
    } catch (error) {
      if (error?.res?.status === 404) {
        return
      }

      throw error
    }
  }

  async fetch (
    { host, pathname, query }: { host?: string, pathname:string, query: [key:string, value:string][] },
    { method, body, headers = {} }: RequestInit = {}) {

    const url = new URL(host || this.baseUrl)
    url.pathname = pathname

    query.forEach(([key, value]) => {
      url.searchParams.append(key, value)
    })

    if (!method) {
      method = 'GET'
    }

    if (headers['Content-Type'] === undefined) {
      headers['Content-Type'] = 'application/json'
    }

    if (headers['Authorization'] === undefined) {
      headers['Authorization'] = `Basic ${Buffer.from(`${this.email}:${this.token}`).toString('base64')}`
    }

    // strong check for undefined
    // cause body variable can be 'false' boolean value
    if (body && headers['Content-Type'] === 'application/json') {
      body = JSON.stringify(body)
    }

    const options = {
      method,
      headers,
      body,
    }

    try {
      return fetch(url.toString(), options).then((res) => res.json())
    } catch (error) {
      const fields = {
        originError: error,
        source: 'jira',
      }

      throw Object.assign(
        new Error('Jira API error'),
        { url, ...options, headers: null },
        fields
      )
    }
  }
}
