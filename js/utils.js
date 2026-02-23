// js/utils.js

export function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

export function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}