/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import { LazyPipeline } from 'lazy-pipeline';
import { distinct, limit, map, sorted } from 'lazy-pipeline/operators';

ReactDOM.render(
  <React.StrictMode>
    <h1>ES module import testing for lazy-pipeline library</h1>
  </React.StrictMode>,
  document.getElementById('root')
);

const source = [2, 4, 5, 9, 6, 8, 10, 2, 4, 3];
const pipeline = LazyPipeline.from(source);
const expected = Array.from(new Set(source))
  .map(e => e + 1)
  .sort((left, right) => right - left)
  .slice(0, 3);

const result = pipeline
  .add(
    map(e => e + 1),
    distinct(),
    sorted((left, right) => right - left),
    limit(3)
  )
  .toArray();

console.log(JSON.stringify(expected) === JSON.stringify(result));
