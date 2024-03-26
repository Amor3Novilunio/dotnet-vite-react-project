printf "\n"
echo Add Migration
printf "\n"
read -p 'Migration Name: ' name
dotnet ef migrations add $name -s api -p persistence