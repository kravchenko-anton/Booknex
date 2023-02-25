const { DOMParser } = require("@xmldom/xmldom");
let xmlMetadata;

export async function parseXML(xmlFile: any) {
	try {
		const parser = new DOMParser();
		const xmlDoc = parser.parseFromString(xmlFile, "application/xml");
		xmlMetadata = {
			title: xmlDoc.getElementsByTagName("dc:title")[0].textContent,
			author: xmlDoc.getElementsByTagName("dc:creator")[0].textContent,
			date: xmlDoc.getElementsByTagName("dc:date")[0].textContent,
			lang: xmlDoc.getElementsByTagName("dc:language")[0].textContent,
			description: xmlDoc.getElementsByTagName("dc:description")[0].textContent,
			publisher: xmlDoc.getElementsByTagName("dc:publisher")[0].textContent,
		};
		
		const dcSubjectElements = xmlDoc.getElementsByTagName('dc:subject');
		const genres = [];
		for (let i = 0; i < dcSubjectElements.length; i++) {
			genres.push(dcSubjectElements[i].textContent);
		}
		
		const metaElements = xmlDoc.getElementsByTagName('meta');
		let coverId;
		for (let i = 0; i < metaElements.length; i++) {
			if (metaElements[i].getAttribute('name') === 'cover') {
				coverId = metaElements[i].getAttribute('content');
				break;
			}
		}

// Find the <item> element with the id attribute matching the cover id
		const itemElements = xmlDoc.getElementsByTagName('item');
		let coverImageName;
		for (let i = 0; i < itemElements.length; i++) {
			if (itemElements[i].getAttribute('id') === coverId) {
				coverImageName = itemElements[i].getAttribute('href');
				break;
			}
		}
		return	{coverImageName, genres, xmlMetadata};
	} catch (error) {
		console.error(`Error parsing XML: ${error}`);
	}
}


export async function parseEpubMetadataPath(xmlFile: any) {
	try {
		const parser = new DOMParser();
		const xmlDoc = parser.parseFromString(xmlFile, "application/xml");
		xmlMetadata = {
			subject: xmlDoc.getElementsByTagName("rootfile")[0].getAttribute('full-path'),
			
		};
		return xmlMetadata;
	} catch (error) {
		console.error(`Error parsing XML: ${error}`);
	}
}
