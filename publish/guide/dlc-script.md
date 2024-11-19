1. First, you already have:
- Multisig address created with Alice and Bob's pubkeys
- Funding transactions from both Alice and Bob to the multisig address

2. Create CETs for both outcomes:
```python
import bitcoin.rpc
from secp256k1 import PrivateKey, PublicKey

# Connect to your regtest node
rpc = bitcoin.rpc.RpcConnection()

# Create CETs for both outcomes
# Outcome 1: Alice wins (7.5 BTC to Alice, 2.5 BTC to Bob)
cet_outcome_1 = {
    "alice_address": 7.5,
    "bob_address": 2.5
}

# Outcome 0: Bob wins (2.5 BTC to Alice, 7.5 BTC to Bob)
cet_outcome_0 = {
    "alice_address": 2.5,
    "bob_address": 7.5
}

# Create adaptor signatures
def create_adaptor_signature(private_key, message, oracle_pubkey, outcome):
    # Create adaptor point (oracle_pubkey * outcome)
    adaptor_point = oracle_pubkey.multiply(outcome)

    # Create the adaptor signature
    # This is a simplified version - you'll need proper implementation
    nonce = PrivateKey()
    adaptor_sig = private_key.sign_schnorr(
        message,
        nonce=nonce,
        adaptor=adaptor_point
    )
    return adaptor_sig
```

3. Exchange adaptor signatures:
```python
# Alice creates and shares adaptor signatures for both outcomes
alice_adaptor_sig_0 = create_adaptor_signature(
    alice_private_key,
    cet_outcome_0,
    oracle_pubkey,
    0
)

alice_adaptor_sig_1 = create_adaptor_signature(
    alice_private_key,
    cet_outcome_1,
    oracle_pubkey,
    1
)

# Bob creates and shares adaptor signatures for both outcomes
bob_adaptor_sig_0 = create_adaptor_signature(
    bob_private_key,
    cet_outcome_0,
    oracle_pubkey,
    0
)

bob_adaptor_sig_1 = create_adaptor_signature(
    bob_private_key,
    cet_outcome_1,
    oracle_pubkey,
    1
)
```

4. When the oracle reveals the outcome:
```python
def complete_signature(adaptor_sig, oracle_signature):
    # Convert adaptor signature to full signature using oracle signature
    # This will require implementing the actual crypto operations
    return final_signature

# After oracle reveals outcome (let's say outcome is 1)
oracle_signature = oracle.sign_message("1")

# Complete the signatures for the winning outcome
alice_final_sig = complete_signature(alice_adaptor_sig_1, oracle_signature)
bob_final_sig = complete_signature(bob_adaptor_sig_1, oracle_signature)

# Broadcast the winning CET with completed signatures
winning_cet = create_cet_transaction(cet_outcome_1)
signed_cet = sign_transaction(winning_cet, [alice_final_sig, bob_final_sig])
rpc.sendrawtransaction(signed_cet)
```

Note: This is a simplified example. In practice, you'll need to:
1. Implement proper cryptographic operations for adaptor signatures
2. Handle proper transaction serialization
3. Implement proper error handling
4. Include timeouts and refund transactions
5. Verify signatures before broadcasting

