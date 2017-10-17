import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentOrder, fetchSaveProducts, fetchHistoryPurchases } from '../store';
import ProductItem from './ProductItem';
import SavedItem from './SavedItem'
import CrossItems from './CrossItems'

class Cart extends Component {

  constructor(props) {
    super(props)
  }

  // cannot use this.props.currentOrder here. evenif i use componentWillMount and componentDidMount together
  // seems like "connect" runs after all lifecycle method...
  componentDidMount() {
    this.props.getOrder();
    this.props.pullSavedProducts();
    this.props.pullHistoryProducts();
  }

  render() {
    console.log(this.props.currentOrder);
    const items = this.props.currentOrder.lineitems || [];
    items.sort(function (a, b) {
      return a.id - b.id
    })
    const totalValue = items.reduce(function (acc, ele) {
      return acc + ele.quantity * ele.product.price
    }, 0)
    const totalUnit = items.reduce(function (acc, ele) {
      return acc + ele.quantity
    }, 0)
    const subtotalMessage = totalUnit > 1 ? `Subtotal ( ${totalUnit} items): ` : `Subtotal ( ${totalUnit} item ): `;

    const savedProducts = this.props.savedProducts || []
    let key = 0;

    return (
      <div className="row">
        <div className="col-lg-10">
          <div className="row">
            <div className="col-lg-8">Shopping Cart</div>
            <div className="col-lg-2">Price</div>
            <div className="col-lg-2"><div className="pull-right">Quantity</div></div>
          </div>
          <div className="row">
            {
              <ul id="cartList" className="list-group">
                {
                  items.map(item => {
                    return (
                      <ProductItem key={item.id} item={item} />
                    )
                  })
                }
              </ul>
            }
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="pull-right">
                {subtotalMessage}<span>$ {totalValue}</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">{`Saved for Later ( ${savedProducts.length} item(s) )`}</div>
            <div className="col-lg-2">Price</div>
          </div>
          <div className="row">
            {
              <ul id="savedList" className="list-group">
                {
                  savedProducts.map(product => {
                    return (
                      <SavedItem key={key++} item={product} />
                    )
                  })
                }
              </ul>
            }
          </div>
          <div className="row">
            People Also Buy <br></br>
            {
              items[0] && <CrossItems id={items[0].productId} orderId={this.props.currentOrder.id} />
            }
          </div>
        </div>
        <div className="col-lg-2">
          <div className="row">
            <div className="col-lg-12">
              {subtotalMessage}<br></br><span>$ {totalValue}</span>
              <button className="btn btn-default">Proceed To Checkout</button>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              Buy it Again<br></br>
            <CrossItems repeatList={this.props.historyList} orderId={this.props.currentOrder.id} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapToState = (state) => {
  return {
    currentOrder: state.currentOrder,
    savedProducts: state.savedProducts,
    crossList: state.crossList,
    historyList: state.historyList
  }
}

const mapToDispatch = (dispatch, ownProps) => {
  return {
    getOrder() {
      const thunk = getCurrentOrder()
      dispatch(thunk);
    },
    pullSavedProducts() {
      const thunk = fetchSaveProducts();
      dispatch(thunk);
    },
    pullHistoryProducts() {
      const thunk = fetchHistoryPurchases();
      dispatch(thunk);
    }
  }
}

const cartContainer = connect(mapToState, mapToDispatch)(Cart)

export default cartContainer
