/** @ngInject */
export function StatLink(): ng.IDirective {

  return {
    restrict: 'E',
    scope: {
      statCount: '=',
      statDescription: '=',
      statAbbv:'=',
      statLink:'='
    },
    templateUrl: 'app/components/stat-link/stat-link.html'
  };

}
