class DocumentRequest {
    static createDocument = {
        document:{
            documentUrl: null,
            documentDocumentTypeId: null,
        },
        fileUpload:{
            username: null,
            base64: null,
            region: "us-east-1",
            source: 'quickgem',
            s3bucket: 'quikgem-repo'
        }

    }

    static readDocument = {
        readAll: null
    }
    static updateDocument = {
        documentId:null,
        documentDocumentTypeId:null,
        documentUrl: null
    }

}

export default DocumentRequest