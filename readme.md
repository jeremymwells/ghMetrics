
# -Github Consumer App-

##### App was generated using this yeoman generator:

- [generator-gulp-angular](https://github.com/Swiip/generator-gulp-angular)
- look there ^^ for more documentation on build tooling

# -To Setup App Deps-
##### `npm install -g typings`
##### `npm install -g gulp`
##### `npm install`
##### `bower install`

# -To Run Dev Mode App (unminified/bundled)
##### `gulp serve`

# -To Run Prod Mode App (minified/bundled)
##### `gulp serve:dist`

# -To Build Production Distributable
##### `gulp build`

# -To clean prior distributables
##### `gulp clean`


# -Tech Debt & Things To Improve-

- make events chart work.
- charts sometimes load blank, depending on how the route is entered/accessed.
  - when navigating to another route, then back, the charts seem to then work, which could indicate a race condition on load.
- responsivity on mobile devices needs improved.
- charts should be reinitialized and sorted along with lists.
- implement more charts/graphs that provide better insight to the data.
- implement a better UX for sorting.
  - add aggregate sorting to facilitate filtering.
- create a better landing page for each menu.
  - top-level facets or statistics of the item would be better.
    - eg: 
      - events home page could show totals of all types of events and other metadata.
      - individual repo home page could show facets of the repo and overall stats; maybe the top 10 commits.
      - etc for each menu item.
- examine the differences between an organization's members and public members.
  - they seem the same.
  - is representing them separately redundant?
- improve highcharts directive implementation.
  - the code looks hacky and could be implemented better/more cleanly.
- charting and sorting could be DRYed up.
