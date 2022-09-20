#!/bin/bash

echo "Cleaning"
rm ./module.wasm
rm ./module.wat

echo "Building"
# node assemblyscript/bin/asc \
#   -O3 \
#   --noAssert \
node assemblyscript/bin/asc \
  -O3 \
  --noAssert \
  --optimizeLevel 3 \
  --shrinkLevel 1 \
  --converge \
  --stats \
  --noExportMemory \
  --runtime stub \
  --disable mutable-globals \
  --disable sign-extension \
  --disable nontrapping-f2i \
  --disable bulk-memory \
  --textFile ./module.wat \
  --outFile ./module.wasm \
  --lib ./src/lib \
  ./src/module.ts

echo "Installing"

node install $1 
