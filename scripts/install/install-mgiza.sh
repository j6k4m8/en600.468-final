# Install required boost libraries
sudo apt-get install cmake libboost-all-dev

# Clone and install mgiza
git clone https://github.com/moses-smt/mgiza.git mgiza
cd mgiza/mgizapp
cmake .
make
make install
