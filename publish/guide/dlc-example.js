const bip66 = require('bip66')
const secp256k1 = require('secp256k1')
const crypto = require('crypto')
const commander = require('commander')

// import bip66 from 'bip66'
// import secp256k1 from 'secp256k1'
// import crypto from 'crypto'

// createAliceAndBobWallets();
// deleteAliceAndBobWallets();
// printWalletInfo("alice");

async function getNewAddress(walletName) {
  const proc = Bun.spawn(["bitcoin-cli", "-regtest", "-rpcwallet=" + walletName, "getnewaddress"]);
  const text = await new Response(proc.stdout).text();
  return text;
}

async function generateToAddress(walletName, numBlocks) {
  const proc = Bun.spawn(["bitcoin-cli", "-regtest", "-rpcwallet=" + walletName, "generatetoaddress", numBlocks, await getNewAddress(walletName)]);
  await new Response(proc.stdout).text();
}

async function sendToAddress(walletName, address, amount) {
  const proc = Bun.spawn(["bitcoin-cli", "-regtest", "-rpcwallet=" + walletName, "sendtoaddress", address, amount]);
  await new Response(proc.stdout).text();
}

async function printWalletInfo(walletName) {
  const proc = Bun.spawn(["bitcoin-cli", "-regtest", "-rpcwallet=" + walletName, "getwalletinfo"]);
  const text = await new Response(proc.stdout).text();
  console.log(text);
}

async function unloadWallets() {
  console.log("Deleting Alice and Bob wallets...");
  const procAlice = Bun.spawn(["bitcoin-cli", "-regtest", "unloadwallet", "alice"]);
  const procBob = Bun.spawn(["bitcoin-cli", "-regtest", "unloadwallet", "bob"]);
  await Promise.all([procAlice, procBob]);
}

async function deleteAliceAndBobWallets() {
  // rm -rf ~/.bitcoin/regtest/wallets/alice/ and rm -rf ~/.bitcoin/regtest/wallets/bob/
  const procAlice = Bun.spawn(["rm", "-rf", "~/.bitcoin/regtest/wallets/alice/"]);
  const procBob = Bun.spawn(["rm", "-rf", "~/.bitcoin/regtest/wallets/bob/"]);
  await Promise.all([procAlice, procBob]);
}
// # Create a wallet for the oracle (to be able to sign messages)
// bitcoin-cli -regtest createwallet oracle false false ""
//
// # Load the oracle wallet
// bitcoin-cli -regtest loadwallet oracle
//
// # Get a new address for the oracle
// oracle_address=$(bitcoin-cli -regtest -rpcwallet=oracle getnewaddress -addresstype legacy)
async function createOracleWallet() {
  console.log("Creating Oracle wallet...");
  const proc = Bun.spawn(["bitcoin-cli", "-regtest", "createwallet", "oracle", "false", "false", '""']);
  const text = await new Response(proc.stdout).text();
  return text;
}

async function createAliceAndBobWallets() {
  console.log("Creating Alice and Bob wallets...");
  const procAlice = Bun.spawn(["bitcoin-cli", "-regtest", "createwallet", "alice"]);
  const procBob = Bun.spawn(["bitcoin-cli", "-regtest", "createwallet", "bob"]);
  const aliceOutput = await new Response(procAlice.stdout).text();
  const bobOutput = await new Response(procBob.stdout).text();
  console.log(aliceOutput);
  console.log(bobOutput);
  return { alice: aliceOutput, bob: bobOutput }
}

// # Alice funds the multisig address
// alice_fund_txn=$(bitcoin-cli -regtest -rpcwallet=alice sendtoaddress $multisig_address 5)
// # Bob funds the multisig address
// bob_fund_txn=$(bitcoin-cli -regtest -rpcwallet=bob sendtoaddress $multisig_address 5)
// <!-- # Check the balance of the multisig address -->
// <!-- bitcoin-cli -regtest -rpcwallet=alice getreceivedbyaddress $multisig_address -->
//
// # alice creates cet for when the outcome is 1
// cet_alice_1=$(bitcoin-cli -regtest -rpcwallet=alice createrawtransaction "[{\"txid\":\"$alice_fund_txn\",\"vout\":0}]" "{\"$alice_address\":7.5}")
// # todo: we need to create adaptor signatures
// signed_cet_alice_1=$(bitcoin-cli -regtest -rpcwallet=alice signrawtransactionwithwallet $cet_alice_1 | jq -r '.hex')
// cet_alice_0=$(bitcoin-cli -regtest -rpcwallet=alice createrawtransaction "[{\"txid\":\"$alice_fund_txn\",\"vout\":0}]" "{\"$alice_address\":2.5}")
//
// # bob creates cet for when the outcome is 0
// cet_bob_0=$(bitcoin-cli -regtest -rpcwallet=bob createrawtransaction "[{\"txid\":\"$bob_fund_txn\",\"vout\":0}]" "{\"$bob_address\":7.5}")
// cet_bob_1=$(bitcoin-cli -regtest -rpcwallet=bob createrawtransaction "[{\"txid\":\"$bob_fund_txn\",\"vout\":0}]" "{\"$bob_address\":2.5}")
// # todo: we need to create adaptor signatures
// signed_cet_bob_1=$(bitcoin-cli -regtest -rpcwallet=bob signrawtransactionwithwallet $cet_bob_1 | jq -r '.hex')
//
// # Oracle signs the outcome 
// oracle_outcome=1
// oracle_signature=$(bitcoin-cli -regtest -rpcwallet=oracle signmessage $oracle_address "$oracle_outcome")
//
// # Alice verify the oracle signature
// bitcoin-cli -regtest -rpcwallet=alice verifymessage $oracle_address "$oracle_signature" "$oracle_outcome"


