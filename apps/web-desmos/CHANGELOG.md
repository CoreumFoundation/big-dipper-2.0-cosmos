# Unreleased

## 2.9.6

### Patch Changes

- Updated dependencies [e0f32672]
  - ui@2.14.3

## 2.9.5

### Patch Changes

- Updated dependencies [e11d768a]
  - ui@2.14.2

## 2.9.4

### Patch Changes

- Updated dependencies [4079b219]
  - ui@2.14.1

## 2.9.3

### Patch Changes

- Updated dependencies [d08c0dfd]
  - shared-utils@2.8.0
  - tsconfig@0.3.0
  - ui@2.14.0

## 2.9.2

### Patch Changes

- Updated dependencies [af2e8add5]
  - shared-utils@2.7.0
  - ui@2.13.0

## 2.9.1

### Patch Changes

- Updated dependencies [b4ac0a0c5]
  - shared-utils@2.6.3
  - ui@2.12.1

## 2.9.0

### Minor Changes

- e12c3b0c2: add custom message types, including Profiles, Posts, Reactions, Reports and Subspaces modules

### Patch Changes

- Updated dependencies [e12c3b0c2]
  - ui@2.12.0

## 2.8.1

### Patch Changes

- Updated dependencies [a04d53bd8]
- Updated dependencies [a04d53bd8]
- Updated dependencies [a04d53bd8]
  - ui@2.11.1

## 2.8.0

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

## 2.7.2

### Patch Changes

- b64119a1: feat: handle respoonsive UI via CSS instead of using JS
- Updated dependencies [b64119a1]
  - shared-utils@2.6.2
  - ui@2.10.4

## 2.7.1

### Patch Changes

- dc085630: feat: Add Rotate banner feature
- Updated dependencies [dc085630]
  - shared-utils@2.6.1
  - ui@2.10.1

## 2.7.0

### Minor Changes

- 85dd8c7d: Migrate MUI v4 to MUI v5, Next v12 to v13, React v17 to v18

### Patch Changes

- Updated dependencies [85dd8c7d]
  - shared-utils@2.6.0
  - ui@2.10.0

## 2.6.0

### Minor Changes

- 8ea919c8: auto deployment based on PR title keyword

### Patch Changes

- Updated dependencies [8ea919c8]
  - ui@2.9.0

## 2.5.0

### Minor Changes

- 650f686b: Enable Yarn Plug'n'Play (Zero-Installs)

### Patch Changes

- Updated dependencies [650f686b]
  - shared-utils@2.5.0
  - ui@2.7.0

## 2.4.1

### Patch Changes

- 2db4ee93: performance improvements and bug fixes
- Updated dependencies [2db4ee93]
  - ui@2.6.1

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

# Changes

- Merged base

# desmos-v2.2.0 - 2021-04-19

# Changes

- Merged `base-v2.1.0`

# desmos-v2.1.1 - 2021-03-23

# Changes

- Merged `base-v2.0.1`
- Merged `base-v2.0.2`

# desmos-v2.1.0 - 2021-03-10

# Changes

- Merged `base-v2.0.0`

# desmos-v2.0.1 - 2021-02-16

# Changes

- Update gql apis for release

# desmos-v2.0.0 - 2021-02-10

# Changes

- Merged `base-v2.0.0-rc1`

# desmos-v1.9.0 - 2021-01-10

# Changes

- Merged `base-v1.9.0`

# desmos-v1.8.4 - 2021-12-07

# Changes

- Merged `base-v1.8.4`

# desmos-v1.8.3 - 2021-12-07

# Changes

- Merged `base-v1.8.3`

# desmos-v1.8.2 - 2021-12-06

# Changes

- Merged `base-v1.8.2`

# desmos-v1.8.1 - 2021-12-06

# Changes

- Merged `base-v1.8.1`

# desmos-v1.8.0 - 2021-12-06

# Changes

- Merged `base-v1.8.0`

# desmos-v1.7.1 - 2021-11-28

# Fixes

- Fixed `UnlinkChainAccount` ([\#562](https://github.com/forbole/big-dipper-2.0-cosmos/issues/562))

# desmos-v1.7.0 - 2021-11-23

# Changes

- Add Desmos Profile Msgs ([\#482](https://github.com/forbole/big-dipper-2.0-cosmos/issues/482))
- Merged `base-v1.7.0`

# desmos-v1.5.1 - 2021-11-01

# Changes

- Merged `base-v1.6.0`

# desmos-v1.5.1 - 2021-10-11

# Changes

- Merged `base-v1.5.1`

# desmos-v1.5.0 - 2021-10-11

# Changes

- Merged `base-v1.5.0`

# desmos-v1.4.0 - 2021-10-06

# Changes

- Add MsgLinkChainAccount ([\#404](https://github.com/forbole/big-dipper-2.0-cosmos/issues/404))
- Merged `base-v1.4.0`

# desmos-v1.3.0 - 2021-09-28

# Changes

- Merged `base-v1.3.0`

# desmos-v1.2.0 - 2021-09-20

# Changes

- Merged `base-v1.2.0`

# desmos-v1.1.1 - 2021-09-17

# Changes

- Merged hotfix 84c5f83d045dd0708ed1af907b559c2c899387c0

# desmos-v1.1.0 - 2021-09-13

## Changes

- Merged `base-v1.1.0`

# desmos-v1.0.13 - 2021-09-06

## Changes

- Merged `base` at `2691d272df3600fd922bc8a478560375bb47574a`

# desmos-v1.0.12 - 2021-09-03

## Changes

- Merged `base-v1.0.9`

# desmos-v1.0.11 - 2021-09-01

## Changes

- Change price display if 0 ([\#268](https://github.com/forbole/big-dipper-2.0-cosmos/issues/268))

# desmos-v1.0.10 - 2021-08-30

## Changes

- Update cicd to handle testnet and mainnet deployments

# desmos-v1.0.9 - 2021-08-25

## Changes

- Merged `base-v1.0.5`
- Merged `base-v1.0.6`

# desmos-v1.0.8 - 2021-08-19

## Changes

- Update primary color
- Merged `base-v1.0.4`
