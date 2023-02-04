const taxRate = 0.18;
const shippingPrice = 15;
const shippingFreePrice = 300;

window.addEventListener("load", () => {
  localStorage.setItem("taxRate", taxRate);
  localStorage.setItem("shippingPrice", shippingPrice);
  localStorage.setItem("shippingFreePrice", shippingFreePrice);
  totalPrice();
});

const container = document.querySelector(".container");
container.addEventListener("click", (e) => {
  if (e.target.className === "minus") {
    productPrice(e.target);
    totalPrice();
    if (e.target.nextElementSibling.innerText > 1) {
      e.target.nextElementSibling.innerText--;
      productPrice(e.target);
    } else {
      if (
        confirm(
          `${
            e.target.closest(".product-data").querySelector("h2").innerText
          } will be removed!`
        )
      ) {
        e.target.closest(".product").remove();
      }
    }
    totalPrice();
  } else if (e.target.className === "plus") {
    e.target.previousElementSibling.innerText++;
    productPrice(e.target);
    totalPrice();
  } else if (e.target.className === "remove") {
    // alert("remove");
    if (
      confirm(
        `${
          e.target.closest(".product-data").querySelector("h2").innerText
        } will be removed!`
      )
    ) {
      e.target.closest(".product").remove();
    }
    totalPrice();
  }
});

const productPrice = (e) => {
  const productData = e.closest(".product-data");
  const price = productData.querySelector("strong").innerText;
  const number = productData.querySelector("p.number ").innerText;
  productData.querySelector("span.total").innerText = (price * number).toFixed(
    2
  );
};

const totalPrice = () => {
  const producTotal = document.querySelectorAll(".product-total span.total");
  let subTotal = 0;
  producTotal.forEach((total) => {
    subTotal += parseFloat(total.innerText);
  });
  console.log(subTotal);

  // const taxPrice = subTotal * taxRate;
  const taxPrice = subTotal * localStorage.getItem("taxRate");
  // const shipping =subTotal > 0 && subTotal < shippingFreePrice ? shippingPrice : 0;
  // parseFloat localden geldigi için olabilir string oluyor.
  const shipping = parseFloat(
    subTotal > 0 && subTotal < localStorage.getItem("shippingFreePrice")
      ? localStorage.getItem("shippingPrice")
      : 0
  );

  const totalPrice = subTotal + taxPrice + shipping;

  document.querySelector(".subtotal").lastElementChild.innerText =
    subTotal.toFixed(2);
  document.querySelector(".tax").lastElementChild.innerText =
    taxPrice.toFixed(2);
  document.querySelector(".shipping").lastElementChild.innerText =
    shipping.toFixed(2);
  document.querySelector(".full-total").lastElementChild.innerText =
    totalPrice.toFixed(2);
};
