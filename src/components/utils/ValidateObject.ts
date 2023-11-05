import { CloneObject } from "./cleanNullArg";

export function isValidFunction(object: any) {
   return (
      object !== undefined && object !== null && typeof object === "function"
   );
}

export function isValidString(object: any, checkLength: boolean = true) {
   return (
      object !== undefined &&
      object !== null &&
      typeof object === "string" &&
      (!checkLength || object.length > 0)
   );
}

export function isValidNumber(object: any) {
   return object !== undefined && object !== null && typeof object === "number";
}

export function isSameNumber(first: any, second: any) {
   if (
      isValidObject(first) &&
      (typeof first === "string" || typeof first === "number") &&
      isValidObject(second) &&
      (typeof second === "string" || typeof second === "number")
   ) {
      const firstNunber = typeof first === "string" ? parseInt(first) : first;
      const secondNunber =
         typeof second === "string" ? parseInt(second) : second;

      return firstNunber === secondNunber;
   }
   return false;
}

export function isValidObject(object: any) {
   if (object !== undefined && object !== null) {
      // if (typeof object === 'string') {
      // return object.length > 0;
      // }
      return true;
   }
   return false;
}

export function isValidLocation(object: any) {
   if (object !== undefined && object !== null) {
      return (
         isValidObjects(object, "latitude") &&
         isValidObjects(object, "longitude") &&
         isValidNumber(object["latitude"]) &&
         isValidNumber(object["longitude"]) &&
         object["latitude"] !== "<<NaN>>" &&
         object["longitude"] !== "<<NaN>>"
      );
   }
   return false;
}

export function isValidArray(object: any) {
   return (
      object !== undefined &&
      isValidObjects(object, "length") &&
      object.length > 0
   );
}

export function isValidEmail(email: any) {
   if (isValidString(email)) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
   }
   return false;
}

export function isValidUrl(url: any) {
   if (isValidString(url)) {
      var pattern = new RegExp(
         "^(https?:\\/\\/)?" + // protocol
         "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
         "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
         "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
         "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$",
         "i"
      ); // fragment locator
      return !!pattern.test(url);
   }
}

export function isValidJsonObject(object: any) {
   return Object.keys(object).length > 0;
}

export function isValidObjects(object: any, ...params: any[]) {
   return isValidObject(getValidObject(object, ...params));
}

export function isValidObjectsAll(...params: any[]) {
   return params.every((param: string) => {
      return isValidObject(param);
   });
}

export function isValidObjectsAny(...params: any[]) {
   return params.some((param: string) => {
      return isValidObject(param);
   });
}

export function isGetAndValidObjects(object: any, ...params: any[]) {
   return isValidObject(getValidObject(object, ...params));
}

export function getValidObject(target: any, ...params: any[]) {
   let object = target;
   if (isValidObject(target)) {
      if (
         params.every((param: string) => {
            if (typeof param === "number" && isValidNumber(object.length)) {
               if (object.length > param) {
                  object = object[param];
               } else object = undefined;
            } else {
               object = object[param];
            }
            return isValidObject(object);
         })
      ) {
         return object;
      }
   }
   return undefined;
}

export function ExcuteReferenceFunction(
   { ref, functionName }: { ref: any; functionName: string },
   ...params: any[]
) {
   if (isValidObject(ref)) {
      const refFunction =
         getValidObject(ref, functionName) ||
         getValidObject(ref, "current", functionName);
      if (isValidFunction(refFunction)) {
         refFunction(...params);
      }
   }
}

export function isSameObject(object1: any, object2: any): boolean {
   return object1 === object2;
}

export function getValidJsonObject(target: any, ...params: any[]) {
   let jsonString = getValidObject(target, ...params);
   if (
      isValidObject(jsonString) &&
      typeof jsonString === "string" &&
      jsonString.length > 0
   ) {
      jsonString = jsonString.replace(/\\"/gi, '"');
      return JSON.parse(jsonString);
   }
   return undefined;
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
function is(x: any, y: any) {
   if (x === y) {
      return x !== 0 || y !== 0 || 1 / x === 1 / y;
   }
   return x !== x && y !== y;
}
function isObject(obj: any) {
   return obj !== null && typeof obj === "object";
}

export function ShallowEqual(objA: any, objB: any) {
   if (!isValidObject(objA) && !isValidObject(objB)) {
      return true;
   }
   if (is(objA, objB)) {
      return true;
   }
   if (!isObject(objA) || !isObject(objB)) {
      return false;
   }
   var keys = Object.keys(objA);
   if (keys.length !== Object.keys(objB).length) {
      return false;
   }
   return keys.every(function (key) {
      return hasOwnProperty.call(objB, key) && is(objA[key], objB[key]);
   });
}

export function GetComponentName(component: any) {
   return (
      getValidObject(component, "constructor", "componentName") ||
      getValidObject(component, "constructor", "name")
   );
}

export function objectDeepMerge(objA: any, ...objB: any): any {
   if (!objB.length) return objA;
   const source = objB.shift();
   if (isObject(objA) && isObject(source)) {
      for (const key in source) {
         if (isObject(source[key])) {
            if (!objA[key]) {
               Object.assign(objA, { [key]: {} });
            }
            objectDeepMerge(objA[key], source[key]);
         } else {
            Object.assign(objA, { [key]: source[key] });
         }
      }
   }
   return objectDeepMerge(objA, ...objB);
}

export function MergeObject(objA: any, objB: any): any {
   if (!isValidObject(objB)) return;
   if (isValidObject(objA)) {
      if (isObject(objB)) {
         const keys: string[] = Object.keys(objB) || [];
         try {
            keys.forEach((key: string) => {
               if (isValidObject(objB[key])) {
                  if (isValidObject(objA[key])) {
                     if (isObject(objA[key])) {
                        MergeObject(objA[key], objB[key]);
                     } else {
                        objA[key] = CloneObject(objB[key]);
                     }
                  } else {
                     objA[key] = CloneObject(objB[key]);
                  }
                  // MergeObject(objA[key], objB[key]);
               }
               // else {
               // 	objA[key] = CloneObject(objB[key], false)
               // }
            });
         } catch (error) {
         }
      } else {
      }
   }
}

export function getValidValue(...params: any[]) {
   return params.find((param: string) => {
      return isValidObject(param);
   });
}
/*
const dest = {
	string:'origin',
	object:{
		number_in_object:1,
		string_in_object:'test1',
	},
	array:[
		{
			index:0
		},
		{
			index:1
		}
	]
}

MergeObject(dest, {
	number:1,
	string:'test',
	object:{
		number_in_object:2,
		string_in_object:'test2',
	},
	array:[
		{
			index:1
		},
		{
			index:2
		},
		{
			index:3
		},
		{
			index:4
		},
	]
})

ConsoleLog('MergeObject = ', dest)
*/
