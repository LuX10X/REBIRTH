const { Client } = require("@notionhq/client");
const readline = require("readline");

const notion = new Client({
    auth: "secret_EoxNTywQpCYhhUS80hURa31q4JNRfQvNWYYw0oPVxLX",
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function addDataToDB(databaseId, properties) {
    try {
        const newPage = await notion.pages.create({
            parent: { database_id: databaseId },
            properties: properties,
        });

        console.log(`Nueva página creada en la base de datos:`, newPage);
    } catch (error) {
        console.error("Error al agregar datos a la base de datos:", error);
    }
}

async function main(databaseType) {
    try {
        let databaseId;
        let properties = {};

        if (databaseType === 'wiki') {
            databaseId = "994834b0b3f54c7790f50d544c95e9e2";
            properties = await getWikiProperties();
        } else if (databaseType === 'local') {
            databaseId = "ccf12b1f5b8443939d2c85ae058ea164";
            properties = await getLocalProperties();
        } else {
            console.error("Tipo de base de datos no válido.");
            rl.close();
            return;
        }

        await addDataToDB(databaseId, properties);
        rl.close();
    } catch (error) {
        console.error("Error en la ejecución principal:", error);
    }
}

async function getWikiProperties() {
    return {
        "Name": { title: [{ text: { content: name } }] },
        "Number": { number: parseInt(number) },
        "Title": { rich_text: [{ text: { content: title } }] },
        "Score": { select: { name: score }},
        "ID": { rich_text: [{ text: { content: id } }] }
    };
}

async function getLocalProperties() {
    return {
        "Name": { title: [{ text: { content: name } }] },
        "Vol": { select: { name: vol } },
        "Number": { number: parseInt(number) },
        "Title": { rich_text: [{ text: { content: title } }] },
        "Date": { date: { start: date } },
        "Writer": { rich_text: [{ text: { content: writer } }] },
        "Penciler": { rich_text: [{ text: { content: penciler } }] },
        "ID": { rich_text: [{ text: { content: id } }] }
    };
}

rl.question("Elija 'wiki' o 'local' como base de datos: ", function(databaseType) {
    rl.question("Ingrese el nombre: ", function(name) {
        rl.question("Ingrese el número: ", function(number) {
            rl.question("Ingrese el título: ", function(title) {
                rl.question("Ingrese la calificación: ", function(score) {
                    rl.question("Ingrese el ID: ", async function(id) {
                        if (databaseType === 'local') {
                            rl.question("Ingrese el volumen: ", function(vol) {
                                rl.question("Ingrese la fecha: ", function(date) {
                                    rl.question("Ingrese el escritor: ", function(writer) {
                                        rl.question("Ingrese el dibujante: ", function(penciler) {
                                            main(databaseType, name, number, title, score, id, vol, date, writer, penciler);
                                        });
                                    });
                                });
                            });
                        } else {
                            main(databaseType, name, number, title, score, id);
                        }
                    });
                });
            });
        });
    });
});

function main(databaseType, name, number, title, score, id, vol, date, writer, penciler) {
    if (databaseType === 'local') {
        getLocalProperties(name, number, title, score, id, vol, date, writer, penciler);
    } else {
        getWikiProperties(name, number, title, score, id);
    }
}
