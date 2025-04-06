docker run -d \
    --name mongodb \
    -p 27017:27017 \
    -v ~/Data/mongodb:/data/db \
    mongo