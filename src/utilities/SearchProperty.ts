import has from 'lodash.has';
import isEqual from 'lodash.isequal';

export const searchProperty = (nestedItem, searchKey, searchValue) => {
  if (Array.isArray(nestedItem)) {
    for (const item of nestedItem) {
      if (typeof item === 'object' && item != null) {
        const result = searchProperty(item, searchKey, searchValue);
        if (result !== undefined) {
          return result;
        }
      }
    }
  } else {
    for (const key in nestedItem) {
      if (typeof nestedItem[key] === 'object' && nestedItem[key] != null) {
        if (has(nestedItem[key], searchKey) && isEqual(nestedItem[key][searchKey], searchValue)) {
          return nestedItem[key];
        }
        const result = searchProperty(nestedItem[key], searchKey, searchValue);
        if (result !== undefined) {
          return result;
        }
      }
    }
  }
  return undefined;
}
