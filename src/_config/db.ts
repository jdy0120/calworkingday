'use strict';

import * as admin from 'firebase-admin';
import * as mysql from 'mysql2/promise';
import * as serviceAccount from './sagolinkapp-firebase-adminsdk-7vnyi-3999968adb.json';
import {myConfig} from './mysql-config';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();

const settings = {
  timestampsInSnapshots: true,
};

db.settings(settings);

export {admin};
export default db;
export const firestore = admin.firestore;

export const myPool = mysql.createPool(myConfig);
