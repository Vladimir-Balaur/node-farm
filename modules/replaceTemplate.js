const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCT_NAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRODUCT_PRICE%}/g, product.price);
    output = output.replace(/{%PRODUCT_NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%PRODUCT_QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if (!product.organic) {
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    }

    return output;

}

module.exports = replaceTemplate;