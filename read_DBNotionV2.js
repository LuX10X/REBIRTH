const { Client } = require("@notionhq/client");
const fs = require('fs');

const notion = new Client({
    auth: "secret_EoxNTywQpCYhhUS80hURa31q4JNRfQvNWYYw0oPVxLX",
});

async function createDataDBWiki(databaseId, filename) {
    try {
        const response = await notion.databases.query({
            database_id: databaseId,
        });

        const data = JSON.stringify(response.results, null, 2);
        fs.writeFileSync(filename, data);

        console.log('Data has been successfully written to', filename);
    } catch (error) {
        console.error('Error:', error.body);
    }
}

function reorganizeData(jsonData) {
    return jsonData.reduce((acc, entry) => {
        const properties = entry.properties;
        const newObj = {};
        for (const [key, value] of Object.entries(properties)) {
            const propKey = Object.keys(value)[0];
            newObj[key] = value[propKey].name || value[propKey].content || value[propKey];
        }
        acc[properties.ID.rich_text[0].text.content] = newObj;
        return acc;
    }, {});
}

function writeDataMapDB(filename, newData) {
    const data = JSON.stringify(newData, null, 2);
    fs.writeFileSync(filename, data);
    console.log('Data has been successfully written to', filename);
}

function readAndReorganizeData(filename, newFilename) {
    try {
        const jsonData = JSON.parse(fs.readFileSync(filename, 'utf8'));
        const newData = reorganizeData(jsonData);
        writeDataMapDB(newFilename, newData);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function main() {
    const databaseId = '994834b0b3f54c7790f50d544c95e9e2';
    const dataDBWikiFilename = 'dataDBWiki.json';
    const dataMapDBFilename = 'dataMapDB.json';

    await createDataDBWiki(databaseId, dataDBWikiFilename);
    readAndReorganizeData(dataDBWikiFilename, dataMapDBFilename);
}

main();
