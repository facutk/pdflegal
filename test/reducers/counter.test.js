import counter from 'reducers/counter'
import { COUNTER_INCREMENT, COUNTER_DECREMENT } from 'constants/action-types'

test('UNKNOWN actions does nothing', () => {
  expect(counter(0, {type: 'UNKNOWN'})).toEqual(0)
})

test('COUNTER_INCREMENT action increments from 0 to 1', () => {
  expect(counter(0, {type: COUNTER_INCREMENT})).toEqual(1)
})

test('COUNTER_INCREMENT action increments from 8 to 9', () => {
  expect(counter(8, {type: COUNTER_INCREMENT})).toEqual(9)
});

test('COUNTER_DECREMENT action decrements from 3 to 2', () => {
  expect(counter(3, {type: COUNTER_DECREMENT})).toEqual(2)
});
