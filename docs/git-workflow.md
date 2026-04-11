# Git Workflow Showcase

This document now reflects the updated pull request plan for the project. For now, only PR 1 is the active priority.

## Branch Strategy

Main branches:
- `main` - the stable branch
- `develop` - the working branch where approved features are combined

Feature branches:
- `feature/readme-enhancement`
- `feature/login-ui`
- `feature/dashboard-page`
- `feature/navbar-component`
- `feature/footer-component`

## Planned Pull Requests

### PR 1
- Feature: `Project Documentation`
- Description: `Improve README with setup steps`
- Branch name: `feature/readme-enhancement`
- Priority: `Current priority`

Suggested PR title:
```text
docs: improve README with setup steps
```

Suggested PR description:
```md
## Summary
- improve the README with clearer setup steps
- explain how to open and run the project locally
- make the project easier for reviewers and beginners to understand

## Why
This helps anyone opening the repository understand how to start the project quickly.

## Testing
- reviewed README formatting
- checked that file names and steps match the repository
```

### PR 2
- Feature: `Login UI`
- Description: `Add a simple login page`
- Branch name: `feature/login-ui`
- Priority: `Later`

### PR 3
- Feature: `Dashboard Page`
- Description: `Create a basic dashboard layout`
- Branch name: `feature/dashboard-page`
- Priority: `Later`

### PR 4
- Feature: `Navigation Bar`
- Description: `Add a reusable navbar component`
- Branch name: `feature/navbar-component`
- Priority: `Later`

### PR 5
- Feature: `Footer Component`
- Description: `Add a footer with contact info`
- Branch name: `feature/footer-component`
- Priority: `Later`

## How I Would Do This

The safest and cleanest way is to work on one branch at a time.

1. Start from `develop`.
2. Create a new branch called `feature/readme-enhancement`.
3. Update `README.md` with the setup steps.
4. Check the changes in VS Code.
5. Commit the changes with a message like `docs: improve README with setup steps`.
6. Push the branch to GitHub.
7. Create a pull request from `feature/readme-enhancement` into `develop`.
8. Review it, approve it, and merge it.

For now, stop after PR 1 is completed. The other branches can be created later when you are ready.

## Beginner-Friendly VS Code Steps

These steps are written for someone new to Git and GitHub.

### Part 1: Create the branch

1. Open the project folder in VS Code.
2. Look at the bottom-left corner of VS Code. You will see the current branch name.
3. Click the branch name.
4. Choose `Create new branch`.
5. Type: `feature/readme-enhancement`
6. Press Enter.
7. If VS Code asks which branch to create it from, choose `develop`.

### Part 2: Make and save your README changes

1. Open `README.md`.
2. Add or update the setup steps.
3. Press `Ctrl + S` to save the file.

### Part 3: Commit the changes

1. Click the Source Control icon in the left sidebar.
2. You should see `README.md` listed under changes.
3. Move your mouse over the file and click the `+` sign to stage it.
4. At the top, there will be a message box.
5. Type this commit message:

```text
docs: improve README with setup steps
```

6. Click `Commit`.

If VS Code asks you to confirm your Git identity, enter your name and email and continue.

### Part 4: Push the branch to GitHub

1. After the commit, look for a button like `Publish Branch` or `Sync Changes`.
2. Click it.
3. Wait for the push to finish.

This uploads your branch to GitHub.

### Part 5: Create the pull request in VS Code

1. Open the Source Control panel.
2. If you have the GitHub Pull Requests extension installed, look for `Create Pull Request`.
3. Click it.
4. Set the source branch to `feature/readme-enhancement`.
5. Set the target branch to `develop`.
6. Use this title:

```text
docs: improve README with setup steps
```

7. Use the PR description from the PR 1 section above.
8. Click `Create`.

If you do not see the pull request option in VS Code, you can still push the branch and open GitHub in the browser to create it there.

### Part 6: Approve the pull request

Approval normally should be done by another person, not the same person who created the PR. If you are working alone, you can skip approval and merge it yourself if your repository settings allow that.

If approval is available in VS Code:

1. Open the pull request in the GitHub Pull Requests panel.
2. Review the changed files.
3. Click `Review Changes`.
4. Choose `Approve`.
5. Submit the review.

### Part 7: Merge the pull request

1. Open the pull request.
2. Confirm the base branch is `develop`.
3. Confirm the changes are only for the README work.
4. Click `Merge Pull Request` or the merge option shown in VS Code.
5. Choose the standard merge option unless your team uses squash merge.
6. Confirm the merge.

### Part 8: Clean up after merge

1. Switch back to the `develop` branch in VS Code.
2. Pull the latest changes so your local `develop` matches GitHub.
3. You can delete `feature/readme-enhancement` after merge if you want to keep branches clean.

## Simple Rule To Remember

For now, use this sequence only:

`develop` -> `feature/readme-enhancement` -> Pull Request -> Review/Approve -> Merge back into `develop`

Do not start the login, dashboard, navbar, or footer branches until PR 1 is finished.
