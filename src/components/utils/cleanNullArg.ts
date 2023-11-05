import {isValidObject, getValidObject} from './ValidateObject';

export const cleanNullArgs = (args: any): object => {
  const notNull:any = {};
  Object.keys(args).forEach((key:string) => {
    if (isValidObject(args[key])) {
      notNull[key] = args[key];
    }
  });
  return notNull;
};

export const updateObjectArgument = (object: any, args: any): boolean => {
  let changed = false;
  Object.keys(args).forEach(key => {
    if (
      key !== 'id' &&
      isValidObject(args[key]) &&
      (!object[key] || object[key] != args[key])
    ) {
      object[key] = args[key];
      changed = true;
    }
  });
  return changed;
};

export const getChangedObjectArgument = (
  initObject: any,
  resultObject: any,
) => {
  const changedObject:any = {};
  Object.keys(resultObject).forEach((key:string) => {
    let resultValue = resultObject[key];
    // if (isValidObject(resultValue)) {
    if (isValidObject(resultValue) && typeof resultValue === 'object') {
      const initValue = getValidObject(initObject, key);
      if (isValidObject(initValue) && typeof initValue === 'object') {
        resultValue = getChangedObjectArgument(initValue, resultValue);
      }

      if (Object.keys(resultValue).length > 0) {
        changedObject[key] = resultValue;
      }
    } else {
      if (resultValue !== initObject[key]) {
        changedObject[key] = resultValue;
      }
    }
    // }
  });
  return changedObject;
};

export const getArgumentExceptObject = (
  args: any,
  ...exceptKeys: string[]
): object => {
  const notObject:any = {};
  if (isValidObject(args)) {
    Object.keys(args).forEach((key:string) => {
      const pass = exceptKeys.some(exceptKey => {
        return exceptKey === key;
      });
      if (
        !pass &&
        args[key] !== null &&
        typeof args[key] !== 'object' &&
        typeof args[key] !== 'function'
      ) {
        notObject[key] = args[key];
      }
    });
  }
  return notObject;
};

export const getArgumentExceptKeys = (
  args: any,
  ...exceptKeys: string[]
): object => {
  const notObject:any = {};
  Object.keys(args).forEach((key:string) => {
    const pass = exceptKeys.some(exceptKey => {
      return exceptKey === key;
    });
    if (!pass && typeof args[key] !== 'function') {
      notObject[key] = args[key];
    }
  });
  return notObject;
};

export const getArgumentIncludeKeys = (
  args: any,
  ...includeKeys: string[]
): object => {
  const notObject:any = {};
  Object.keys(args).forEach((key:string) => {
    const pass = includeKeys.some(includeKey => {
      return includeKey === key;
    });
    if (pass && typeof args[key] !== 'function') {
      notObject[key] = args[key];
    }
  });
  return notObject;
};

export function StringifyWithoutFields(object: any, ...keys: string[]) {
  if (isValidObject(object)) {
    const resultObject = getArgumentExceptKeys(object, ...keys);
    return JSON.stringify(resultObject);
  }
  return '';
}

export function StringifyWithFields(object: any, ...keys: string[]) {
  if (isValidObject(object)) {
    const resultObject = getArgumentIncludeKeys(object, ...keys);
    return JSON.stringify(resultObject);
  }
  return '';
}

export const CloneObject = (
  object: any,
  withChild: boolean = true,
  isRoot: boolean = true,
): any => {
  if (object === null || typeof object !== 'object') return object;
  if (!isRoot && !withChild) return undefined;

  var copy = object.constructor();

  for (var attr in object) {
    if (object.hasOwnProperty(attr)) {
      copy[attr] = CloneObject(object[attr], withChild, false);
    }
  }

  return copy;
};
