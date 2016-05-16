import { OrgService } from './org.service';

export class OrgHomeController {
  public homePageProps = [
    { field: 'blog', displayName: 'blog' },
    { field: 'email', displayName: 'email' },
    { field: 'events.length', displayName: 'recent org events', },
    { field: 'followers', displayName: 'total followers' },
    { field: 'following', displayName: 'total followed' },
    { field: 'hooks.length', displayName: 'total org hooks' },
    { field: 'issues.length', displayName: 'total org issues' },
    { field: 'members.length', displayName: 'total members' },
    { field: 'public_members.length', displayName: 'total public members' },
    { field: 'public_repos.length', displayName: 'total public repos' },
  ]
  public foo;
  /* @ngInject */
  constructor(public $state, public orgService: OrgService) { }


}
