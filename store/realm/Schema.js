export const ChineseFFoodSchema = {
    name: 'productFood',
    properties: {
        id: 'int',
        foodName: 'string',
        imagePath: 'string',
        category: 'int',
        description: 'string',
        price:'int',
    },
    primaryKey: 'id'
}