import { OrgService } from '../org.service';

export class OrgPublicMembersListController {
  public sortFields = [
    { field: 'name', desc: 'name', abbv: 'name', flex: 10 },
    { field: 'public_repos', desc: 'public repos', abbv: 'repos', flex: 15 },
    { field: 'followers', desc: 'followers', abbv: 'folwrs', flex: 15 },
    { field: 'public_gists', desc: 'public gists', abbv: 'gists', flex: 15 },
    { field: 'following', desc: 'following', abbv: 'folwg', flex: 15 }
  ]
  public statFields = this.sortFields.filter(sf => sf.field !== 'name');
  public currentSort = this.sortFields[0].field;
  public sortDirection: string;
  public chartConfig: any;

  /* @ngInject */
  constructor(private $state, public orgService: OrgService, private $filter) {
    
  }

  public toggleSort(field) {
    this.sortDirection = !this.sortDirection && field ? '-' : '';
    this.currentSort = `${this.sortDirection}${field}`;
  }

  public isSortField(field) {
    return this.currentSort.indexOf(field) > -1;
  }

  public getChartConfig(organization) {
    if (!organization || !organization.members) { return; }
    if (this.chartConfig) { return this.chartConfig; }

    var members = this.$filter('orderBy')(organization.members, this.currentSort);
    var categories = members.map(member => member.name || 'nameless');
    var seriesData = this.statFields.map((stat) => {
      return {
        name: stat.desc,
        data: members.map(member => member[stat.field])
      }
    });

    this.chartConfig = {
      chart: {
        type: 'column'
      },
      title: {
        text: organization.name + ' members'
      },
      xAxis: {
        categories: categories,
        crosshair: true
      },
      yAxis: {
        title: {
          text: 'Totals'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      exporting: { enabled: false },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: seriesData
    };
    return this.chartConfig;
  }
}