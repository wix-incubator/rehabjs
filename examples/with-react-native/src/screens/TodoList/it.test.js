import 'react-native';
import {createTestDriver} from 'rehabjs';
import FetchModule from 'rehabjs/modules/fetch';

const TODOS = [1, 2].map((id) => ({
  userId: 1,
  id: id,
  title: 'todo' + id,
  completed: id % 2 === 0,
}));

const fetchModule = new FetchModule({
  getFetchResult: (url, options) => {
    if (url.endsWith('/todos')) {
      return TODOS.slice();
    }

    // TODO: do some normal pattern matching
    if (url.endsWith('/todos/1')) {
      return {...TODOS[0]};
    }

    if (url.endsWith('/todos/2')) {
      return {...TODOS[1]};
    }
  },
});

const screenDriver = createTestDriver({
  componentGenerator: () => require('./index').default,
  modules: [fetchModule],
});

describe('TodoList', () => {
  it('fetches', async () => {
    const driver = screenDriver({passProps: {componentId: 'test'}});

    const effects = await driver.run().execute();

    expect(effects).toEqual({
      '[fetch]': [
        {
          body: undefined,
          url: 'https://jsonplaceholder.typicode.com/todos',
        },
      ],
    });
  });
});
