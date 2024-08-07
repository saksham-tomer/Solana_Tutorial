import {
  Keypair,
  PublicKey,
  LAMPORTS_PER_SOL,
  Transaction,
  SystemProgram,
  Connection,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import * as fs from "fs";

async function send() {
  const keyPair = Keypair.generate();
  const publicKey = keyPair.publicKey;

  //to load a existing keypair
  //to check the balance of an account
  //solana balance -k .\Keypair.json

  const secret = JSON.parse(
    fs.readFileSync("keypair.json").toString()
  ) as number[];

  //to generate a new keypair from cli --> solana-keygen new -o <Output file name>

  const secretKey = Uint8Array.from(secret);
  const LoadedkeyPair = Keypair.fromSecretKey(secretKey);

  const transaction = new Transaction();
  const recipientKeypair = Keypair.generate();

  const recipient = recipientKeypair.publicKey;

  const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: keyPair.publicKey,
    toPubkey: recipient,
    lamports: LAMPORTS_PER_SOL * 0.001,
  });

  transaction.add(sendSolInstruction);

  const connection = new Connection(clusterApiUrl("devnet"));

  //requesting airdrop

  const airdrop = await connection.requestAirdrop(
    keyPair.publicKey,
    1 * LAMPORTS_PER_SOL
  );
  //to request airdrop from cli

  // solana airdrop 0.001 --config .\Keypair.json

  const signature = await sendAndConfirmTransaction(connection, transaction, [
    keyPair,
  ]);

  console.log(signature);

  console.log(
    "The public and Private keys are \n",
    publicKey.toBase58(),
    keyPair.secretKey.toString(),
    keyPair.secretKey.length
  );
}

send();
