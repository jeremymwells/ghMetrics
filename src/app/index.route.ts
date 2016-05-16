import { OrgService } from './org/org.service';
import { OrgBaseController } from './org/org.base.controller';
import { OrgReposListController } from './org/repos/repos.list.controller';

/** @ngInject */
export function routerConfig($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) {

  $stateProvider 
    .state('home', {
      url: '/',
      controller: ($state, orgService: OrgService)=>{
        return $state.go(
          'org.home', 
          { orgLogin: orgService.defaultLogin || 'Netflix' }
        );
      }
    })   
    .state('org', {
      abstract:true,
      url:'/:orgLogin',
      templateUrl: 'app/org/org.base.html',
      controller: 'orgBaseController',
      controllerAs: 'orgCtrl'
    })
    .state('org.home', {
      url: '',
      templateUrl: 'app/org/org.home.html',
      controller: 'orgHomeController',
      controllerAs: 'orgHomeCtrl'
    })
    .state('org.repos',{
    	url: '/repos',
      templateUrl: 'app/org/repos/repos.list.html',
      controller: 'orgReposListController',
      controllerAs: 'repoListCtrl'
    })
    .state('org.repo', {
      url: '/repos/:repo',
      templateUrl: 'app/org/repos/repo.html',
      controller: 'orgRepoController',
      controllerAs: 'repoCtrl'
    })

    .state('org.events', {
      url: '/events',
      templateUrl: 'app/org/events/events.list.html',
      controller: 'orgEventsListController',
      controllerAs: 'eventListCtrl'
    })

    .state('org.members', {
      url: '/members',
      templateUrl: 'app/org/members/members.list.html',
      controller: 'orgMembersListController',
      controllerAs: 'memberListCtrl'
    })

    .state('org.public-members', {
      url: '/public-members',
      templateUrl: 'app/org/public-members/public-members.list.html',
      controller: 'orgPublicMembersListController',
      controllerAs: 'publicMembersListCtrl'
    })
    ;  
  $urlRouterProvider.otherwise('/');
}
