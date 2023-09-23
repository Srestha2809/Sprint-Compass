import { MongoClient } from "mongodb";
import got from "got";
import * as cfg from "./config.js";
let db;
const getDBInstance = async () => {
    if (db) {
        console.log("using established connection");
        return db;
    }
    try {
        const client = new MongoClient(cfg.atlas, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("establishing new connection to Atlas");
        const conn = await client.connect();
        db = conn.db(cfg.appdb);
    } catch (err) {
        console.log(err);
    }
    return db;
};

const findAll = (db, coll, criteria, projection) =>
    db.collection(coll).find(criteria).project(projection).toArray();

const addOne = (db, coll, doc) => db.collection(coll).insertOne(doc);
const count = (db, coll) => db.collection(coll).countDocuments();
const deleteOne = (db, coll, criteria) => db.collection(coll).deleteOne(criteria);
const deleteAll = (db, coll) => db.collection(coll).deleteMany({});
const addMany = (db, coll, docs) => db.collection(coll).insertMany(docs);
const findOne = (db, coll, criteria) => db.collection(coll).findOne(criteria);
const countDocuments = (db, coll) => db.collection(coll).countDocuments();
const findUniqueValues = (db, coll, field) => db.collection(coll).distinct(field);
const updateOne = (db, coll, criteria, projection) => db.collection(coll).findOneAndUpdate(criteria, { $set: projection}, {rawResult: true} );

export { 
    getDBInstance,
    addOne,
    count,
    deleteAll,
    addMany,
    findOne,
    findAll,
    countDocuments,
    findUniqueValues,
    updateOne,
    deleteOne
};