import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';


class Calender extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null
        }
        this.handleBtnClick = this.handleBtnClick.bind(this);
    }



    handleBtnClick(e) {
        e.preventDefault()


        

        if ((this.state.startDate !== null) && (this.state.endDate !== null)) {

            var getDaysBetweenDates = () => {
                var now = this.state.startDate.clone(), dates = [];

                while (now.isSameOrBefore(this.state.endDate)) {
                    dates.push(now.format('MM/DD/YYYY'));
                    now.add(1, 'days');
                }
                console.log(dates);
            };
            getDaysBetweenDates()
        }
    }

    render() {
        return (
            <div className="Calender">
                <DateRangePicker
                    startDate={this.state.startDate} 
                    startDateId="your_unique_start_date_id"
                    endDate={this.state.endDate} 
                    endDateId="your_unique_end_date_id" 
                    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
                    focusedInput={this.state.focusedInput} 
                    onFocusChange={focusedInput => this.setState({ focusedInput })}
                    showClearDates={true}
                />
                <button type="button" onClick={this.handleBtnClick}>Submit</button>
            </div>
        )
    }
}

export default Calender;