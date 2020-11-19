import _ from 'lodash/fp';

export function filterByLastSegement(driver, suffix) {
  return driver.filterBy((element) => {
    const testID = _.getOr('', ['props', 'testID'], element);
    return testID.endsWith(suffix) && !/\w/.test(testID.charAt(testID.length - suffix.length - 1));
  });
}

export function matchByLastSegmentOfUniqueId(driver, suffix) {
  const foundComponents = filterByLastSegement(driver, suffix);
  const matchedIDs = _.uniq(foundComponents.map((c) => c.props.testID));
  switch (matchedIDs.length) {
    case 0:
      return {components: [], testID: `"...${suffix}"`};
    case 1:
      return {components: foundComponents, testID: matchedIDs[0]};
    default:
      throw new Error(`Cannot select component, multiple testID options available ${matchedIDs.join('/')}`);
  }
}

export const findComponents = matchByLastSegmentOfUniqueId;
