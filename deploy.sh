echo "Kill all the running PM2 actions"
sudo pm2 kill

echo "Jump to app folder"
cd /home/ubuntu/mai-care

echo "Update app from Git"
git pull

echo "Install app dependencies"
sudo rm -rf node_modules
sudo npm ci

echo "Build your app"
sudo npm run build

echo "Run new PM2 action"
sudo cp /home/ubuntu/ecosystem.json ecosystem.json
sudo pm2 start ecosystem.json
