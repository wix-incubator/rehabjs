import 'react-native';
import {createTestDriver} from 'rehabjs';
import {FetchModule} from 'rehabjs';
import {ReactNativeModule} from 'rehabjs';

const TODOS = [1, 2].map((id) => ({
  userId: 1,
  id: id,
  title: 'todo' + id,
  completed: id % 2 === 0,
}));

const fetchModule = new FetchModule();
const RNModule = new ReactNativeModule();

const screenDriver = createTestDriver({
  componentGenerator: () => require('./index').default,
  modules: [fetchModule, RNModule],
  mockedData: {
    [fetchModule.getMockKey()]: {
      'https://jsonplaceholder.typicode.com/todos': TODOS.slice(),
      'https://jsonplaceholder.typicode.com/todos/1': {...TODOS[0]},
      'https://jsonplaceholder.typicode.com/todos/2': {...TODOS[1]},
    },
  },
});

describe('TodoList', () => {
  it('fetches', async () => {
    const driver = screenDriver({passProps: {componentId: 'test'}});

    await driver.run().validate({
      [fetchModule.getResultsKey()]: [
        {
          body: undefined,
          url: 'https://jsonplaceholder.typicode.com/todos',
        },
      ],
    });
  });
});
