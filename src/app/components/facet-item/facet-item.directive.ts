/** @ngInject */
export function FacetItem(): ng.IDirective {

  return {
    restrict: 'E',
    scope: {
      facetText:'=',
      facetHref: '=href',
      isActive:'='
    },
    templateUrl: 'app/components/facet-item/facet-item.html'
  };

}
