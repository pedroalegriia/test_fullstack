const PDFDocument = require('pdfkit');
const PokeApiService = require('../../../infrastructure/externalServices/PokeApiService');  // Ajustar si la ruta de PokeApiService es diferente
const pokeApiService = new PokeApiService();
const axios = require('axios');

class GeneratePokemonsPdfUseCase {
  constructor() {
    this.pokeApiService = new PokeApiService();
  }

  async execute({ limit, page, search }) {
    const doc = new PDFDocument({ margin: 30 });

    const pokemons = await this.pokeApiService.getPokemonsWithDetails({ limit, page, search });

    doc.fontSize(20).text('Pokémon List', { align: 'center' });
    doc.moveDown();

    const tableTop = 100;
    const columnWidths = {
      name: 90,
      id: 50,
      baseExperience: 80,
      types: 50,
      abilities: 100, 
      sprite: 50,
    };

    this.drawTableHeader(doc, tableTop, columnWidths);

    let yPosition = tableTop + 30;

    for (const pokemon of pokemons) {
      try {
        let spriteBuffer = null;
        if (pokemon.sprite) {
          const response = await axios.get(pokemon.sprite, { responseType: 'arraybuffer' });
          spriteBuffer = Buffer.from(response.data, 'binary');
        }

        yPosition = this.drawRow(doc, yPosition, pokemon, spriteBuffer, columnWidths);

        if (yPosition > doc.page.height - 50) {
          doc.addPage();
          this.drawTableHeader(doc, 50, columnWidths);
          yPosition = 80;
        }
      } catch (error) {
        console.error(`Error fetching details for ${pokemon.name}: ${error.message}`);
      }
    }

    doc.end();
    return doc;
  }

  drawTableHeader(doc, y, columnWidths) {
    doc.fontSize(12).font('Helvetica-Bold');
    doc.text('ID', 130, y, { width: columnWidths.id });
    doc.text('Name', 30, y, { width: columnWidths.name });
    doc.text('Base Exp.', 180, y, { width: columnWidths.baseExperience });
    doc.text('Types', 260, y, { width: columnWidths.types });
    doc.text('Abilities', 400, y, { width: columnWidths.abilities });
    doc.text('Sprite', 500, y, { width: columnWidths.sprite });
    this.drawLine(doc, y + 15);
  }

  drawRow(doc, y, pokemon, spriteBuffer, columnWidths) {
    doc.fontSize(10).font('Helvetica');

    // Nombre e ID
    doc.text(pokemon.id, 130, y, { width: columnWidths.id });
    doc.text(pokemon.name, 30, y, { width: columnWidths.name });
    doc.text(pokemon.base_experience, 180, y, { width: columnWidths.baseExperience });
    doc.text(pokemon.types.join(', '), 260, y, { width: columnWidths.types });

    const abilitiesText = pokemon.abilities.join(', ');
    const abilitiesLines = this.splitTextToFit(abilitiesText, columnWidths.abilities, doc);

    let currentY = y;
    for (const line of abilitiesLines) {
      doc.text(line, 400, currentY, { width: columnWidths.abilities });
      currentY += 12; 
    }

    if (spriteBuffer) {
      doc.image(spriteBuffer, 500, y - 10, { width: 30, height: 30 });
    }

    this.drawLine(doc, currentY + 10);
    return currentY + 20;  
  }

  splitTextToFit(text, width, doc) {
    const words = text.split(', ');
    const lines = [];
    let currentLine = '';

    words.forEach(word => {
      const testLine = currentLine ? `${currentLine}, ${word}` : word;
      const testWidth = doc.widthOfString(testLine);

      if (testWidth < width) {
        currentLine = testLine;
      } else {
        if (currentLine) {
          lines.push(currentLine);
        }
        currentLine = word;
      }
    });

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines;
  }

  drawLine(doc, y) {
    doc.moveTo(30, y).lineTo(580, y).stroke();
  }
}

module.exports = GeneratePokemonsPdfUseCase;