SlipperJS
======

Slipper is a simple single-view JS application. 
  

## Version

This is a WIP version.



## Installation

### At First!

If you downloaded Slipper to local and want to check as ```http://localhost/Slipper/```,
Open Slipper/index.html and change ```<base>``` tag's href to ```<base ... href="/Slipper/">```.

### Browser based application

1. Put all files in ```/src``` to your DocumentRoot.
2. Change ```<base>``` in [index.html](https://github.com/Matooy/Slipper/blob/master/src/index.html) to proper path.
3. Done.


### Cordova application

1. Install [npm](https://www.npmjs.org/) and [Apache Cordova](http://cordova.apache.org/) .
2. Run ```cordova create sample-app``` .
3. Put all files in ```/src``` to generaged ```/www``` directory.
4. Put ```cordova/migrate``` to cordova project root directory and run ```./migrate``` . When process finished, remove this file.
5. Change ```<base>``` in [index.html](https://github.com/Matooy/Slipper/blob/master/src/index.html) to ```./``` .
6. Done.

