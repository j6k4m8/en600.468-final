#!/bin/bash

SCRIPTS=~/mosesdecoder/scripts

# -truecaser  "$SCRIPTS/recaser/truecase.perl -b -model model/truecase-model.de" \
# -tgt-truecaser "$SCRIPTS/recaser/truecase.perl -b -model model/truecase-model.en" \
/home/ubuntu/moses-mt-server/python_server/server.py  -mosesurl "http://127.0.0.1:8080/RPC2" \
  -tokenizer "$SCRIPTS/tokenizer/tokenizer.perl -b -X -l de -a" \
  -detokenizer "$SCRIPTS/tokenizer/detokenizer.perl -b -l en" \
  -detruecaser "$SCRIPTS/recaser/detruecase.perl -b"  \
  -tgt-tokenizer "$SCRIPTS/tokenizer/tokenizer.perl -b -X -l en -a" \
  -verbose 1 -port 8081 -ip 0.0.0.0 -pretty \
  -logprefix moseswrapper
