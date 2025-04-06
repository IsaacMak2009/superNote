echo "Building..."

npx tsc

echo "Linking static files..."
if [ ! -d dist/views ]; then
    ln -s $(pwd)/views ./dist/views
fi

if [ ! -d dist/resources ]; then
    ln -s $(pwd)/resources ./dist/resources
fi

echo "Done."
