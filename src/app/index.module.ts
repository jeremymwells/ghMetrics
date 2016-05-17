/// <reference path="../../typings/main.d.ts" />

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';

import { FacetItem } from './components/facet-item/facet-item.directive';
import { StatLink } from './components/stat-link/stat-link.directive';
import { HighChart } from './components/high-chart/high-chart.directive';

import { OrgService } from './org/org.service';

import { OrgBaseController } from './org/org.base.controller';
import { OrgHomeController } from './org/org.home.controller';
import { OrgReposListController } from './org/repos/repos.list.controller';
import { OrgRepoController } from './org/repos/repo.controller';
import { OrgEventsListController } from './org/events/events.list.controller';
import { OrgMembersListController } from './org/members/members.list.controller';
import { OrgPublicMembersListController } from './org/public-members/public-members.list.controller';

declare var moment: moment.MomentStatic;

module ghMetrics {
  'use strict';

  angular.module('ghMetrics', ['ui.router', 'ngMaterial'])
    .constant('moment', moment)
    .config(config)
    .config(routerConfig)
    .run(runBlock)

    .directive('facetItem', FacetItem)
    .directive('statLink', StatLink)
    .directive('highChart', HighChart)

    .service('orgService', OrgService)

    .controller('orgBaseController', OrgBaseController)
    .controller('orgHomeController', OrgHomeController)
    .controller('orgReposListController', OrgReposListController)
    .controller('orgRepoController', OrgRepoController)
    .controller('orgEventsListController', OrgEventsListController)
    .controller('orgMembersListController', OrgMembersListController)
    .controller('orgPublicMembersListController', OrgPublicMembersListController)
    ;
}
