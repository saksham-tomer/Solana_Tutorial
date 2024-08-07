#!/bin/bash

cd ~/Music/code/solana/Solana_Development
time="Day"$(date +"%d")
echo "Creating file for day ${time}" 
#mkdir -p days/$time
touch src/days/$time.ts
mv src/index.ts src/days/$time.ts
touch src/index.ts
echo "Have a good day 😊"
