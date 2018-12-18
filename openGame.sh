echo "Running init command"
echo "{Game Name} By: Sethu Senthil && James Pan"
echo "alpha v.0.0.2"
echo ""
echo ""

parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

open $parent_path/NJ-South\ Brunswick\ Highschool/desktop-wrapper/dist/mac/FBLA.app

node $parent_path/NJ-South Brunswick Highschool/game-core/server.js
