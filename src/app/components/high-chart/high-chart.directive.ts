
/** @ngInject */
export function HighChart($window, $timeout): ng.IDirective {
  let curPromise;
  const toggleChart = (scope) =>{
    return () => { scope.showChart = !scope.showChart; }
  }

  const drawChart = (chartElem, scope) => {
    if (curPromise) { $timeout.cancel(curPromise); }
    curPromise = $timeout(() => {
      $window.Highcharts.chart(chartElem, scope.config);
      scope.chartInitialized = true;
    }, 500);

  }
  
  const initializeChart = (scope, chartElem) => {
    scope.showChart = true;
    if (scope.initAfterPromise && scope.initAfterPromise.then) {
      return scope.initAfterPromise.then((thing) => {
        drawChart(chartElem, scope);        
      })
    }
    drawChart(chartElem, scope);
  }

  

  function link(scope, element, attrs, controller, transcludeFn){
    
    scope.toggleChart = toggleChart(scope); 
    initializeChart(scope, element.find('div').find('div')[0]);

  }

  return {
    restrict: 'E',
    scope: {

      chartIcon: '=',
      config: '=',
      initAfterPromise: '='
    },
    templateUrl: 'app/components/high-chart/high-chart.html',
    link:link
  };

}
