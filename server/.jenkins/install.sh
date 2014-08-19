npm --registry=http://archive.uber.com/npm install

cd ..
cd business/ && npm --registry=http://archive.uber.com/npm install

CWD_PATH="`pwd`"

for file in ${CWD_PATH}/endpoints/*
do
    echo "cd $file"
    cd $file && npm --registry=http://archive.uber.com/npm install
done

cd "${CWD_PATH}"
