# Flexcol.Mosaic.js
It's a tiny (just 1.2kB) Javascript library to enable mosaic grid in multiple columns with dynamic height detection.

![Flexcol.Mosaic.js - 2 columns grid](https://dl.dropboxusercontent.com/u/55990510/flexcol.mosaic.2.cols.png)

## How it works?
This plugin uses [CSS flexbox](http://caniuse.com/#feat=flexbox) for setting items in columns. The JavaScript part is responsible for dynamically setting the height of a container according to desired number of columns.

![Flexcol.Mosaic.js - 3 columns grid](https://dl.dropboxusercontent.com/u/55990510/flexcol.mosaic.3.cols.png)

## How to use it?

### CSS
At first you have to add some CSS rules to your stylesheet:
```css
.flexcol-container {
    box-sizing: border-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
        -ms-flex-direction: column;
            flex-direction: column;
    -webkit-flex-wrap: wrap;
        -ms-flex-wrap: wrap;
            flex-wrap: wrap;
}

.flexcol-item {
    box-sizing: border-box;
    // the value - 1rem - is a sum of left and right margin of the element
    width: calc((100% / 3) - 1rem);
    padding: 1rem;
    margin: 0 .5rem 1rem;
    background: #eee;
}
```
As you can see there are 2 rules. The most important rule to make desirent amount of columns in the container is `.flexcol-item`. It's **very important** to set correct width of elements. You have to follow the rule:
* if you want to have 2 columns, then you have to set width like this: 
```
width: calc(50% - 1rem);
```
* if you want to have 3 columns, then you have to set width like this: 
```
width: calc((100% / 3) - 1rem);
```
* etc.

### JavaScript
Just add a link to the `flexcol.mosaic.js` or `flexcol.mosaic.min.js` scripts in your HTML file, just like this:
```html
<script src="js/flexcol.mosaic.js"></script>
```
Then, just call the library the following way:
```javascript
new FlexcolMosaic();
```
And that's it! It's working now.

## Options

There is a bunch of options you can provide to the plugin instance:

### columns {Integer}
The number of columns visible in the container. 

**Default value** - 2.
### containerSelector {String}
The CSS selector used to find a container of items that should be displayed in columns. 

**Default value** - '.flexcol-container'.
### itemSelector {String}
The CSS selector used to find items in the container. 

**Default value** - '.flexcol-item'.

## Methods

The plugin instance has only one method provided to end developer.

### setColumns (columnsNumber)
The method takes a columns number as a parameter. The type of param should be an integer. When set, it updates the elements container to allow items to be aligned in desired number of columns.