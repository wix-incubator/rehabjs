/* eslint-disable no-console */
const exec = require('shell-utils').exec;
const semver = require('semver');
const fs = require('fs');

const ONLY_ON_BRANCH = 'master';
const VERSION_TAG = 'latest';
const VERSION_INC = 'patch';

function run() {
  if (!validateEnv()) {
    return;
  }
  versionTagAndPublish();
}

function validateEnv() {
  if (!process.env.TRAVIS) {
    throw new Error(`releasing is only available from CI`);
  }

  if (process.env.TRAVIS_BRANCH !== ONLY_ON_BRANCH) {
    console.log(`not publishing on branch ${process.env.GIT_BRANCH}`);
    return false;
  }

  return true;
}

function versionTagAndPublish() {
  const packageVersion = semver.clean(process.env.npm_package_version);
  const [packagePrereleaseComponent] = semver.prerelease(process.env.npm_package_version) || [];
  console.log(`package version: ${packageVersion}`);
  console.log(`package packagePrereleaseComponent: ${packagePrereleaseComponent}`);

  const currentPublished = findCurrentPublishedVersion();
  console.log(`current published version: ${currentPublished}`);

  const incIdentifier = packagePrereleaseComponent ? 'prerelease' : VERSION_INC;
  const version = semver.gt(packageVersion, currentPublished) ? packageVersion : semver.inc(currentPublished, incIdentifier, packagePrereleaseComponent);
  bumpVersion(version);
}

function findCurrentPublishedVersion() {
  return exec.execSyncRead(`npm view ${process.env.npm_package_name} dist-tags.${VERSION_TAG}`);
}

function bumpVersion(newVersion) {
  exec.execSync(`npm --no-git-tag-version --allow-same-version version ${newVersion}`);
}

run();
