import PleaseSignIn from "../components/PleaseSignIn";
import OrderList from "../components/OrderList";

const OrdersPage = props => (
  <>
    <PleaseSignIn>
      <OrderList id={props.query.id} />
    </PleaseSignIn>
  </>
);

export default OrdersPage;
