# v1.0.4 - 2022-06-20

## 2.9.8

### Patch Changes

- e0f32672: feat: migrated big dipper network recoil to apollo reactive variable and zod
- Updated dependencies [e0f32672]
  - ui@2.14.3

## 2.9.7

### Patch Changes

- Updated dependencies [e11d768a]
  - ui@2.14.2

## 2.9.6

### Patch Changes

- 4079b219: fix: ssr issue Text content does not match server-rendered HTML
- Updated dependencies [4079b219]
  - ui@2.14.1

## 2.9.5

### Patch Changes

- Updated dependencies [d08c0dfd]
  - shared-utils@2.8.0
  - tsconfig@0.3.0
  - ui@2.14.0

## 2.9.4

### Patch Changes

- Updated dependencies [af2e8add5]
  - shared-utils@2.7.0
  - ui@2.13.0

## 2.9.3

### Patch Changes

- Updated dependencies [b4ac0a0c5]
  - shared-utils@2.6.3
  - ui@2.12.1

## 2.9.2

### Patch Changes

- Updated dependencies [e12c3b0c2]
  - ui@2.12.0

## 2.9.1

### Patch Changes

- a04d53bd8: auto refresh timestamp display
- a04d53bd8: fix: transaction type in details view
- Updated dependencies [a04d53bd8]
- Updated dependencies [a04d53bd8]
- Updated dependencies [a04d53bd8]
  - ui@2.11.1

## 2.9.0

### Minor Changes

- d967ae3f: migrate from next-tranlsate to next-i18next

  - replace {{count}} in locales/en/\*.json to {{num}} because {{count}} is reserved for next-18next
  - add getServerSideProps to path with dynamic route param
  - add getStaticProps to path without dynamic route param

### Patch Changes

- d967ae3f: remove @sentry/nextjs package, add install sentry script to install @sentry/nextjs when deployment via docker
- d967ae3f: replace dompurify package with xss
- d967ae3f: feat: change matomoSiteID to 8
- d967ae3f: move jest setup coding to ui worksapce
- Updated dependencies [d967ae3f]
- Updated dependencies [d967ae3f]
- Updated dependencies [d967ae3f]
- Updated dependencies [d967ae3f]
- Updated dependencies [d967ae3f]
- Updated dependencies [d967ae3f]
- Updated dependencies [d967ae3f]
  - tsconfig@0.2.0
  - ui@2.11.0

## 2.8.2

### Patch Changes

- b64119a1: feat: handle respoonsive UI via CSS instead of using JS
- Updated dependencies [b64119a1]
  - shared-utils@2.6.2
  - ui@2.10.4

## 2.8.1

### Patch Changes

- dc085630: feat: Add Rotate banner feature
- Updated dependencies [dc085630]
  - shared-utils@2.6.1
  - ui@2.10.1

## 2.8.0

### Minor Changes

- 85dd8c7d: Migrate MUI v4 to MUI v5, Next v12 to v13, React v17 to v18

### Patch Changes

- Updated dependencies [85dd8c7d]
  - shared-utils@2.6.0
  - ui@2.10.0

## 2.7.0

### Minor Changes

- 8ea919c8: auto deployment based on PR title keyword

### Patch Changes

- Updated dependencies [8ea919c8]
  - ui@2.9.0

## 2.6.0

### Minor Changes

- 650f686b: Enable Yarn Plug'n'Play (Zero-Installs)

### Patch Changes

- Updated dependencies [650f686b]
  - shared-utils@2.5.0
  - ui@2.7.0

## 2.5.1

### Patch Changes

- 2db4ee93: performance improvements and bug fixes
- Updated dependencies [2db4ee93]
  - ui@2.6.1

## 2.5.0

### Minor Changes

- 7f4e53f6: feat: add loading indicator to home page ([\#1094](https://github.com/forbole/big-dipper-2.0-cosmos/pull/1094))

### Patch Changes

- Updated dependencies [7f4e53f6]
  - ui@2.6.0

## 2.4.0

### Minor Changes

- df8a5bca: - batch network requests ([\#1092](https://github.com/forbole/big-dipper-2.0-cosmos/issues/1092))

### Patch Changes

- Updated dependencies [df8a5bca]
  - ui@2.5.0

## 2.3.0

### Minor Changes

- e6437552: fix: numeral [NaN issue](https://github.com/adamwdraper/Numeral-js/issues/596)

### Patch Changes

- e6437552: refactor: add config for voting power exponent
- e6437552: fix: transaction message raw and filter not working
- e6437552: fix: WebSocket use default instead of GRAPHQL_TRANSPORT_WS_PROTOCOL
- e6437552: ci: Add bulk preview / publish to Akash
- e6437552: fix: height is not display properly in consensus ui
- e6437552: fix: type erros missing type declaration csstype
- Updated dependencies [e6437552]
- Updated dependencies [e6437552]
- Updated dependencies [e6437552]
- Updated dependencies [e6437552]
- Updated dependencies [e6437552]
- Updated dependencies [e6437552]
- Updated dependencies [e6437552]
  - shared-utils@2.3.0
  - ui@2.3.0

## Changes

- Updated preview image location
- Added preview image

# v1.0.3 - 2022-03-09

## Fixes

- Fixed dockerfile

# v1.0.2 - 2022-03-09

## Changes

- Updated matomo to CI/CD

# v1.0.1 - 2022-03-08

## Fixes

- Fixed locked sorting display in validators list

# v1.0.0 - 2022-03-08

## Changes

- Added Blocks Page
- Added Transactions Page
- Added Home Page
- Added Block Details Page
- Added Miniblock Details Page
- Added Transaction Details Page
- Added Validators Page
- Added Node Details Page
- Added Validator Details Page
- Added delegator column to validators page
- Added Account Details Page
- Added Transactions to Validator Details if provider
- Added Tokens Page
- Added Tokens Details Page
- Added Tokens to Account Details
- Updated searchbar with basic logic
- Updated homepage to setup some loading indicator
- Removed tx options from settings
- Added value to tx details operations with link to token details
- Merged validator tabs together
- Added NFT and NFT details page
- Updated TX operations to link to NFT details
- Added NFT to account details
- Fixed sorting in validator details
