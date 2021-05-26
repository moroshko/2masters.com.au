import Airtable, { FieldSet } from "airtable";

const BASE_ID = "appZqTgIanLmTrbzP";

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(BASE_ID);

export function createRecord<Fields extends FieldSet>(
  tableName: string,
  data: Fields
) {
  return new Promise((resolve, reject) => {
    base<Fields>(tableName).create(data, (error, record) => {
      if (error) {
        reject(error);
      } else {
        resolve(record);
      }
    });
  });
}
