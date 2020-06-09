import React from 'react';
import {createTestDriver} from '../../src/screen-driver';

jest.useFakeTimers();

const testScreen = 'TEST_SCREEN';

import Home from './Home';
const componentGenerator = () => () => {
  return (<Home />);
}

const testDriver = createTestDriver({
  componentGenerator,
  mocks: {modules: {'contacts.fetchList': {items: []}}},
  stateSeed: {
    main: {
      businesses: {b1: {groupList: ['one']}},
    }
  },
});

describe(testScreen, () => {
  it('should display user inputs: cover, title, privacy selector', async () => {
    const driver = testDriver({passProps: {businessId: 'b1', onGroupCreated: jest.fn()}});
    const scenario = driver.run();
    await expect(scenario).toReplicate({
    });
  });

});
