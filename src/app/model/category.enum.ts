export enum Categories{
    meds = 1,
    food = 2,
    book = 3,
    others = 4
}

export function enumSelector(definition) {
    return Object.keys(definition)
    .filter(StringIsNumber)
      .map(key => ({ value: key, title: definition[key] }));
  }


  const StringIsNumber = value => isNaN(Number(value)) === false;
