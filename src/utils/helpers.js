export function hasData(value) {
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  if (typeof value === 'object' && value !== null) {
    return Object.keys(value).length > 0;
  }
  return true;
}

export function combine(...pieces) {
  let result;
  for (const element of pieces) {
    if (element !== undefined && Object.values(element).find(hasData) !== undefined) {
      result = Object.assign(result || {}, element);
    }
  }
  return result;
}

export function asArray(value) {
  return value === undefined ? [] : [value];
}

function getOrInstall(object, key) {
  return (object[key] = key in object ? object[key] : []);
}

export function appendItems(array, items, previousMerges) {
  const last = array.length > 0 ? array[array.length - 1] : undefined;
  const isMarker = typeof last === 'string' && /^\/+$/.test(last);
  const marker = isMarker || previousMerges === 0 ? [] : array.length > 0 ? ['/'] : ['/'.repeat(previousMerges)];
  if (isMarker) {
    array[array.length - 1] = last + '/';
  }
  array.push(...marker, ...items);
}

export function appendEffects(recording, input, previousMerges) {
  return mergeEffects(recording, input, previousMerges, getOrInstall);
}

function mergeEffects(recording, input, previousMerges, adaptForAppending) {
  if (previousMerges === 0) {
    return Object.assign(recording, input);
  }

  const existingKeys = new Set(Object.keys(recording));
  for (const [key, items] of Object.entries(input)) {
    existingKeys.delete(key);
    if (Array.isArray(items) || adaptForAppending === getOrTransform) {
      appendItems(adaptForAppending(recording, key), concatenable(items), previousMerges);
    } else {
      recording[key] = mergeEffects(recording[key], items, previousMerges, getOrTransform);
    }
  }

  for (const key of existingKeys) {
    appendItems(recording[key], [], previousMerges);
  }

  return recording;
}
