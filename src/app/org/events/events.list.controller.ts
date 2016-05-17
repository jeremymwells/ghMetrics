import { OrgService } from '../org.service';

export class OrgEventsListController {
  public sortFields = [
    { field: 'actor.login', desc: 'user', abbv: 'user', flex: 10 },
    { field: 'type', desc: 'event type', abbv: 'type', flex: 15 },
    { field: 'created_at', desc: 'created', abbv: 'created', flex: 15 },
    { field: 'payload', desc: 'payload', abbv: 'issues', flex: 15 }
  ]
  public statFields = this.sortFields.filter(sf => sf.field !== 'name');
  public currentSort = this.sortFields[0].field;
  public sortDirection: string;
  public chartConfig: any;

  /* @ngInject */
  constructor(private $state, private moment, public orgService: OrgService, private $filter) {
    //TODO: re-fetch organization events when route is activated -->
  }

  public toggleSort(field) {
    this.sortDirection = !this.sortDirection && field ? '-' : '';
    this.currentSort = `${this.sortDirection}${field}`;
  }

  public isSortField(field) {
    return this.currentSort.indexOf(field) > -1;
  }

  public formatDate(date){
    return moment(date).format('MMMM Do YYYY, h:mm:ss a').toString();
  }

  public getEventSummary(event){
    return JSON.stringify(event.payload);
  }

  public getChartConfig(organization) {
    if (!organization || !organization.events) { return; }
    if (this.chartConfig) { return this.chartConfig; }

    var members = this.$filter('orderBy')(organization.members, this.currentSort);
    var events = organization.events;
    var categories = members.map(member => member.login || 'unknown');
    var seriesData = this.statFields.map((stat) => {
      return {
        name: stat.desc,
        data: []
      }
    });

    this.chartConfig = {
      chart: {
        type: 'column'
      },
      title: {
        text: organization.name + ' events'
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