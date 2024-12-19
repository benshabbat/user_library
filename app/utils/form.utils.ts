export const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc?.[part], obj);
  };
  
  export const updateNestedField = (obj: any, path: string[], value: any): any => {
    if (path.length === 1) {
      return { ...obj, [path[0]]: value };
    }
    
    const [current, ...rest] = path;
    return {
      ...obj,
      [current]: updateNestedField(obj[current], rest, value)
    };
  };