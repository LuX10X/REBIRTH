const { Client } = require("@notionhq/client");
const fs = require('fs');
const path = require('path');

const notion = new Client({
    auth: "secret_EoxNTywQpCYhhUS80hURa31q4JNRfQvNWYYw0oPVxLX",
});

async function readData(databaseId, outputFile) {
    try {
        const readPage = await notion.databases.query({
            database_id: databaseId,
        });
        
        fs.writeFileSync(path.join(__dirname, '..', 'json', 'data' + outputFile + '.json'), JSON.stringify(readPage, null, 2));

        console.log(`Datos de la base de datos:`, readPage);

        const objectsList = [];

        readPage.results.forEach(page => {
            const objectData = { id: page.id };
            const properties = page.properties;

            Object.keys(properties).forEach(propertyKey => {
                const property = properties[propertyKey];
                switch(property.type) {
                    case 'title':
                    case 'rich_text':
                        objectData[propertyKey] = property[property.type][0].text.content;
                        break;
                    case 'number':
                        objectData[propertyKey] = property.number;
                        break;
                    case 'date':
                        objectData[propertyKey] = property.date.start;
                        break;
                    case 'select':
                        objectData[propertyKey] = property.select.name;
                        break;
                    case 'multi_select':
                        objectData[propertyKey] = property.multi_select.name;
                        break;
                    default:
                        break;
                }
            });

            objectsList.push(objectData);
        });

        console.log("Datos leídos del archivo:", objectsList);

        fs.writeFileSync(path.join(__dirname, '..', 'json', 'items' + outputFile + '.json'), JSON.stringify(objectsList, null, 2));

        return objectsList;
    } catch (error) {
        console.error("Error al mostrar los datos de la base de datos:", error);
        return null;
    }
}

async function main(databaseType) {
    try {
        let databaseId, outputFile;

        if (databaseType === 'wiki') {
            databaseId = "994834b0b3f54c7790f50d544c95e9e2";
            outputFile = 'DBWiki';
        } else if (databaseType === 'local') {
            databaseId = "ccf12b1f5b8443939d2c85ae058ea164";
            outputFile = 'DBLocal';
        } else {
            console.error("Tipo de base de datos no válido.");
            return;
        }

        await readData(databaseId, outputFile);
    } catch (error) {
        console.error("Error en la ejecución principal:", error);
    }
}

const databaseType = process.argv[2];
if (databaseType !== 'wiki' && databaseType !== 'local') {
    console.error("Por favor, especifique 'wiki' o 'local' como argumento.");
} else {
    main(databaseType);
}
