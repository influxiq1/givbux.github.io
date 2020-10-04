import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-tracklist',
  templateUrl: './tracklist.component.html',
  styleUrls: ['./tracklist.component.css']
})
export class TracklistComponent implements OnInit {


  componentRef: any;
  datasource: any;
  status_gretterthan_zero: any;
  pendingapplication_view: any;
  joquuserlist: any;
  custombutton: any = { label: 'my tree', fields: ['type', 'name', '_id'], url: 'http://localhost:4200/affiliate-tree' };
  placeholder: any = ['placeholder'];
  type: any = ['text'];
  name: any = ['Username'];

  public minDate = new Date(2020, 8, 24);
  public maxDate = new Date(2020, 8, 31);

  // use for Download the PDF

  custom_link: any = [];



  // use for grab the link
  grab_link: any = {
      colom_name: [
          {
              col_name: 'author',
              field_name: 'author'
          }],
      field: [
          {
              label: 'shatterblok grab url',
              url: 'artixtxp.com/',
              action: 'null'
          }]

  };

  pendingmodelapplicationarray: any = [];

  public status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];

  // use for status search

  statusarray: any = [{ val: 1, name: 'Approve' }, { val: 4, name: 'Decline' }, { val: 3, name: 'Lock' }];

  editroute: any = 'editroute';


  // use for Table Header modification 

  // Like Table head name is " firstname" => "First Name"
  modify_header_array: any = {
      'firstname': "First Name",
      'email': 'Email Id',
      
  };


  // use for Table Header Skip 
  pendingmodelapplicationarray_skip: any = ['_id', 'video_thamnail', 'type', 'password', 'blogs_image', 'created_at'];



  // use for Table Detail Field Skip
  pendingmodelapplicationarray_detail_skip: any = ['_id', 'email', 'name', 'blogtitle', 'Blogs image'];


  // use for Table Detail inside the modal image path
  pendingmodelapplicationarray_detail_datatype: any = [];

  // updateendpoint is use for data update endpoint
  updateendpoint = 'addorupdatedata';

  // deleteendpoint is use for data delete endpoint
  deleteendpoint = 'deletesingledata';

  // this is a database collection name
  tablename = 'users';

  // searchendpoint is use for data search endpoint
  searchendpoint = 'datalist';

  // use for click to another page routing path
  click_to_add_ananother_page = '/adminlist';



  // date_search_endpoint is use for date search endpoint
  date_search_endpoint: any = 'datalist';
  // send basic limit data
  limitcond: any = {
      "limit": 10,
      "skip": 0,
      // "AUth": 1
  };

  // other data
  libdata: any = {

      updateendpoint: 'statusupdate',
      updateendpointmany: 'updateendpointmany',
      deleteendpointmany: 'deleteendpointmany',
      // hideeditbutton: true,// all these button options are optional not mandatory
      // hidedeletebutton: true,
      //hideviewbutton:false,
      hidestatustogglebutton: true,
      hidemultipleselectbutton: null,
      hidecounter: null,
      // hidedeletemany: true,
      // hideupdatemany: false,
      hideaction: null,
      // actioncolname: 'Actn',
      tableheaders: ['authorn', 'priority', 'blogtitle'], //not required
 
  }
  // send basic sort data
  sortdata: any = {
      "type": 'desc',
      "field": 'priority',
      "options": ['priority', 'author', 'category', 'blogtitle']
  };


  // this is a database collection or view name
  date_search_source: any = 'admin_blog_list';
  // datacollection
  datacollection: any = 'getadminbloglistdata';
  //source count
  date_search_source_count: any = 0;
  search_settings: any = {

      // datesearch: [{ startdatelabel: "Start Date", enddatelabel: "End Date", submit: "Search", field: "created_datetime" }],   // this is use for  date search

      // selectsearch: [
      //     { label: 'Search By Status', field: 'status', values: this.status }
      // ], // this is use for  select search

      textsearch: [{ label: "Search By Title", field: 'blogtitle_search' }]
  };

  // this is search block 



  brandarray: any = [];
  notpendingapplication_view: any = [];
  adminlist: any = [];

  editroute1: any = 'modeledit';

  temtdata: any = '';
  // formdata
  formfieldrefresh: boolean = false;
  updatetable: boolean = false;
  formfieldrefreshdata: any = null;

  subscriptions: Subscription[] = [];
  subscriptioncount: number = 0;

  constructor(public router: Router, private route: ActivatedRoute, public _apiService: ApiService) {
      // console.log(this.blog_cat_list);
      // console.log(this.authval)
      // console.log('custom_link');
      // console.log(this.custom_link);
      // console.log(this.formdata, 'formdataformdataformdataformdataformdata')
      this.datasource = '';
      let endpoint = 'addalldata'; // for main data endpoint
      let endpointc = 'addalldata-count'; // for count endpoint
      // let autodataendpoint = 'exitsing-list'; // for count endpoint
      // data param for conditionlimit and search
      let data: any = {
          "condition": {
              "limit": 10,
              "skip": 0
          },
          sort: {
              "type": 'desc',
              "field": 'priority'
          },
          // searchcondition: { status: { $lte: 4 } }
          searchcondition: { }

      }

      this.subscriptions[this.subscriptioncount++] = this._apiService.httpViaPost(endpointc, data).subscribe((res: any) => {
          // console.log('in constructor');
          // console.log(result);
          this.date_search_source_count = res.count;
          //console.warn('blogData c',res);

      }, error => {
          console.log('Oooops!');
      });

      this.subscriptions[this.subscriptioncount++] = this._apiService.httpViaPost(endpoint, data).subscribe((res: any) => {
          this.pendingmodelapplicationarray = res.result.res;
      }, error => {
          console.log('Oooops!');
      });

  }

  ngOnInit() {

  }
  listenLiblistingChange(val: any) {
      console.log('listenLiblistingChange', val);
  }

  ngOnDestroy() {
      // prevent memory leak when component destroyed
      this.subscriptions.forEach(s => s.unsubscribe());
  }
}