async function simulateDlcContractExecution() {
  const { multisigAddress, pubkey1, pubkey2 } = await createMultisigAddress("alice", "bob");
  console.log("Multisig address:", multisigAddress);

  // alice funds the multisig address
  // here alice is the local party and is proposing the contract so it should fund the multisig address first
  const aliceFundTxnProcess = Bun.spawn(["bitcoin-cli", "-regtest", "-rpcwallet=alice", "sendtoaddress", multisigAddress, 5]);
  const aliceFundTxn = await new Response(aliceFundTxnProcess.stdout).text();
  console.log("Alice funding transaction:", aliceFundTxn);

  // Example usage:
  // const contractParams = {
  //   oraclePubKey: '02abc...', // 33 bytes compressed public key
  //   alicePrivateKey: 'def...', // 32 bytes private key
  //   messageToSign: '1234...', // Transaction to sign
  //   outcomes: [
  //     {
  //       message: 'Team A wins',
  //       aliceAmount: '1000000', // in satoshis
  //       bobAmount: '0'
  //     },
  //     {
  //       message: 'Team B wins',
  //       aliceAmount: '0',
  //       bobAmount: '1000000'
  //     }
  //   ]
  // }
  // const adaptorSignatures = createDLCContractAdaptorSignature(contractParams)
  // After funding the multisig address, alice creates the contract execution transactions for all possible outcomes that the oracle can sign
  const outcomes = [
    { message: "Team A wins", aliceAmount: 750000000, bobAmount: 250000000 },
    { message: "Team B wins", aliceAmount: 250000000, bobAmount: 750000000 }
  ]
  const cetAlice1Process = Bun.spawn(["bitcoin-cli", "-regtest", "-rpcwallet=alice", "createrawtransaction", '[{"txid":"' + aliceFundTxn + '","vout":0}]', '{"' + multisigAddress + '":750000000}']);

}

// # Alice and Bob create multisig addresses
// alice_address=$(bitcoin-cli -regtest -rpcwallet=alice getnewaddress)
// bob_address=$(bitcoin-cli -regtest -rpcwallet=bob getnewaddress)
// alice_pubkey=$(bitcoin-cli -regtest -rpcwallet=alice getaddressinfo $alice_address | jq -r '.pubkey')
// bob_pubkey=$(bitcoin-cli -regtest -rpcwallet=bob getaddressinfo $bob_address | jq -r '.pubkey')
// multisig_address=$(bitcoin-cli -regtest createmultisig 2 "[\"$alice_pubkey\", \"$bob_pubkey\"]" | jq -r '.address')
async function createMultisigAddress(walletName1, walletName2) {
  const address1 = await getNewAddress(walletName1);
  const address2 = await getNewAddress(walletName2);
  const proc1 = Bun.spawn(["bitcoin-cli", "-regtest", "-rpcwallet=" + walletName1, "getaddressinfo", address1]);
  const proc2 = Bun.spawn(["bitcoin-cli", "-regtest", "-rpcwallet=" + walletName2, "getaddressinfo", address2]);
  const pubkey1 = JSON.parse(await new Response(proc1.stdout).text()).pubkey;
  const pubkey2 = JSON.parse(await new Response(proc2.stdout).text()).pubkey;
  const proc = Bun.spawn(["bitcoin-cli", "-regtest", "createmultisig", "2", '["' + pubkey1 + '", "' + pubkey2 + '"]']);
  const multisigAddress = JSON.parse(await new Response(proc.stdout).text()).address;
  return { address: multisigAddress, pubkey1, pubkey2 };
}

function createDLCContractAdaptorSignature(params) {
  // Oracle public key (33 bytes compressed format)
  const oraclePubKey = Buffer.from(params.oraclePubKey, 'hex')
  // Contract outcomes and payouts
  const outcomes = params.outcomes.map(outcome => ({
    message: outcome.message,
    aliceAmount: BigInt(outcome.aliceAmount),
    bobAmount: BigInt(outcome.bobAmount)
  }))

  // Alice's secret key (32 bytes)
  const alicePrivateKey = Buffer.from(params.alicePrivateKey, 'hex')

  // Message to sign (usually funding transaction)
  const messageToSign = Buffer.from(params.messageToSign, 'hex')

  const signatures = outcomes.map(outcome => {
    // Create outcome message hash
    const outcomeHash = crypto.createHash('sha256')
      .update(Buffer.from(outcome.message))
      .digest()

    // Create adaptor point: T = R + H(m)P where R is oracle's public nonce
    const adaptorPoint = secp256k1.publicKeyCreate(outcomeHash)

    // Generate random nonce
    const randomNonce = crypto.randomBytes(32)

    // Create signature hash
    const sigHash = crypto.createHash('sha256')
      .update(messageToSign)
      .digest()

    // Generate adaptor signature
    const signature = secp256k1.ecdsaSign(
      sigHash,
      alicePrivateKey,
      { noncefn: (message, privateKey) => randomNonce }
    )

    // Encode signature in DER format
    const derSignature = bip66.encode(
      Buffer.from(signature.signature.slice(0, 32)),
      Buffer.from(signature.signature.slice(32))
    )

    return {
      outcome: outcome.message,
      signature: derSignature.toString('hex'),
      adaptorPoint: adaptorPoint.toString('hex')
    }
  })

  return {
    contractId: crypto.randomBytes(32).toString('hex'),
    signatures: signatures
  }
}
