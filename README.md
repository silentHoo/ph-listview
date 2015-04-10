# ph-listview

This component requests data from a given feed and lists them in a listview powered by `<core-list>`. You provide a
custom parse function which is used to parse your feed data. This can either be of type xml, json or rss.

Two predefined views are available to choose from: `compact` and `default`. The compact one doesn't include any
image and only shows the title, the date, the category and a link to click on to read more on the destination site. The
default one shows an additional image and the full description.

RSS feeds are per default parseable without the need of providing a custom parse function. If you're providing your
own parse function, you must return an array which aligns with the following format:

    ...
    [{
      title: 'My Title',
      date: '2010-01-01T05:06:07',
      category: 'My Category',
      description: 'A bit more text',
      link: 'http://www.google.com/'
    }]
    ...

Please note: The date must be parseable by the `Moment.js` library. If you use a custom format you can refer to the 
[String + Format section](http://momentjs.com/docs/#/parsing/string-format/) for more information of valid string formats.

##### Example 1

    <ph-listview
      id="listView"
      feed="http://gdata.youtube.com/feeds/api/videos/"
      handleAs="xml"
      viewType="compact"
      sortByDateAsc="false"
    ></ph-listview>

NOTE: Provide a JavaScript function to parse custom xml (see below)

##### Example 2

    <ph-listview
      id="listView"
      feed="http://gdata.youtube.com/feeds/api/videos/"
      handleAs="xml"
      viewType="default"
      sortByDateAsc="true"
    ></ph-listview>

NOTE: Provide a JavaScript function to parse custom xml (see below)

##### Imperative JavaScript Code for Example 1 + 2

    this.$.listView.setResponseParseFunc(function (response) {
      var xmlNodeTree = response.querySelectorAll('entry'); // we only use the <entry>s

      var entries = [];
      for (var i = 0; i < xmlNodeTree.length; i++) {
        var node = xmlNodeTree[i];
        var media = node.querySelector('group');

        entries.push({
          title: node.querySelector('title').textContent,
          date: node.querySelector('published').textContent,
          link: node.querySelector('link[rel="alternate"]').getAttribute('href'),
          category: media.querySelector('category').getAttribute('label'),
          description: media.querySelector('description').textContent,
          thumb: media.querySelectorAll('thumbnail')[0].getAttribute('url')
        });
      }
      return entries;
    });

##### Example 3

    <ph-listview
      feed="http://www.welt.de/wirtschaft/webwelt/?service=Rss"
      handleAs="rss"
      viewType="default"
      sortByDateAsc="false"
    ></ph-listview>

## 1. Install

`bower install silentHoo/ph-listview`

Run the command above from your project root.

## 2. Import

Import the component by adding this to your HTML file:

`<link rel="import" href="components/ph-listview/ph-listview.html">`

## 3. Use / Demo

See the [component page](http://silentHoo.github.io/ph-listview) for more information.

## License

Copyright (c) 2015 Patrick Hillert. All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:

1. Redistributions of source code must retain the above copyright
notice, this list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above
copyright notice, this list of conditions and the following disclaimer
in the documentation and/or other materials provided with the
distribution.
3. Neither the name of the copyright holder nor the names of its
contributors may be used to endorse or promote products derived from
this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
