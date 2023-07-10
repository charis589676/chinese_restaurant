import Realm from 'realm';
import { ChineseFFoodSchema } from './Schema';

const realm = new Realm({
    schema: [ChineseFFoodSchema]
});

export default realm;