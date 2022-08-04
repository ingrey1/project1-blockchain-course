const prepareBlock = (blockData) => {
  const {
    block_hash: blockHash,
    height,
    time,
    body,
    previous_block_hash: previousBlockHash,
  } = blockData;

  return { blockHash, height, time, body, previousBlockHash };
};

module.exports = { prepareBlock };
