mkdir data
cd data
wget http://www.statmt.org/moses/download/sample-models.tgz
curl -O http://www.statmt.org/moses/download/sample-models.tgz
tar -xzvf sample-models.tgz
cd sample-models/phrase-model/
# ../../../tools/moses/dist/bin/moses -f moses.ini < in > out
