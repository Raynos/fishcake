npm --registry=http://archive.uber.com/npm install

cd ..
cd business/ && npm --registry=http://archive.uber.com/npm install

CWD_PATH="`pwd`"

for file in ${CWD_PATH}/endpoints/*
do
    if [ -d $file ]
    then
        echo "cd $file"
        cd $file && npm --registry=http://archive.uber.com/npm install
    fi
done

cd "${CWD_PATH}"
