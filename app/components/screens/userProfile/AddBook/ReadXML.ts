const { DOMParser } = require('@xmldom/xmldom')
let xmlMetadata

export async function parseXML(xmlFile: any) {
	try {
		const parser = new DOMParser()
		const xmlDoc = parser.parseFromString(xmlFile, 'application/xml')
		xmlMetadata = {
			title: xmlDoc.getElementsByTagName('dc:title')[0].textContent,
			author: xmlDoc.getElementsByTagName('dc:creator')[0].textContent,
			lang: xmlDoc.getElementsByTagName('dc:language')[0].textContent
		}

		return xmlMetadata
	} catch (error) {
		console.error(`Error parsing XML: ${error}`)
	}
}

export async function parseEpubMetadataPath(xmlFile: any) {
	try {
		const parser = new DOMParser()
		const xmlDoc = parser.parseFromString(xmlFile, 'application/xml')
		xmlMetadata = {
			subject: xmlDoc.getElementsByTagName('rootfile')[0].getAttribute('full-path')
		}
		return xmlMetadata
	} catch (error) {
		console.error(`Error parsing XML: ${error}`)
	}
}
