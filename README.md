# Monster Hunter World Build Creator

## Usage

This build creator minimizes the amount of gear that you need to equip in order to achieve desired skills with corresponding levels. From there, you can set filters such as the minimum number of total decorations, minimum number of decorations by level and having a set bonus requirement.

You can also use it to customize the build or create your own from scratch and share it with others.

## Contributing

The data set is stored in the src/data/equipment [directory](https://github.com/cypir/mhwbuild/tree/master/src/data/equipment). Additions, updates and corrections are welcome. Simply follow the format of the other equipment JSON files and submit a pull request. If you are unable to do this, raising an issue and putting the data in the issue is acceptable. There is an automated build process that validates the equipment and adds them to a single json file that is used as the database for the build creator.

If you find a bug or you'd like to see a feature added feel free to raise an issue about it [here](https://github.com/cypir/mhwbuild/issues). Pull requests are welcome.

## Developing

This is built with create-react-app. To run a dev instance:

1.  Clone the project
2.  cd mhwbuild
3.  npm install --global create-react-app
4.  npm install
5.  npm run start

## Resources

* Inital data set was retrieved from https://mhworld.kiranico.com/
* Icons were from https://www.reddit.com/r/MonsterHunter/comments/2thxoz/here_i_compiled_a_set_of_higher_resolution_icons/
