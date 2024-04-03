import * as core from "@actions/core";

/**
 * action.yaml definition.
 */
export interface ActionConfig {
  /**
   * GitHub API token for making requests.
   */
  token: string;

  /**
   * The npm script that runs knip.
   */
  commandScriptName: string;

  /**
   * ID to use when updating the PR comment.
   */
  commentId: string;

  /**
   * Annotate the project code with the knip results.
   */
  annotations: boolean;

  /**
   * Include annotated items in the comment report.
   */
  verbose: boolean;

  /**
   * Do not fail the action run if knip results are found.
   */
  ignoreResults: boolean;

  /**
   * Directory in which to run the knip action.
   */
  workingDirectory?: string;

  /**
   * Use JSON results input.
   */
  jsonInput: boolean;

  /**
   * Optional JSON results input file name.
   */
  jsonInputFileName: string;

  /**
   * Optional pull request number when JSON results input is used.
   */
  pullRequestNumber: number;
}

export function getConfig(): ActionConfig {
  return {
    token: core.getInput("token", { required: true }),
    commandScriptName: core.getInput("command_script_name", { required: false }) || "knip",
    commentId: core.getInput("comment_id", { required: true }).trim().replaceAll(/\s/g, "-"),
    annotations: core.getBooleanInput("annotations", { required: false }),
    verbose: core.getBooleanInput("verbose", { required: false }),
    ignoreResults: core.getBooleanInput("ignore_results", { required: false }),
    workingDirectory: core.getInput("working_directory", { required: false }) || undefined,
    jsonInput: core.getBooleanInput("json_input", { required: false }),
    jsonInputFileName: core.getInput("json_input_file_name", { required: false }) || "knip-results.json",
    pullRequestNumber: Number(core.getInput("pull_request_number", { required: false })),
  };
}

export function configToStr(cfg: ActionConfig): string {
  return `  with config:
    token: ###
    command_script_name: ${cfg.commandScriptName}
    comment_id: ${cfg.commentId}
    annotations: ${cfg.annotations}
    verbose: ${cfg.verbose}
    ignoreResults: ${cfg.ignoreResults}
    workingDirectory: ${cfg.workingDirectory}
`;
}
