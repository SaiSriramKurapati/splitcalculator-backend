const { extractItemsFromBill } = require('../services/openaiService');

exports.uploadBill = async (req, res) => {
    if(!req.file) {
        return res.status(400).json({error: 'No file uploaded'});
    }

    try {
        const response = await extractItemsFromBill(req.file.path);
        res.json(response);
    } catch (error) {
        console.error("OpenAI Error: ", error); 
        res.status(500).json({error: 'Failed to process bill'});
    }
}