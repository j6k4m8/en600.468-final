PWD=`pwd`

# Install xmlrpc and moses. Must go in this order, hence the &&
$PWD/install/install-xmlrpc.sh && $PWD/install/install-moses.sh

# Add test model data.
$PWD/tests/test-model.sh
# Overwrite the sample moses.ini with absolute paths for ubuntu 14.04 and default config.
cp $PWD/tests/moses.ini /home/ubuntu/mosesdecoder/data/sample-models/phrase-model/moses.ini
