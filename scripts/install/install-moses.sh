# For general operation
sudo apt-get install build-essential git-core pkg-config automake libtool wget zlib1g-dev python-dev libbz2-dev

# For regression test suite:
sudo apt-get install libsoap-lite-perl

# Clone the source
git clone https://github.com/moses-smt/mosesdecoder.git mosesdecoder
cd mosesdecoder

# Install boost:
make -f contrib/Makefiles/install-dependencies.gmake

# Compile moses:
./compile.sh --with-xmlrpc-c=/usr/local

# bjam moses with your installation of boost (as per install-boost.sh):
./bjam --with-boost=~/workspace/temp/boost_1_55_0 -j4
