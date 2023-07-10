import Realm from 'realm';
import { ChineseFFoodSchema } from './Schema';

const realm = new Realm({
    schema: [productFood]
});

export default realm;