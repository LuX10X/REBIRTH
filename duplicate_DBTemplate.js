const { Client } = require("@notionhq/client");

const notion = new Client({
    auth: "secret_EoxNTywQpCYhhUS80hURa31q4JNRfQvNWYYw0oPVxLX",
});

async function createPageFromTemplate(templateId, parentPageId, pageTitle) {
    try {
      // Crear una nueva página basada en la plantilla
      const newPage = await notion.pages.create({
        parent: { database_id: parentPageId },
        title: [{ type: 'text', text: { content: pageTitle } }],
        properties: {}, // Puedes agregar propiedades adicionales aquí si es necesario
        icon: { type: 'emoji', emoji: '📄' }, // Icono opcional para la página
        template: {
          id: templateId, // ID de la plantilla que deseas utilizar
        },
      });
  
      console.log(`Se ha creado una nueva página basada en la plantilla.`);
      return newPage;
    } catch (error) {
      console.error("Error al crear la página desde la plantilla:", error);
      throw error;
    }
}


const templateId = '8b480ab250434579b08e16003f8e17ef'; // Reemplaza 'ID_de_la_plantilla' con la ID de tu plantilla en Notion
const parentPageId = '994834b0b3f54c7790f50d544c95e9e2'; // Reemplaza 'ID_de_la_pagina_padre' con el ID de la página donde quieres que se cree la nueva página
const pageTitle = 'Nuevo Título de la Página'; // Título de la nueva página

createPageFromTemplate(templateId, parentPageId, pageTitle);
