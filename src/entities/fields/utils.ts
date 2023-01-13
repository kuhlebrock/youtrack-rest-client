export interface GenericObject {
    [key: string]: any;
}

const nestedField = (property: string, fields: string[]): string => {
    return `${property}(${fields.join(',')})`;
};

export const generateFields = (obj: GenericObject, maxLevel: number = 1, level:number = 0): string[] => {
    return Object.getOwnPropertyNames(obj).map(f => {
        const property = (<any>obj)[f];
        if (typeof property === 'object' && property && level <= maxLevel) {
            if (!Array.isArray(property)) {
                return nestedField(f, generateFields(property, maxLevel, level+1));
            } else if (property.length > 0) {
                return nestedField(f, generateFields(property[0], maxLevel, level+1));
            }
        }
        return f;
    });
};

export const generateFieldsQuery = (obj: GenericObject): string => {
    return generateFields(obj).join(',');
};
