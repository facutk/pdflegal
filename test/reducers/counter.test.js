import counter from 'reducers/counter'
import {INCREMENT, DECREMENT} from 'constants/action-types'

test('UNKNOWN actions does nothing', () => {
  expect(counter(0, {type: 'UNKNOWN'})).toEqual(0);
})

test('INCREMENT action increments from 0 to 1', () => {
  expect(counter(0, {type: INCREMENT})).toEqual(1);
})

test('INCREMENT action increments from 8 to 9', () => {
  expect(counter(8, {type: INCREMENT})).toEqual(9);
});

test('DECREMENT action decrements from 3 to 2', () => {
  expect(counter(3, {type: DECREMENT})).toEqual(2);
});