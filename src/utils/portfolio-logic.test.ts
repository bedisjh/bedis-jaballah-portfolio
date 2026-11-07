import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterProjects,
  filterIdeas,
  validateContactForm,
  calculatePortfolioStats,
  shouldShowBackToTop,
  validateVideoAnimationParams,
} from './portfolio-logic';

import { PROJECTS, IDEAS_LAB, ACHIEVEMENTS } from '../data/portfolio-data';

test('filterProjects returns all projects when category is ALL and query is empty', () => {
  const result = filterProjects(PROJECTS, 'ALL', '');
  assert.equal(result.length, PROJECTS.length);
});

test('filterProjects correctly matches category keyword', () => {
  const result = filterProjects(PROJECTS, 'Tourism', '');
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 'innova-live');
});

test('filterProjects correctly searches title and slogan', () => {
  const result = filterProjects(PROJECTS, 'ALL', 'Tunisia');
  assert.ok(result.length >= 1);
  assert.equal(result[0].title, 'Innova Live');
});

test('filterIdeas filters by category and status accurately', () => {
  const aiIdeas = filterIdeas(IDEAS_LAB, 'Digital Culture', 'ALL', '');
  assert.equal(aiIdeas.length, 1);
  assert.equal(aiIdeas[0].id, 'idea-01');

  const inDev = filterIdeas(IDEAS_LAB, 'ALL', 'IN DEVELOPMENT', '');
  assert.equal(inDev.length, 1);
  assert.equal(inDev[0].status, 'IN DEVELOPMENT');
});

test('validateContactForm rejects empty or invalid fields', () => {
  const empty = validateContactForm({ name: '', email: 'notanemail', message: 'hi' });
  assert.equal(empty.isValid, false);
  assert.ok(empty.errors.name);
  assert.ok(empty.errors.email);
  assert.ok(empty.errors.message);

  const valid = validateContactForm({
    name: 'Sarah Connor',
    email: 'sarah@example.com',
    message: 'Let us collaborate on a new tech project.',
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('calculatePortfolioStats accurately calculates counts', () => {
  const stats = calculatePortfolioStats(PROJECTS, IDEAS_LAB, ACHIEVEMENTS);
  assert.equal(stats.totalProjects, 4);
  assert.equal(stats.totalIdeas, 4);
  assert.ok(stats.verifiedAchievementsCount >= 3);
});

test('shouldShowBackToTop activates only past threshold', () => {
  assert.equal(shouldShowBackToTop(200, 400), false);
  assert.equal(shouldShowBackToTop(400, 400), false);
  assert.equal(shouldShowBackToTop(401, 400), true);
  assert.equal(shouldShowBackToTop(1200, 400), true);
});

test('validateVideoAnimationParams checks aspect ratio and image requirement', () => {
  // Missing image
  const missingImg = validateVideoAnimationParams({ image: '', aspectRatio: '16:9' });
  assert.equal(missingImg.isValid, false);
  assert.ok(missingImg.error?.includes('upload or select'));

  // Invalid aspect ratio
  const invalidAspect = validateVideoAnimationParams({ image: 'data:image/png;base64,abc', aspectRatio: '4:3' });
  assert.equal(invalidAspect.isValid, false);
  assert.ok(invalidAspect.error?.includes('16:9'));

  // Valid 16:9 landscape
  const validLandscape = validateVideoAnimationParams({ image: 'data:image/png;base64,abc', aspectRatio: '16:9' });
  assert.equal(validLandscape.isValid, true);

  // Valid 9:16 portrait
  const validPortrait = validateVideoAnimationParams({ image: 'data:image/jpeg;base64,xyz', aspectRatio: '9:16' });
  assert.equal(validPortrait.isValid, true);
});


