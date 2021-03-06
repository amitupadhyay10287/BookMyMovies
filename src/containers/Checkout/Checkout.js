import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import classes from './Checkout.css';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {

        this.props.history.replace( '/checkout/contact-data' );
    }

    render () {

        let summary = <Redirect to="/" />
        if ( this.props.researvedseats ) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
            summary = ( 
                        <div className={classes.contentCheckout}>
                            {purchasedRedirect}
                            <CheckoutSummary
                                price={this.props.price}
                                movieSelected={this.props.watchmovie}
                                researvedseats={this.props.researvedseats}
                                checkoutCancelled={this.checkoutCancelledHandler}
                                checkoutContinued={this.checkoutContinuedHandler} />
                            <Route
                                path={this.props.match.path + '/contact-data'}
                                component={ContactData} />
                        </div> 
            );
        }
        return summary;
    }
} 

const mapStateToProps = state => {
    
    return {
        purchased: state.order.purchased,
        watchmovie:state.movieBooking.watchmovie,
        price: state.movieBooking.totalPrice,
        researvedseats:state.movieBooking.researvedseats,
    }
};

export default connect( mapStateToProps )( Checkout );