const prepareBlock = (blockData) => {
  const {
    block_hash: blockHash,
    height,
    body,
    previous_block_hash: previousBlockHash,
  } = blockData;

  return { blockHash, height, time: Date.now(), body, previousBlockHash };
};

const isValidBlockData = ({block_hash, height, body, previous_block_hash}) => {
    return block_hash && height && body && previous_block_hash
}

module.exports = { prepareBlock, isValidBlockData };
