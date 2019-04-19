import Link from "next/link";
import { Mutation } from "react-apollo";
import { TOGGLE_CART_MUTATION } from "./Cart";

import { MdShoppingCart } from "react-icons/md";
import NavStyles from "./styles/NavStyles";
import SignOut from "./SignOut";
import User from "./User";
import CartCount from "./CartCount";

const Nav = () => (
  <User>
    {({ data: { me } }) => (
      <NavStyles>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/items">
          <a>Shop</a>
        </Link>
        {me && (
          <>
            <Link href="/sell">
              <a>Sell</a>
            </Link>
            <Link href="/orders">
              <a>Orders</a>
            </Link>
            <Link href="/profile">
              <a>Account</a>
            </Link>
            <Mutation mutation={TOGGLE_CART_MUTATION}>
              {toggleCart => (
                <button onClick={toggleCart}>
                  <MdShoppingCart
                    style={{
                      fontSize: "3rem",
                      color: "#364f6b"
                    }}
                  />
                  <CartCount
                    count={me.cart.reduce((acc, curr) => {
                      return acc + curr.quantity;
                    }, 0)}
                  />
                </button>
              )}
            </Mutation>
            <SignOut />
          </>
        )}
        {!me && (
          <Link href="/signup">
            <a>Sign In</a>
          </Link>
        )}
      </NavStyles>
    )}
  </User>
);

export default Nav;
