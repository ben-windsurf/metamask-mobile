// eslint-disable-next-line import/no-nodejs-modules
import fs from 'fs';
// eslint-disable-next-line import/no-extraneous-dependencies
import simpleGit from 'simple-git';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Octokit } from '@octokit/rest';

// "GITHUB_TOKEN" is an automatically generated, repository-specific access token provided by GitHub Actions.
/**
 * GitHub token for API authentication
 */
const githubToken = process.env.GITHUB_TOKEN;
if (!githubToken) {
  console.log('GITHUB_TOKEN not found');
  process.exit(1);
}

// Initialize Octokit with your GitHub token
/**
 * Octokit instance for GitHub API interactions
 */
const octokit = new Octokit({ auth: githubToken});

/**
 * Retrieves team labels from a GitHub pull request
 * @param {Array} prNumber - Array containing PR number match from regex
 * @returns {Promise<Array<string>>} Array of team labels or ['Unknown'] if none found
 */
async function getPRLabels(prNumber) {
  try {
    const { data } = await octokit.pulls.get({
      owner: 'MetaMask',
      repo: 'metamask-mobile',
      pull_number: prNumber[1],
    });

    const labels = data.labels.map(label => label.name);

    // Check if any label name contains "team"
    let teamArray = labels.filter(label => label.toLowerCase().startsWith('team-'));

    if(teamArray.length > 1 && teamArray.includes('team-mobile-platform'))
      teamArray = teamArray.filter(item => item !== 'team-mobile-platform');

    return teamArray || ['Unknown'];

  } catch (error) {
    console.error(`Error fetching labels for PR #${prNumber}:`, error);
    return ['Unknown'];
  }
}

/**
 * Filters commits between two branches and groups them by team labels
 * @param {string} branchA - Target branch (newer)
 * @param {string} branchB - Source branch (older)
 * @returns {Promise<Object>} Object with team names as keys and commit arrays as values
 */
async function filterCommitsByTeam(branchA, branchB) {
  try {
    const git = simpleGit();

    const logOptions = {
      from: branchB,
      to: branchA,
      format: {
        hash: '%H',
        author: '%an',
        message: '%s',
      },
    };

    const log = await git.log(logOptions);
    const commitsByTeam = {};

    const MAX_COMMITS = 500; // Limit the number of commits to process

    for (const commit of log.all) {
      const { author, message, hash } = commit;
      if (Object.keys(commitsByTeam).length >= MAX_COMMITS) {
        console.error('Too many commits for script to work')
        break;
      }

      // Extract PR number from the commit message using regex
      const prMatch = message.match(/\(#(\d{4,5})\)$/u);
      if(prMatch){
        const prLink = prMatch ? `https://github.com/MetaMask/metamask-mobile/pull/${prMatch[1]}` : '';
        const teams = await getPRLabels(prMatch);

        // Initialize the team's commits array if it doesn't exist
        if (!commitsByTeam[teams]) {
          commitsByTeam[teams] = [];
        }

        commitsByTeam[teams].push({
          message,
          author,
          hash: hash.substring(0, 7),
          prLink,
        });
      }
    }
    return commitsByTeam;
  } catch (error) {
    console.error(error);
    return {};
  }
}

/**
 * Formats commits grouped by team into CSV format
 * @param {Object} commitsByTeam - Object with team names as keys and commit arrays as values
 * @returns {Array<string>} Array of CSV rows including header
 */
function formatAsCSV(commitsByTeam) {
  const csvContent = [];
  for (const [team, commits] of Object.entries(commitsByTeam)) {
    commits.forEach((commit) => {
      const row = [
        escapeCSV(commit.message),
        escapeCSV(commit.author),
        commit.prLink,
        escapeCSV(team),
        assignChangeType(commit.message)
      ];
      csvContent.push(row.join(','));
    });
  }
  csvContent.unshift('Commit Message,Author,PR Link,Team,Change Type');

  return csvContent;
}

/**
 * Escapes CSV fields by wrapping in quotes and escaping internal quotes
 * @param {string} field - Field value to escape
 * @returns {string} Escaped field value safe for CSV format
 */
function escapeCSV(field) {
  if (field.includes(',') || field.includes('"') || field.includes('\n')) {
    return `"${field.replace(/"/g, '""')}"`; // Encapsulate in double quotes and escape existing quotes
  }
  return field;
}
/**
 * Assigns change type based on commit message keywords
 * @param {string} field - Commit message to analyze
 * @returns {string} Change type category (Added, Fixed, Changed, Ops, or Unknown)
 */
function assignChangeType(field) {
  if (field.includes('feat'))
    return 'Added';
  else if (field.includes('cherry') || field.includes('bump'))
    return 'Ops';
  else if (field.includes('chore') || field.includes('test') || field.includes('ci')  || field.includes('docs') || field.includes('refactor'))
    return 'Changed';
  else if (field.includes('fix'))
    return 'Fixed';

  return 'Unknown';
}

/**
 * Main function that processes command line arguments and generates CSV file
 * @returns {Promise<void>}
 */
async function main() {
  const args = process.argv.slice(2);
  const fileTitle = 'commits.csv';

  if (args.length !== 2) {
    console.error('Usage: node generate-rc-commits.mjs branchA branchB');
    process.exit(1);
  }

  const branchA = args[0];
  const branchB = args[1];

  const commitsByTeam = await filterCommitsByTeam(branchA, branchB);

  if (Object.keys(commitsByTeam).length === 0) {
    console.log('No commits found.');
  } else {
    const csvContent = formatAsCSV(commitsByTeam);
    fs.writeFileSync(fileTitle, csvContent.join('\n'));
    console.log('CSV file ', fileTitle,  ' created successfully.');
  }
}

main();
