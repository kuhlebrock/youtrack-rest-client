import {BaseEndpoint} from "./base";
import {Issue, IssueImpl, ReducedIssue, ReducedIssueImpl, NewIssue, ReducedVcsChange, ReducedVcsChangeImpl} from "..";
import {UpdateIssue} from "../entities/issue";
import {Command, CommandList, CommandListImpl} from "../entities/command";
import {PaginationOptions} from "../options/pagination_options";

export const IssuePaths = {
    issue: '/issues/{issueId}',
    issues: '/issues',
    vcsChanges: '/issues/{issueId}/vcsChanges'
};

export const CommandPaths = {
    commands: '/commands'
};

export class IssueEndpoint extends BaseEndpoint {

    public byId(issueId: string): Promise<Issue> {
        return this.getResourceWithFields<Issue>(this.format(IssuePaths.issue, {issueId}), IssueImpl);
    }

    public search(query: string, paginationOptions: PaginationOptions = {}): Promise<ReducedIssue[]> {
        return this.getResourceWithFields<ReducedIssue[]>(IssuePaths.issues, ReducedIssueImpl, {
            params: {
                query,
                ...paginationOptions
            }
        });
    }

    public delete(issueId: string): Promise<any> {
        return this.toPromise(this.client.delete(this.format(IssuePaths.issue, {issueId})));
    }

    public create(issue: NewIssue): Promise<Issue> {
        return this.postResourceWithFields<Issue>(IssuePaths.issues, IssueImpl, {
            data: issue
        });
    }

    public update(issue: UpdateIssue): Promise<Issue> {
        return this.postResourceWithFields<Issue>(this.format(IssuePaths.issue, {issueId: issue.id}), IssueImpl, {
            data: issue
        });
    }

    public executeCommand(command: Command): Promise<CommandList> {
        return this.postResourceWithFields<CommandList>(CommandPaths.commands, CommandListImpl, {
            data: command
        });
    }

    ///api/issues/{issueID}/vcsChanges
    public vscChanges(issueId: string, paginationOptions: PaginationOptions = {}): Promise<ReducedVcsChange[]> {
        return this.getResourceWithFields<ReducedVcsChange[]>(this.format(IssuePaths.vcsChanges, {issueId}), ReducedVcsChangeImpl, {
            params: {
                issueId,
                ...paginationOptions
            }
        });
    }
}
