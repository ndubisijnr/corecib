class DocumentRequest {
    static createDocument = {
        document:{
            documentUrl: null,
            documentDocumentTypeId: null,
            documentName: null
        },
        fileUpload:{
            username: null,
            base64: null,
            region: "us-east-1",
            source: 'quickgem',
            s3bucket: 'quikgem-repo'
        }

    }
    static updateDocument = {
        document:{
            documentId:null,
            documentDocumentTypeId:null,
            documentUrl: null,
            documentName: null
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


}

export default DocumentRequest