const prepareBlock = (blockData) => {
  const {
    blockHash: block_hash,
    height,
    time,
    body,
    previousBlockHash: previous_block_hash,
  } = blockData;

  return { blockHash, height, time, body, previousBlockHash };
};

module.exports.utils = {prepareBlock};
