const { Client } = require("@notionhq/client");
const fs = require('fs');

const notion = new Client({
    auth: "secret_EoxNTywQpCYhhUS80hURa31q4JNRfQvNWYYw0oPVxLX",
});

async function createIdUrlMapFile(notionClient) {
    const results = await notionClient.databases.query({
        database_id: "994834b0b3f54c7790f50d544c95e9e2",//DB_ID de la WIKI
    });

    const idUrlMap = {};
    results.results.forEach(page => {
        const urlParts = page.url.split('-');
        const section = urlParts[urlParts.length - 1];
        idUrlMap[page.properties.ID.rich_text[0].plain_text] = section; // Asocia el ID con la sección del URL correspondiente
    });

    fs.writeFileSync('id_url_map.json', JSON.stringify(idUrlMap, null, 2)); // Guarda la asociación en un archivo separado
}

async function organizeDatabaseContent(databaseContent) {
    const organizedData = {};

    for (const page of databaseContent.results) {
        const pageId = page.properties.ID.rich_text[0].plain_text;
        const name = page.properties.Name.title[0].plain_text;
        const vol = page.properties.Vol.select.name;
        const number = page.properties.Number.number;
        const title = page.properties.Title.rich_text[0].plain_text;
        const date = page.properties.Date.date.start;
        const writer = page.properties.Writer.rich_text[0].plain_text;
        const penciler = page.properties.Penciler.rich_text[0].plain_text;

        organizedData[pageId] = { name, vol, number, title, date, writer, penciler };
    }

    return organizedData;
}

async function createDBLocal(childDatabaseId, notionClient) {
    const databaseContent = await notionClient.databases.query({
        database_id: childDatabaseId,
    });

    const organizedData = await organizeDatabaseContent(databaseContent);

    fs.writeFileSync('database_data.json', JSON.stringify(organizedData, null, 2));
}

async function getDataForPage(idUrlMap, notionClient) {
    const pageId = idUrlMap["P001-0001"];

    const pageContent = await notionClient.blocks.children.list({
        block_id: pageId,
    });

    const childDatabaseId = pageContent.results[0].id.replace(/-/g, '');

    await createDBLocal(childDatabaseId, notionClient);
}

async function dataDBWiki(databaseId, filename) {
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

async function main() {
    // await createIdUrlMapFile(notion);
    // const idUrlMap = JSON.parse(fs.readFileSync('id_url_map.json', 'utf8'));
    // await getDataForPage(idUrlMap, notion);

    const databaseId = '994834b0b3f54c7790f50d544c95e9e2';
    const filename = 'dataDBWiki.json';

    await dataDBWiki(databaseId, filename);
}

main();
