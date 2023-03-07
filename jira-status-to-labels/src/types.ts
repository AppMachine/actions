export interface Issuetype {
  self: string;
  id: string;
  description: string;
  iconUrl: string;
  name: string;
  subtask: boolean;
  avatarId: number;
  hierarchyLevel: number;
}

export interface StatusCategory {
  self: string;
  id: number;
  key: string;
  colorName: string;
  name: string;
}

export interface Status {
  self: string;
  description: string;
  iconUrl: string;
  name: string;
  id: string;
  statusCategory: StatusCategory;
}

export interface Priority {
  self: string;
  iconUrl: string;
  name: string;
  id: string;
}

export interface Fields2 {
  summary: string;
  status: Status;
  priority: Priority;
  issuetype: Issuetype;
}

export interface Parent {
  id: string;
  key: string;
  self: string;
  fields: Fields2;
}
export interface Project {
  self: string;
  id: string;
  key: string;
  name: string;
  projectTypeKey: string;
  simplified: boolean;
  avatarUrls: AvatarUrls;
}

export interface FixVersion {
  self: string;
  id: string;
  description: string;
  name: string;
  archived: boolean;
  released: boolean;
}

export interface Watches {
  self: string;
  watchCount: number;
  isWatching: boolean;
}

export interface Issuerestrictions {
}

export interface Issuerestriction {
  issuerestrictions: Issuerestrictions;
  shouldDisplay: boolean;
}

export interface Priority2 {
  self: string;
  iconUrl: string;
  name: string;
  id: string;
}
export interface Assignee {
  self: string;
  accountId: string;
  avatarUrls: AvatarUrls;
  displayName: string;
  active: boolean;
  timeZone: string;
  accountType: string;
}

export interface NonEditableReason {
  reason: string;
  message: string;
}
export interface Creator {
  self: string;
  accountId: string;
  avatarUrls: AvatarUrls;
  displayName: string;
  active: boolean;
  timeZone: string;
  accountType: string;
}

export interface AvatarUrls {
  '48x48': string;
  '24x24': string;
  '16x16': string;
  '32x32': string;
}

export interface Reporter {
  self: string;
  accountId: string;
  avatarUrls: AvatarUrls;
  displayName: string;
  active: boolean;
  timeZone: string;
  accountType: string;
}

export interface Aggregateprogress {
  progress: number;
  total: number;
}

export interface Progress {
  progress: number;
  total: number;
}

export interface Votes {
  self: string;
  votes: number;
  hasVoted: boolean;
}

export interface Comment {
  comments: any[];
  self: string;
  maxResults: number;
  total: number;
  startAt: number;
}

export interface Worklog {
  startAt: number;
  maxResults: number;
  total: number;
  worklogs: any[];
}

export interface Fields {
  statuscategorychangedate: Date;
  issuetype: Issuetype;
  parent: Parent;
  timespent?: any;
  project: Project;
  fixVersions: FixVersion[];
  aggregatetimespent?: any;
  resolution?: any;
  workratio: number;
  lastViewed?: any;
  watches: Watches;
  issuerestriction: Issuerestriction;
  created: Date;
  priority: Priority2;
  labels: any[];
  aggregatetimeoriginalestimate?: any;
  timeestimate?: any;
  issuelinks: any[];
  assignee: Assignee;
  updated: Date;
  status: Status;
  components: any[];
  timeoriginalestimate?: any;
  description: string;
  summary: string;
  creator: Creator;
  subtasks: any[];
  reporter: Reporter;
  aggregateprogress: Aggregateprogress;
  progress: Progress;
  votes: Votes;
  comment: Comment;
  worklog: Worklog;
}

export interface JiraIssue {
  expand: string;
  id: string;
  self: string;
  key: string;
  fields: Fields;
}
