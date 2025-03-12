if not exist "node_modules/marked/bin/marked.js" cmd /C "npm install marked"
echo "running"
node ./node_modules/marked/bin/marked -i "../Beaver_Botanica.md" -o "../Beaver_Botanica.html"