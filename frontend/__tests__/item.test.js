import Item from "../components/Item";
import { shallow } from "enzyme";

const fakeItem = {
  id: "ABC123",
  title: "Rye Bread",
  description: "Rye Sourdough Bread",
  price: 500,
  image: "bread.png",
  largeImage: "largeBread.png"
};

describe("<Item /> Component", () => {
  it("renders price", () => {
    const wrapper = shallow(<Item item={fakeItem} />);
    console.log(wrapper.debug());
    const PriceTag = wrapper.find("PriceTag");
    expect(PriceTag.children().text()).toBe("PLN 5");
  });
  it("renders image", () => {
    const wrapper = shallow(<Item item={fakeItem} />);
    const img = wrapper.find("img");
    expect(img.props().src).toBe(fakeItem.image);
    expect(img.props().alt).toBe(fakeItem.title);
  });
  it("renders buttons", () => {
    const wrapper = shallow(<Item item={fakeItem} />);
    const ButtonList = wrapper.find(".buttonList");
    console.log(ButtonList);
    expect(ButtonList.children()).toHaveLength(3);
  });
});
