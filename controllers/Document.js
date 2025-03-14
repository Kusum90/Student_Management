const asyncHandler = require('express-async-handler')
const Document = require('../model/Document')

//create a doucment
const createDocument = asyncHandler(async (req, res) => {
    const { Offer_Latter, Joinning_Latter, LOR, Acknowldge_Latter, Course_Certification } = req.body
    if (!Offer_Latter || !Joinning_Latter || !LOR || !Acknowldge_Latter || !Course_Certification) {
        res.status(400)
        throw new Error('Please add all fields')
    }
    const document = await Document.create({
        Offer_Latter,
        Joinning_Latter,
        LOR,
        Acknowldge_Latter,
        Course_Certification
    })
    res.status(200).json({message: "document successfully created", document})
})

//get all documents
const getDocuments = asyncHandler(async (req, res) => {
    const documents = await Document.find()
    res.status(200).json(documents)
})
//get a single document
const getDocumentById = asyncHandler(async (req, res) => {
    const document = await Document.findById(req.params.id)
    if (!document) {
        res.status(400)
        throw new Error('Document not found')
    }
    res.status(200).json(document)
})
//update a document
const updateDocument = asyncHandler(async (req, res) => {
    const document = await Document.findById(req.params.id)
    if (!document) {
        res.status(400)
        throw new Error('Document not found')
    }
    const updatedDocument = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedDocument)
})
//delete a document
const deleteDocument = asyncHandler(async (req, res) => {
    const document = await Document.findById(req.params.id)
    if (!document) {
        res.status(400)
        throw new Error('Document not found')
    }
    await document.deleteOne();
    res.status(200).json({ message: "document successfully deleted",  document });
})
module.exports = {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument

}

