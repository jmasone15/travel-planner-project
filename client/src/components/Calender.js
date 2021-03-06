import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import Itinerary from "./Itinerary"


class Calender extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    

    render() {
        return (
            <div className="Calender">
                <DateRangePicker
                    startDate={this.props.startDate} 
                    startDateId="your_unique_start_date_id"
                    endDate={this.props.endDate} 
                    endDateId="your_unique_end_date_id" 
                    onDatesChange={({ startDate, endDate }) => {
                        this.props.setStartDate(startDate)
                        this.props.setEndDate(endDate)
                    }
                    
                    }
                    focusedInput={this.state.focusedInput} 
                    onFocusChange={focusedInput => this.setState({ focusedInput })}
                    showClearDates={true}
                />
                
            </div>
        )
    }
}

export default Calender;