import counter from 'reducers/counter'
import {INCREMENT, DECREMENT} from 'constants/action-types'

test('UNKNOWN actions does nothing', () => {
  expect(counter(0, {type: 'UNKNOWN'})).toEqual(0);
});