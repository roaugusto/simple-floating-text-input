# Source control and local credentials

Repository: `git@github.com:roaugusto/simple-floating-text-input.git`. This checkout uses branch `master`.

Keep `.env` files, signing keys/certificates, service-account credentials,
local agent/editor settings, dependency installations, builds and private
validation artifacts on disk outside source control. The ignore rules also
exclude environment templates; share only templates whose complete content
has been reviewed and contains no credentials.

Firebase client configuration required by the mobile app may contain public
project/app identifiers and client API keys. It must never contain a service
account, private key, server token or account password.

Before committing, review both `git diff` and `git diff --cached`, check
tracked files against the ignore policy, and run a redacted secret scan of
the staged tree and all commits that are new to the destination repository.
An ignore rule does not remove a tracked file or sanitize earlier commits.
Keep local files when removing them from the index. If history contains a
secret, stop publication for this repository and request a specific decision;
do not rewrite remote history, force push, or rotate credentials implicitly.

Normal source pushes are separate from releases. Review CI/CD triggers before
pushing. Build, store submission, hosting and campaign scripts require their
own authorization; this synchronization does not run them.
