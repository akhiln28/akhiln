# Set variables for the addresses and amounts
ALICE_ADDRESS="<alice_address>"
BOB_ADDRESS="<bob_address>"
TOTAL_AMOUNT=1.0  # Total amount in BTC
FEE=0.0001       # Transaction fee in BTC

# Calculate amounts for each outcome
# Outcome 0: Alice 25%, Bob 75%
ALICE_AMOUNT_0=$(echo "scale=8; ($TOTAL_AMOUNT * 0.25)" | bc)
BOB_AMOUNT_0=$(echo "scale=8; ($TOTAL_AMOUNT * 0.75 - $FEE)" | bc)

# Outcome 1: Alice 75%, Bob 25%
ALICE_AMOUNT_1=$(echo "scale=8; ($TOTAL_AMOUNT * 0.75)" | bc)
BOB_AMOUNT_1=$(echo "scale=8; ($TOTAL_AMOUNT * 0.25 - $FEE)" | bc)

# Create CET for Outcome 0 (Alice 25%, Bob 75%)
CET_0=$(bitcoin-cli -regtest createrawtransaction '''
[
  {
    "txid": "<funding_txid>",
    "vout": 0
  }
]
''' '''
{
  "'$ALICE_ADDRESS'": '$ALICE_AMOUNT_0',
  "'$BOB_ADDRESS'": '$BOB_AMOUNT_0'
}
''')

# Create CET for Outcome 1 (Alice 75%, Bob 25%)
CET_1=$(bitcoin-cli -regtest createrawtransaction '''
[
  {
    "txid": "<funding_txid>",
    "vout": 0
  }
]
''' '''
{
  "'$ALICE_ADDRESS'": '$ALICE_AMOUNT_1',
  "'$BOB_ADDRESS'": '$BOB_AMOUNT_1'
}
''')

# Sign CETs with Oracle's signature for each outcome
# For Outcome 0
ORACLE_SIG_0=$(bitcoin-cli -regtest -rpcwallet=oracle signmessage $ORACLE_ADDRESS "outcome:0")
SIGNED_CET_0=$(bitcoin-cli -regtest signrawtransactionwithkey $CET_0 '["<oracle_private_key>"]')

# For Outcome 1
ORACLE_SIG_1=$(bitcoin-cli -regtest -rpcwallet=oracle signmessage $ORACLE_ADDRESS "outcome:1")
SIGNED_CET_1=$(bitcoin-cli -regtest signrawtransactionwithkey $CET_1 '["<oracle_private_key>"]')

# Get the hex of signed CETs
SIGNED_CET_0_HEX=$(echo $SIGNED_CET_0 | jq -r '.hex')
SIGNED_CET_1_HEX=$(echo $SIGNED_CET_1 | jq -r '.hex')

# Save CETs and signatures for later use
echo $SIGNED_CET_0_HEX > cet_0.hex
echo $SIGNED_CET_1_HEX > cet_1.hex
echo $ORACLE_SIG_0 > oracle_sig_0.txt
echo $ORACLE_SIG_1 > oracle_sig_1.txt
