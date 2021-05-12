/* eslint-disable no-useless-constructor */
import React from 'react';
import
FormatNumber
from '../CurrencyFormat/IndiaCurrencyFormat';
import data1 from '../data1';
import data2 from '../data2';

export class FetchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filteredData: [],
      totalRevenue: 0
    }
  }


  componentDidMount() {
    console.log([...data1, ...data2]);
    this.setState({
      data: [...data1,
        ...data2
      ]
    });
    this.setState({
      filteredData: [...data1,
        ...data2
      ]
    })
    setTimeout(() => this.mergeRecords());
  }

  mergeRecords() {
    const mergeList = [];
    this.state.filteredData && this.state.filteredData.length > 0 && this.state.filteredData.forEach(function (element) {
      const list = {};
      let index = -1;
      for (var i = 0; i < mergeList.length; i++) {
        if (element.productName === mergeList[i].productName) {
          index = i;
          break;
        }
      }
      if (index > -1) {
        mergeList[index].revenue = mergeList[index].revenue + parseInt(element.revenue, 10);
      } else {
        list['productName'] = element.productName;
        list['revenue'] = parseInt(element.revenue, 0);
        mergeList.push(list);
      }

    });
    this.setState({
      data: mergeList
    });
    this.setState({
      filteredData: mergeList
    });
    this.sortRecords();
  }

  totalRevenueGenerated() {
    this.totalRevenue = this.state.filteredData && this.state.filteredData.length > 0 ? this.state.filteredData.reduce((accumulator, currentValue) => {
      return accumulator + parseInt(currentValue.revenue)
    }, 0) : 0;
    this.setState({
      totalRevenue: this.totalRevenue
    })
  }

  sortRecords() {
    const sortRecordList = this.state.filteredData && this.state.filteredData.length > 0 && this.state.filteredData.sort((a, b) => ('' + a.productName).localeCompare(b.productName));
    this.setState({
      data: sortRecordList
    });
    this.totalRevenueGenerated();
  }

  filterRecords(event) {
    let filteredData = [];
    event.length && this.state.data.length > 0 && this.state.data.forEach((ele) => {
      if (ele['productName'].toString().toLowerCase().includes(event.toLowerCase())) {
        filteredData.push(ele);
      }
    });
    this.setState({
      filteredData: event.length > 0 ? filteredData : this.state.data
    });
    setTimeout(() => this.totalRevenueGenerated());
  }

  render() {
    return ( <
      div >
      <
      label
      for = "filter-records" > Search Records < /label>  <
      input type = "text"
      placeholder = "Search Product Name"
      id = "filter-records"
      onChange = {
        ($event) => this.filterRecords($event.target.value)
      }
      />  <
      div class = "table" >

      <
      div class = "row" >
      <
      th > Product Name < /th>   <
      th > Revenue < /th> </div > {
        this.state.filteredData && this.state.filteredData.length > 0 ? this.state.filteredData.map((res, index) => {
          return ( <
            div class = "row"
            key = {
              index
            } >
            <
            td > {
              res.productName
            } < /td>   <
            FormatNumber revenue = {
              res.revenue
            }
            /> < /div >

          )
        }) :
          <
          h4 > No Records Found < /h4>
      }


      {
        this.state.filteredData && this.state.filteredData.length > 0 ? <
          div class = "row" > <
          th > Total revenue < /th>  <
        FormatNumber revenue = {
          this.totalRevenue
        }
        /> < /div >: ''
      } < /
      div >

      <
      /div >
    )
  }
}

export default FetchComponent;