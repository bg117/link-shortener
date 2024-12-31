## 1.0.0 (2025-01-01)

### Feat

- allow updating and deletion of links
- add functionality to retrieve long links by slug and passphrase
- add server actions to CRUD links

### Fix

- throw error if slug already exists
- require slug and passphrase
- typo: k to K

### Refactor

- move submit button outside of form

## 0.1.2 (2024-11-18)

### Fix

- use passphrase.js in place of generate-passphrase

## 0.1.1 (2024-11-18)

## 0.1.0 (2024-11-18)

### Feat

- implement redirection functionality
- implement link shortener functionality
- add server action for submission
- add home page scaffolding
- add bootstrap

### Fix

- add NOT NULL constraint to slug column

### Refactor

- remove unnecessary DB return
