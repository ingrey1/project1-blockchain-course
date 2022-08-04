const express = require('express');
const router = express.Router();

const { executeQuery, readStars, createBlock, readBlocks, createStar } = require('../database/query.js');

const {prepareBlock}  = require("../utils")




// const fetchedStars = await executeQuery(readStars)
// console.info("fetchedStars")

    // // Enpoint to Get a Block by Height (GET Endpoint)
    // getBlockByHeight() {
    //     this.app.get("/block/height/:height", async (req, res) => {
    //         if(req.params.height) {
    //             const height = parseInt(req.params.height);
    //             let block = await this.blockchain.getBlockByHeight(height);
    //             if(block){
    //                 return res.status(200).json(block);
    //             } else {
    //                 return res.status(404).send("Block Not Found!");
    //             }
    //         } else {
    //             return res.status(404).send("Block Not Found! Review the Parameters!");
    //         }    
    //     });
    // }

    // // Endpoint that allows user to request Ownership of a Wallet address (POST Endpoint)
    // requestOwnership() {
    //     this.app.post("/requestValidation", async (req, res) => {
    //         if(req.body.address) {
    //             const address = req.body.address;
    //             const message = await this.blockchain.requestMessageOwnershipVerification(address);
    //             if(message){
    //                 return res.status(200).json(message);
    //             } else {
    //                 return res.status(500).send("An error happened!");
    //             }
    //         } else {
    //             return res.status(500).send("Check the Body Parameter!");
    //         }
    //     });
    // }

    // // Endpoint that allow Submit a Star, yu need first to `requestOwnership` to have the message (POST endpoint)
    // submitStar() {
    //     this.app.post("/submitstar", async (req, res) => {
    //         if(req.body.address && req.body.message && req.body.signature && req.body.star) {
    //             const address = req.body.address;
    //             const message = req.body.message;
    //             const signature = req.body.signature;
    //             const star = req.body.star;
    //             try {
    //                 let block = await this.blockchain.submitStar(address, message, signature, star);
    //                 if(block){
    //                     return res.status(200).json(block);
    //                 } else {
    //                     return res.status(500).send("An error happened!");
    //                 }
    //             } catch (error) {
    //                 return res.status(500).send(error);
    //             }
    //         } else {
    //             return res.status(500).send("Check the Body Parameter!");
    //         }
    //     });
    // }

    // // This endpoint allows you to retrieve the block by hash (GET endpoint)
    // getBlockByHash() {
    //     this.app.get("/block/hash/:hash", async (req, res) => {
    //         if(req.params.hash) {
    //             const hash = req.params.hash;
    //             let block = await this.blockchain.getBlockByHash(hash);
    //             if(block){
    //                 return res.status(200).json(block);
    //             } else {
    //                 return res.status(404).send("Block Not Found!");
    //             }
    //         } else {
    //             return res.status(404).send("Block Not Found! Review the Parameters!");
    //         }
            
    //     });
    // }

    // // This endpoint allows you to request the list of Stars registered by an owner
    // getStarsByOwner() {
    //     this.app.get("/blocks/:address", async (req, res) => {
    //         if(req.params.address) {
    //             const address = req.params.address;
    //             try {
    //                 let stars = await this.blockchain.getStarsByWalletAddress(address);
    //                 if(stars){
    //                     return res.status(200).json(stars);
    //                 } else {
    //                     return res.status(404).send("Block Not Found!");
    //                 }
    //             } catch (error) {
    //                 return res.status(500).send("An error happened!");
    //             }
    //         } else {
    //             return res.status(500).send("Block Not Found! Review the Parameters!");
    //         }
            
    //     });
    // }

    /* GET stars listing. */
router.get('/stars', async (req, res, next) => {
    const fetchedStars = await executeQuery(readStars)
    console.info("fetchedStars")
    res.json(fetchedStars)
});

    /* GET blocks listing. */
router.get('/blocks', async (req, res, next) => {
    //const fetchedBlockResponse = await executeQuery(readBlocks)
    const fetchedBlockResponse = {rows: [{block_hash: "BLOCK_HASH", height: 0, time: 235435365, body: "BODY_ENCODED", previous_block_hash: "PREVIOUS_HASH"}]}
    const blocks = []
    fetchedBlockResponse.rows.forEach((block) => {
       console.info("block: ", block)
       blocks.push(prepareBlock(block))
    })
    
    res.json({ status: 200, data: blocks })
});
    
    /* POST blocks listing. */
router.post('/blocks', async (req, res, next) => {
        
        const createBlockResponse = await executeQuery(createBlock, req.body)
        
        res.json(createBlockResponse) 
           
});


  
module.exports = router;